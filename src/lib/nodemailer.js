"use strict";
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
  host: "smtp.naver.email",
  port: 9999,
  secure: false,
});

module.exports = {
  smtpTransport,
};
