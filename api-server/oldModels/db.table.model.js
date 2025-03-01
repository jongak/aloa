const { S3Client } = require("@aws-sdk/client-s3");
const pool = require("./pool");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TableModel = {
  // 닉네임중복검사
  async TableModel(conn = pool) {
    try {
      // article = {login_id,password}
      const sql = `
      CREATE TABLE IF NOT EXISTS ${process.env.DB_DATABASE}.notice;
      `;
      const [result] = await conn.query(sql);
      return result.length;
    } catch (err) {
      throw err;
    }
  },

  async deleteImg(id) {
    const bucketParams = {
      Bucket: "aloa-bucket",
      Key: encodeURIComponent(id),
    };
    try {
      await s3Client.send(new DeleteObjectCommand(bucketParams));
      return true;
    } catch (err) {
      throw err;
    }
  },

  async deleteSQL(pid, conn = pool) {
    try {
      const sql = `delete from cards  where id = ?`;
      await conn.query(sql, [pid]);
      return true;
    } catch (err) {
      throw err;
    }
  },
  async changeName(pid, new_id, conn = pool) {
    try {
      const sql = `update cards set ? where ?`;
      await conn.query(sql, [{ character_id: new_id }, { id: pid }]);
      return true;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = TableModel;
