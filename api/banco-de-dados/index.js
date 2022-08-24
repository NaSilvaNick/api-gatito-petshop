const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
  config.get('mysql.database'),
  config.get('mysql.user'),
  config.get('mysql.password'),
  {
    hist: config.get('mysql.host'),
    dialect: config.get('mysql.dialect')
  }
)

module.exports = instancia
