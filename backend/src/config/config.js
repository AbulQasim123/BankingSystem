require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,

    jwtSecret: process.env.JWT_SECRET,

    frontendUrl: process.env.FRONTEND_URL,

    mail: {
        user: process.env.MAIL_USER,
        pass: process.env.APP_PASS,
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
    },

    db: {
        host: process.env.PGHOST || '127.0.0.1',
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        ssl: false,
        max: 10
    },
};

module.exports = config;
