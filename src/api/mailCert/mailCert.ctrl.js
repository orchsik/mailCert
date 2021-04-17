"use strict";
const fs = require("fs");
const path = require("path");

const { smtpTransport } = require("../../lib/nodemailer");

const emailContentFile = path.join(__dirname, "sample.html");
const htmlstream = fs.createReadStream(emailContentFile);

const getMailCert = (req, res) => {
  return res.send("zzzzz");
};

// min ~ max까지 랜덤으로 숫자를 생성하는 함수
const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const postMailCert = async (req, res, next) => {
  const number = generateRandom(111111, 999999);

  const { toEmail } = req.body;

  const mailOptions = {
    from: '"김가네제삿날 👻" <orchsik@naver.com>',
    to: toEmail, // "bar@example.com, baz@example.com",
    subject: "[김가네제삿날]인증 관련 이메일 입니다",
    html: htmlstream,
    // html: `<b>오른쪽 숫자 6자리를 입력해주세요 : ${number}</b>`, // html body
  };

  try {
    const info = await smtpTransport.sendMail(mailOptions);
    console.log("Message sent:", info);
  } catch (err) {
    console.error("[postMailCert]", err);
  }

  res.end();
};

module.exports = {
  getMailCert,
  postMailCert,
};
