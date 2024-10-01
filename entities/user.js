const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notificationToken: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('superadmin', 'admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },{
    tableName: 'users',
});

module.exports = User;
