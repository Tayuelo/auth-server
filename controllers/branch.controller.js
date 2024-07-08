const { response, request } = require("express")
const Service = require("../models/service.model")
const Product = require("../models/product.model")
const Professional = require("../models/professional.model")
const Branch = require("../models/branch.model")

class BranchController {
    static getAllBranches = async (req, res) => {
        const branches = await Branch.find();
        res.json(branches);
    }

    static getServicesByBranchId = async (req = request, res = response) => {
        const services = await Service.find({ branchId: req.params['branchId']});
        res.json(services)
    }
    
    static getProductsByBranchId = async (req = request, res = response) => {
        const products = await Product.find({ branchId: req.params['branchId']});
        res.json(products)
    }
    
    static getProfessionalsByBranchId = async (req = request, res = response) => {
        const professionals = await Professional.find({ branchId: req.params['branchId']});
        res.json(professionals)
    }

    static getBranchById = async (req, res) => {
        const branch = await Branch.findById(req.params['branchId']);
        res.json(branch);
    }
}

module.exports = BranchController;