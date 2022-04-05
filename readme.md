# Openclassrooms p7

Creation of a enterprise social network for Groupomania

## Technologys:

MariaDB - Sequelize - NodeJS - Express - ReactJS - Sass/Css

## Fisrt: 

Clone this repo

## Backend installation:

### In backend folder run: 

* `npm install`
* `npm start`


## Frontend installation :

### In frontend folder run:

* `npm install`
* `npm start`

### In backend/db/sequelize:

 Enter your database ID line 8

```

const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

```

