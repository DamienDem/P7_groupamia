module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      attachement: {
        type:DataTypes.STRING,
        allowNull: true
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    },{
        classMethods: {
          associate: (models) => {
            models.Post.belongsTo(models.User, {
              foreignKey: {
                allowNull: false
              }
            })
          }
        }
      }
    )};