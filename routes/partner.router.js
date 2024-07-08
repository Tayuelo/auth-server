const express = require("express");
const router = express.Router();
const PartnerController = require("../controllers/partner.controller");
const isAuthenticated = require("../middlewares/auth.middleware");

router.get('/', isAuthenticated, PartnerController.getAllPartners);

router.get('/partner-details/:partnerId', isAuthenticated, PartnerController.getPartnerDetails);

router.get('/partner-details/:partnerId/branches', isAuthenticated, PartnerController.getBranchesByPartnerId);

module.exports = router;