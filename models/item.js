'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, {foreignKey: "CategoryId"})
      Item.belongsToMany(models.Profile, {
        through: models.Transaction,
        foreignKey: "ItemId"
      })
    }
    static async getTotal(cartIds) {
      try {
        let data = await Item.findAll({
          where: {
            id: cartIds
          },
          attributes: [
            [sequelize.fn('Sum', sequelize.col('price')), 'total']
          ]
        })
        // console.log(data);
        
        return data[0].dataValues.total
      } catch (error) {
        throw error
      }
    }

    get uniqueCode() {
      const nameInitial = this.nameItem?.substring(0, 3).toUpperCase() || 'XXX'
    
      const idPart = this.id?.toString().slice(-2).padStart(2, '0') || Math.floor(Math.random() * 90 + 10)
    
      const categoryCode = this.CategoryId ? `C${this.CategoryId}` : 'C00'
    
      const nameHash = [...this.nameItem || '']
        .filter(c => /[A-Za-z]/.test(c))
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .join('')
        .toUpperCase()
    
      return `ITM-${nameInitial}${idPart}-${categoryCode}-${nameHash}`
    }
  }
  Item.init({
    nameItem: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu's name should be added"
        },
        notNull: {
          msg: "Menu's name should be added"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu's description should be added"
        },
        notNull: {
          msg: "Menu's description should be added"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu's price should be added"
        },
        notNull: {
          msg: "Menu's price should be added"
        },
        isMinimal(input) {
          let price = input
          if (price && price < 10000) {
            throw new Error(`Menu's price should be at least Rp10.000,-`)
          }
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu's image should be added"
        },
        notNull: {
          msg: "Menu's image should be added"
        },
      }
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        allowNull: false,
      validate: {
        notEmpty: {
          msg: "Menu's Category should be added"
        },
        notNull: {
          msg: "Menu's Category should be added"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};