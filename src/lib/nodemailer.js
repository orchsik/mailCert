"use strict";
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  smtpTransport,
};
