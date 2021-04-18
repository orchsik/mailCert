"use strict";
const nodemailer = require("nodemailer");

const naver_transport = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.email",
  port: 9999,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

// https://support.microsoft.com/ko-kr/office/outlook-com%EC%9D%98-pop-imap-%EB%B0%8F-smtp-%EC%84%A4%EC%A0%95-d088b986-291d-42b8-9564-9c414e2aa040
const outlook_transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

module.exports = {
  naver_transport,
  outlook_transporter,
};
