import express, { Router } from "express";
import { InvoiceController } from "../controllers/like";
import { roleJwt } from "../middlewares/middleware.role";
import { invoiceValidator } from "../utils/util.validator";
const router: Router = express.Router();

router.post(
	"/like",
	[roleJwt(), ...invoiceValidator()],
	InvoiceController.createInvoice
);
router.get("/like", [roleJwt()], InvoiceController.resultsInvoice);
router.get("/like/:id", [roleJwt()], InvoiceController.detailInvoice);
router.delete("/like/:id", [roleJwt()], InvoiceController.deleteInvoice);
router.put("/like/:id", [roleJwt()], InvoiceController.updateInvoice);

export default router;
