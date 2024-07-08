const express = require("express");
const router = express.Router();
const BranchController = require("../controllers/branch.controller");
const isAuthenticated = require("../middlewares/auth.middleware");

router.get(
  "/",
  isAuthenticated,
  BranchController.getAllBranches
)

router.get(
  "/:branchId",
  isAuthenticated,
  BranchController.getBranchById
)

router.get(
  "/:branchId/services",
  isAuthenticated,
  BranchController.getServicesByBranchId
);
router.get(
  "/:branchId/products",
  isAuthenticated,
  BranchController.getProductsByBranchId
);
router.get(
  "/:branchId/professionals",
  isAuthenticated,
  BranchController.getProfessionalsByBranchId
);

module.exports = router;
