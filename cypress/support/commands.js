Cypress.Commands.add(
  "performLogin",
  ({ username, password, rememberMe = false } = {}) => {
    // Set default parameters values from .env file
    const defaultUsername = Cypress.env("username");
    const defaultPassword = Cypress.env("password");

    // Overwrite default values if they were declared as parameters
    const finalUsername = username || defaultUsername;
    const finalPassword = password || defaultPassword;

    cy.visit("/")
    cy.get("#username").type(finalUsername);
    cy.get("#password").type(finalPassword);

    if (rememberMe) {
      cy.get("#rememberMe").check();
    }

    cy.get('button[type="submit"]').click();
  }
);

Cypress.Commands.add(
  "fillDefaultRegistrationData",
  ({ username, email, firstPassword, secondPassword } = {}) => {
    cy.fixture("userData").then((userData) => {
      //If the parameter is declared it will be overwritten
      const finalUsername = username || userData.username;
      const finalFirstPassword = firstPassword || userData.password;
      const finalSecondPassword = secondPassword || userData.password;
      const finalEmail = email || userData.email;

      cy.get('[data-cy="username"]').type(finalUsername, { delay: 0 });
      cy.get('[data-cy="email"]').type(finalEmail, { delay: 0 });
      cy.get('[data-cy="firstPassword"]').type(finalFirstPassword, {
        delay: 0,
      });
      cy.get('[data-cy="secondPassword"]').type(finalSecondPassword, {
        delay: 0,
      });
      cy.get('[data-cy="submit"]').click();
    });
  }
);


Cypress.Commands.add('restoreSession', () => {
  cy.window().then((window) => {
    const existingToken = Cypress.env('jhi-authenticationToken');

    // Checks if there is an existing token and it's not empty
    if (existingToken && existingToken !== '') {
      window.sessionStorage.setItem('jhi-authenticationToken', existingToken);
      return;

    } else {
      // Get session storage variable value and sets as sessionStorage on browser application
      const userToken = Cypress.env('jhi-authenticationToken');
      window.sessionStorage.setItem('jhi-authenticationToken', userToken);

      if (userToken && userToken !== '') {
        // If userToken exists and isnt empty should inject token value on the browser
        window.sessionStorage.setItem('jhi-authenticationToken', userToken);
        console.log('Token injetado no sessionStorage');

      } else {
        // If there's no content on the browser and declared on cypress environment should perform login and save the session storage value
        cy.performLogin();

        //Wait value to be present on broser session storage
        cy.wait(1500);

        // Save session storage value
        cy.saveSessionStorage("jhi-authenticationToken");
      }
    }
  });
});

Cypress.Commands.add('saveSessionStorage', (key) => {
  cy.window().then((window) => {
    // Gets session value on cypress variable
    const value = window.sessionStorage.getItem(key);

    if (value) {
      Cypress.env(key, value);
    } else {
      cy.log(`${key} not found on sessionStorage`);
    }
  });
});