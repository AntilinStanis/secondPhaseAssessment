require('dotenv').config();

CONFIG={};
CONFIG.environment=process.env.APP;
CONFIG.db_host=process.env.DB_HOST;
CONFIG.db_port=process.env.DB_PORT;
CONFIG.db_name=process.env.DB_NAME;
CONFIG.db_user=process.env.DB_USER;
CONFIG.db_password=process.env.DB_PASSWORD;
CONFIG.db_dialect=process.env.DB_DIALECT;

CONFIG.secretKey=process.env.SECRETKEY;
CONFIG.jwt_expiration=process.env.JWT_EXPIRATION;
CONFIG.jwt_encryption=process.env.JWT_ENCRYPTION;
CONFIG.user=process.env.USER;
CONFIG.pass=process.env.PASS;