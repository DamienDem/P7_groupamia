module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
              model: 'Posts',
              key: 'id'
            }
          },
          userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
              model: 'Users',
              key: 'id'
            }
          },
          content: {
            allowNull: true,
            type: DataTypes.STRING
          },
          attachement: {
            allowNull: true,
            type: DataTypes.STRING
          }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
      }, {
        classMethods: {
            associate: (models) => {
              models.Comment.belongsTo(models.User, 
                { foreignKey: {
                  allowNull: false
                 
                }, onDelete:'ON CASCADE',
              }),
                models.Comment.belongsTo(models.Post, 
                  { foreignKey: {
                    allowNull: false,
   
                  }, onDelete:'ON CASCADE',
                })
            }
        }
    }
    )
}
  