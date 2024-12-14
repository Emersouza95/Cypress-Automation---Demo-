Cypress.Commands.add(
  "performLogin",
  ({ username, password, rememberMe = false } = {}) => {
    // Set default parameters values from .env file
    const defaultUsername = Cypress.env("username");
    const defaultPassword = Cypress.env("password");

    // Overwrite default values if they were declared as parameters
    const finalUsername = username || defaultUsername;
    const finalPassword = password || defaultPassword;

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
      // Usa os dados da fixture ou os valores passados no parâmetro
      const finalUsername = username || userData.username;
      const finalFirstPassword = firstPassword || userData.password;
      const finalSecondPassword = secondPassword || userData.password;
      const finalEmail = email || userData.email;

      // Preenche os campos do formulário
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

Cypress.Commands.add(
  "smartWaitForLocalStorageSize",
  (expectedSize, timeout = 5000) => {
    cy.window({ timeout }).should((win) => {
      const storageLength = win.localStorage.length;
      expect(storageLength).to.be.greaterThan(expectedSize - 1); // Verifica se o tamanho é maior ou igual ao esperado
    });
  }
);
