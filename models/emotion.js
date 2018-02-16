'use strict';
module.exports = (sequelize, DataTypes) => {
  var emotion = sequelize.define('emotion', {
    userId: DataTypes.INTEGER,
    mood: DataTypes.STRING
  });
  emotion.associate = function (models) {
    models.emotion.belongsTo(models.user);
  };
  return emotion;
};