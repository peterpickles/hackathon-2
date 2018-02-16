'use strict';
module.exports = (sequelize, DataTypes) => {
  var emotion = sequelize.define('emotion', {
    userId: DataTypes.INTEGER,
    mood: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return emotion;
};