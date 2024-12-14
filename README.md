# Install npm and dotenv dependencies
npm install
npm install dotenv


# Open Cypress Interface
npx cypress open

# Execute in headless mode
npx cypress run

# It's needed to declare valid credentials on .env file for tests to run properly
# Tests are placed on "cypress/e2e" folder
# Fixtures folder have declared our static data for registering form filler
# Support folder have declared our custom commands, generic code that can be reused avoiding code duplicancy
# User credentials are placed on ".env" file but its not updloaded to github to secure sensitive data
# NPM scripts are avaliable on the folder explorer to easily execute tests 