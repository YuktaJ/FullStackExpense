const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/auth");
const purchaseController = require("../controllers/purchase");

router.get(
  "/premium",
  userAuthentication.authenticate,
  purchaseController.purchasePremium
);
router.post(
  "/update",
  userAuthentication.authenticate,
  purchaseController.updateTransactionStatus
);
module.exports = router;
