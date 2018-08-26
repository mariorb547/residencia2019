const nodemailer = require('nodemailer');
// CONFIG ENVIROMENT
require('dotenv').config()

const emailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USUARIO_GMAIL,
        pass: process.env.PASSWORD_GMAIL
    }
})

module.exports = emailTransporter;