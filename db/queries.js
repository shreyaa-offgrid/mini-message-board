const pool = require('./pool');

async function getAllMessages(){
  const {rows} = await pool.query(`
    SELECT * FROM messages 
    ORDER BY added DESC`);
  return rows;
}

async function getMessage(id){
  const msgId = Number(id);
  if(Number.isNaN(msgId)){
    return null;
  }
  const {rows} = await pool.query(`
    SELECT * FROM messages
    WHERE id = $1
    `, [msgId]);
  if(rows.length===0) return null;
  return rows[0];
}

async function createMessage(username, text){
  const {rows} = await pool.query(
    `INSERT INTO messages(username, text) 
    VALUES ($1,$2)
    RETURNING id, username, text, added`,
    [username, text]);
    return rows[0];
}

async function deleteAllMessages(){
  await pool.query("DELETE FROM messages");
}

async function deleteMessage(id) {
  if (Number.isNaN(Number(id))) {
    return false;
  }

  const result = await pool.query(
    `DELETE FROM messages
     WHERE id = $1`,
    [Number(id)]
  );

  return result.rowCount > 0;
}

module.exports = {
  getAllMessages, getMessage,
  createMessage, deleteAllMessages,
  deleteMessage
};