
const express = require('express');
const router = express.Router();
const { createPaymentOrder, handleWebhook, createCharge } = require('../controllers/payments.controller');

// Defines the route for creating a payment order.
// The frontend will call this endpoint to get the Culqi Checkout URL.
router.post('/create-order', createPaymentOrder);

// Defines the route for creating the final charge after getting a token.
router.post('/create-charge', createCharge);

// Defines the route for receiving webhook notifications from Culqi.
// Culqi will send POST requests to this endpoint to notify about payment status changes.
router.post('/webhook', handleWebhook);

module.exports = router;
