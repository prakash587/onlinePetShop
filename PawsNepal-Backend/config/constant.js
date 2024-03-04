require("dotenv").config(".env");

PORT = process.env.PORT;
HOST_NAME = process.env.HOST_NAME;
DB_URL = process.env.DB_URL;
DB_NAME = process.env.DB_NAME;
JWT_SECRET = process.env.JWT_SECRET;
SERVER_KEY= process.env.SERVER_KEY;
PUBLIC_KEY= process.env.PUBLIC_KEY;
PRIVATE_KEY = process.env.PRIVATE_KEY;
ADMIN_ID ="65df61907d7bc7302631e059"

module.exports = {
    PORT,
    HOST_NAME,
    DB_URL,
    DB_NAME,
    JWT_SECRET,
    PUBLIC_KEY,
    PRIVATE_KEY,
    ADMIN_ID
};