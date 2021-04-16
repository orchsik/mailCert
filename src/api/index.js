"use strict";
const express = require("express");
const router = express.Router();

const mailCert = require("./mailCert");

router.use("/mailCert", mailCert);

module.exports = router;
