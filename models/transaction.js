'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Profile, {foreignKey: "ProfileId"})
      Transaction.belongsTo(models.Item, {foreignKey: "ItemId"})
    }
  }
  Transaction.init({
    dateTrans: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    ProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Profiles",
        key: "id"
      }
    },
    ItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};