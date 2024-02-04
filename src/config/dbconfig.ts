const { Sequelize } = require('sequelize');

const connectionString = "Server=cooleycoreme.database.windows.net;Database=mtrdev;Trusted_Connection=No;Driver={ODBC Driver 17 for SQL Server};UID=mtrdev;PWD=B1%=]fV2cEj9;Connection Timeout=30";
export const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectModulePath: 'msnodesqlv8/lib/sequelize',
  dialectOptions: {
    user: '',
    password: '',
    database: 'mtrdev',
    options: {
      driver: '',
      connectionString,
      trustedConnection: false,
      instanceName: ''
    }
  },
  pool: {
    min: 0,
    max: 5,
    idle: 10000
  }
})

const querySql = sequelize.query.bind(sequelize);


sequelize.query = async (...args: any) => {
  const res = await querySql(...args);
  return res[0]
}