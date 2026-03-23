const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Donor = sequelize.define('Donor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blood_group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'donors',
  timestamps: true
});

module.exports = Donor;
