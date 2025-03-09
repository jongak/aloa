var sql = require("mssql");
var { config } = require("./config.js");

// Promise를 반환하는 pool 생성
const connPool = new sql.ConnectionPool(config.dbconfig)
  .connect()
  .then((pool) => {
    console.log(
      `${config.dbconfig.server}:${config.dbconfig.port} DB 연결 완료`
    );
    return pool;
  })
  .catch((err) => {
    console.log("err ", err);
    throw err;
  });

// 트랜잭션 헬퍼 함수 추가
const getTransaction = async () => {
  const pool = await connPool;
  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  return transaction;
};

module.exports = {
  sql,
  connPool,
  getTransaction,
};
