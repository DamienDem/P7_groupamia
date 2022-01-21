module.exports = (sequelize ,DataTypes) => {
    return sequelize.define('Like', {
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
      isLike : {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
      }, {
          classMethods: {
              associate: (models) => {
                models.User.belongsToMany(models.Post, {
                    through: models.Like,
                    foreignKey: 'userId',
                    otherKey: 'postId',
                  });

                models.Post.belongsToMany(models.User, {
                  through: models.Like,
                  foreignKey: 'postId',
                  otherKey: 'userId',
                });
                models.Like.belongsTo(models.User, {
                  foreignKey: 'userId',
                  as: 'user',
                });

                models.Like.belongsTo(models.Post, {
                  foreignKey: 'postId',
                  as: 'post',
                });   
              }
          }
      }
)}
