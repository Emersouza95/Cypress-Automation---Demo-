describe.skip("Test Suite ID: RS_001 - Registration Test Suite", () => {
  beforeEach(() => {
    cy.visit("/account/register");
  });
  it("TC_REGISTER_001 - should display error message if required field is empty", () => {
    cy.get("button[type=submit]").click();
    cy.contains("Your username is required.");
    cy.contains("Your email is required.");
    cy.contains("Your password is required.");
    cy.contains("Your confirmation password is required.");
  });

  it("TC_REGISTER_002 - should allow username 50 characters long", () => {
    cy.fillDefaultRegistrationData({
      username: "veryBigUsernameWithFiftyCharactersLooooooooooooong",
    });
    cy.contains(
      "Registration saved! Please check your email for confirmation."
    );
  });

  it("TC_REGISTER_003 - should display error message with invalid quantity of characters on username text field", () => {
    cy.fillDefaultRegistrationData({
      username: "veryBigUsernameWithFiftyCharactersLongPlusOneCharac",
    });
    cy.contains("Your username cannot be longer than 50 characters.");
  });

  it("TC_REGISTER_004 - should display error message with invalid email formatting on email text field", () => {
    cy.fillDefaultRegistrationData({ email: "thisIsNot@validEmail" });
    cy.get('[data-cy="submit"]').click();
    cy.contains("Your email is invalid.");
  });

  it("TC_REGISTER_005 - should display error message if passwords are mismatching on the text field", () => {
    cy.fillDefaultRegistrationData({ firstPassword: "wrongPassword" });
    cy.get('[data-cy="submit"]').click();
    cy.contains("The password and its confirmation do not match!");
  });
});

describe("Test Suite ID: LTS_001 - Login Test Suite", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("TC_LOGIN_001 - should login successfully with valid credentials", () => {
    cy.performLogin();
    cy.contains("Welcome to Ensolvers QA Challenge!");
  });

  it("TC_LOGIN_002 - should display error message with nonexistent user", () => {
    cy.performLogin({ username: "thisUsernameDoesNotExist" });
    cy.contains(
      "Failed to sign in! Please check your credentials and try again."
    );
  });

  it("TC_LOGIN_003 - should display error message with valid user but mismatching password", () => {
    cy.performLogin({ password: "thisIsNotTheCorrectPassword" });
    cy.contains(
      "Failed to sign in! Please check your credentials and try again."
    );
  });

  it("TC_LOGIN_004 - should display error message with empty username on the text field", () => {
    cy.get('[data-cy="submit"]').click();
    cy.contains("Username cannot be empty!");
  });

  it("TC_LOGIN_005 - should display error message with empty password on the text field", () => {
    cy.get('[data-cy="username"]').type("fakeUsername");
    //the instruction below must be performed twice because of the browser message to fill the text field appears first instead of the error feedback
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="submit"]').click();
    cy.contains("Password cannot be empty!");
  });

  it("TC_LOGIN_006 - should save data session on cookies", () => {
    cy.performLogin({ rememberMe: true });
    cy.window().then((win) => {
      expect(win.localStorage.length).to.eq(1);
    });
  });

  it.only("rememberMe test", () => {
    cy.performLogin({ rememberMe: true });

    cy.smartWaitForLocalStorageSize({ expectedSize: 1 });

    cy.window().then((win) => {
      const storageLength = win.localStorage.length;
      expect(storageLength).to.be.greaterThan(0); // Verifica que o localStorage não está vazio
    });
  });
});
