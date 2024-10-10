require("dotenv").config();
const Mongostore = require("connect-mongo");

const mongo_store = Mongostore.create({
  mongoUrl: process.env.MONGODB_URL,
});

module.exports = mongo_store;
