const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl,
    setupNodeEvents(on, config) {
      // Collect sensitive data that wasn't versioned
      config.env.username = process.env.CYPRESS_username;
      config.env.password = process.env.CYPRESS_password;

      return config;
    },
  },
};
