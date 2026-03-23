const { Sequelize } = require('sequelize');
require('dotenv').config();

// Load from environment or use defaults
const DB_NAME = process.env.DB_NAME || 'blood_donation';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
