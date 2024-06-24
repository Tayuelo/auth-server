const { response, request } = require("express")
const Service = require("../models/service")

const getServicesByBranchId = async (req = request, res = response) => {
    const services = await Service.findById(req.params['branchId']);
    res.json({ services })
}

module.exports = {
    getServicesByBranchId
}