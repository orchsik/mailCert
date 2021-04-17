"use strict";
const fs = require("fs");
const path = require("path");

const { smtpTransport } = require("../../lib/nodemailer");

const emailContentFile = path.join(__dirname, "sample.html");
const htmlstream = fs.createReadStream(emailContentFile);

const getMailCert = (req, res) => {
  return res.send("test page");
};

const htmlFor = (certCode) => {
  return `<h1 id="-">인증코드 안내</h1>

  <h3 id="-">안녕하세요? 김가네제삿날입니다.</h3>
  <h3 id="-6-">
    아래 인증코드 6자리를 진행중인 화면에 입력하고 인증을 완료해주세요.
  </h3>
  <hr />
  
  <h2 id="-">인증코드</h2>
  <h1 id=${certCode}>${certCode}</h1>
  `;
};

// min ~ max까지 랜덤으로 숫자를 생성하는 함수
const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const postMailCert = async (req, res, next) => {
  const certCode = generateRandom(111111, 999999);

  const { toEmail } = req.body;

  const mailOptions = {
    from: '"김가네제삿날 👻" <orchsik@naver.com>',
    to: toEmail, // "bar@example.com, baz@example.com",
    subject: "[김가네제삿날]인증 관련 이메일 입니다.",
    html: htmlFor(certCode),
    // html: htmlstream,
  };

  try {
    const info = await smtpTransport.sendMail(mailOptions);
    // console.log("Message sent:", info);
    return res.status(200).json({ certCode });
  } catch (err) {
    // console.error("[postMailCert]", err);
    return res.status(500).send(err.message || "");
  }
};

module.exports = {
  getMailCert,
  postMailCert,
};
