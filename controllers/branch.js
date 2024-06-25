const { response, request } = require("express")
const Service = require("../models/service")
const Product = require("../models/product")
const Professional = require("../models/professional")

const getServicesByBranchId = async (req = request, res = response) => {
    const services = await Service.find({ branchId: req.params['branchId']});
    res.json({ services })
}

const getProductsByBranchId = async (req = request, res = response) => {
    const products = await Product.find({ branchId: req.params['branchId']});
    res.json({ products })
}

const getProfessionalsByBranchId = async (req = request, res = response) => {
    const professionals = await Professional.find({ branchId: req.params['branchId']});
    res.json({ professionals })
}

module.exports = {
    getServicesByBranchId,
    getProductsByBranchId,
    getProfessionalsByBranchId
}