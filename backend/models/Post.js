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
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      attachement: {
        type:DataTypes.STRING,
        allowNull: true
      },
      comments: {
        type: DataTypes.INTEGER,
        allowNull:true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
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
              }, onDelete:'CASCADE', 
            }),
              models.Post.hasMany(models.Comment )
            models.Post.hasMany(models.Like)
      
          }
        }
      }
    )};