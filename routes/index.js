const express = require("express");
const router = express.Router();
const authRouter = require('../routes/auth.router');
const partnerRouter = require('../routes/partner.router');
const branchRouter = require('../routes/branch.router');

router.use('/auth', authRouter);
router.use('/partners', partnerRouter);
router.use('/branch', branchRouter);

module.exports = router;
