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
              models.User.belongsToMany(models.Post, {
                  through: models.Comment,
                  foreignKey: 'userId',
                  otherKey: 'postId',
                });

              models.Post.belongsToMany(models.User, {
                through: models.Comment,
                foreignKey: 'postId',
                otherKey: 'userId',
              });
              models.Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
              });

              models.Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                as: 'post',
              });   
            }
        }
    }
    )
}
  