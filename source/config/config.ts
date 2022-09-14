// import dotenv from 'dotenv';

// dotenv.config();

// const MONGO_HOST = process.env.MONGO_URL || `127.0.0.1:27017/rest-api`;

const MONGO = {
    // host: MONGO_HOST,
    // password: MONGO_PASSWORD,
    // username: MONGO_USERNAME,

    // url: `mongodb://${MONGO_HOST}?readPreference=primary&directConnection=true&ssl=false`
    url: `mongodb+srv://dangvuhiep1291:prehaploke1@cluster0.amiuoxz.mongodb.net/ecommerce?retryWrites=true&w=majority`
};

const SERVER_HOSTNAME = process.env.SERVER_PORT || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_TOKEN_EXPIRETIME = process.env.ERVER_TOKEN_EXPIRETIME || 3600;
const ERVER_TOKEN_ISSUER = process.env.ERVER_TOKEN_ISSUER || 'coolIssuer';
const ERVER_TOKEN_SECRET = process.env.ERVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: ERVER_TOKEN_ISSUER,
        secret: ERVER_TOKEN_SECRET
    }
};

const config = {
    server: SERVER,
    mongo: MONGO
};

export default config;
