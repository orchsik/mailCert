"use strict";
const express = require("express");
const router = express.Router();

const ctrl = require("./mailCert.ctrl");

router.get("/", ctrl.getMailCert);
router.post("/", ctrl.postMailCert);

module.exports = router;
