require('dotenv').config()
module.exports = {
    
    // url: process.env.APP_DB
    HOST: process.env.APP_HOST,
    PORT: process.env.APP_PORT,
    DB: process.env.APP_DB,
    SECRET: process.env.APP_SECRET

  };