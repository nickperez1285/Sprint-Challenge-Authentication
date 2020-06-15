const knex = require('knex');

const config = require("../knexfile.js");
const environment =  "development";
const setup = knex(config[environment])

module.exports =  setup;
