module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true, 
      allowNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        models.User.hasMany(models.Post);
        models.User.hasMany(models.Comment);
        models.User.hasMany(models.Like);
      }
    }
  });
}