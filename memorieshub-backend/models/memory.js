'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Memory.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'owner',
      });
    }
  }
  Memory.init({
    user_id: DataTypes.INTEGER,
    s3_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Memory',
  });
  return Memory;
};