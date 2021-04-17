"use strict";

const { smtpTransport } = require("../../lib/nodemailer");

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
    from: "김가네제삿날",
    to: toEmail,
    subject: "[김가네제삿날]인증 관련 이메일 입니다",
    text: "오른쪽 숫자 6자리를 입력해주세요 : " + number,
  };

  const result = await smtpTransport.sendMail(mailOptions, (error, res) => {
    if (error) {
      res
        .status(statusCode.OK)
        .send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL));
    } else {
      /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
      res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
          number: number,
        })
      );
    }
    smtpTransport.close();
  });

  res.end();
};

module.exports = {
  getMailCert,
  postMailCert,
};
