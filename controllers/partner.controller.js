const Branch = require("../models/branch.model");
const Partner = require("../models/partner.model");

class PartnerController {
  static async getPartnerDetails(req, res) {
    const partner = await Partner.findById(req.params["partnerId"]);
    const branches = await Branch.find({ partnerId: req.params["partnerId"] });
    partner.branches = branches;
    res.json(partner);
  }

  static async getBranchesByPartnerId(req, res) {
    const branches = await Branch.find({ partnerId: req.params["partnerId"] });
    res.json(branches);
  }

  static getAllPartners = async (req, res) => {
    const partners = await Partner.find();
    res.json(partners);
  };
}

module.exports = PartnerController;
