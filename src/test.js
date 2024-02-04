const sql = require("msnodesqlv8");
const { Sequelize } = require('sequelize');

const connectionString = "Server=cooleycoreme.database.windows.net;Database=mtrdev;Trusted_Connection=No;Driver={ODBC Driver 17 for SQL Server};UID=mtrdev;PWD=B1%=]fV2cEj9;Connection Timeout=30";
const query =   `SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE'`

// sql.query(connectionString, query, (err, rows) => {
//     if(err) console.log("error:", err)
//     else console.log(rows);
// });

const sequelize = new Sequelize({
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

  sequelize.query = async (...args) => {
    const res = await querySql(...args);
    return res[0]
  }


  sequelize.query(query).then((data)=>{
    console.log(data)
  }).catch(console.log)