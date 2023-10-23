module.exports = {
  mysql: {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },

  // mysql: {
  //   connectionLimit: 10,
  //   host: "localhost",
  //   user: "root",
  //   password: "1234",
  //   database: "localticket",
  //   port: 3306,
  // },
};
