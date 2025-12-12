
const culqiService = require('../services/culqi.service');
const db = require('../database'); // Import the database connection

/**
 * Controller to create a Culqi payment order.
 * It expects the frontend to send the amount and client details.
 */
const createPaymentOrder = async (req, res) => {
  const { amount, email, firstName, lastName, phone } = req.body;

  if (!amount || !email || !firstName || !lastName || !phone) {
    return res.status(400).json({ message: 'Amount, email, name, last name, and phone are required.' });
  }

  try {
    // Culqi expects the amount in cents, so we multiply by 100 and round to the nearest integer.
    const amountInCents = Math.round(amount * 100);
    const description = `Donación para Alma para Crear`;
    // Generate a unique order number for tracking.
    const orderNumber = `apc-donation-${Date.now()}`;

    const culqiOrder = await culqiService.createOrder({
      amount: amountInCents,
      description: description,
      orderNumber: orderNumber,
      clientDetails: {
        firstName,
        lastName,
        email,
        phone,
      }
    });

    // The donation will be saved via webhook, so no DB interaction here.

    // Send the Order ID back to the frontend.
    res.status(200).json({ orderId: culqiOrder.id });

  } catch (error) {
    console.error('Error in createPaymentOrder controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Controller to handle webhook notifications from Culqi.
 * This is crucial for confirming if a payment was successful and saving it.
 */
const handleWebhook = async (req, res) => {
  const event = req.body;

  // In production, you MUST verify the signature from the `Culqi-Signature` header.

  try {
    // Check if the order was successfully paid
    if (event.type === 'order.status.changed' && event.data.status === 'paid') {
      const order = event.data;
      // The charge object contains the final details of the successful transaction
      const charge = order.charge;

      console.log(`Order ${order.order_number} was paid successfully. Charge ID: ${charge.id}`);
      
      // Prepare the donation record for our database
      const newDonation = {
        // Amount is in cents from Culqi, convert back to major unit for DB
        amount: charge.amount / 100, 
        currency_code: charge.currency_code,
        description: charge.description,
        culqi_charge_id: charge.id, // The unique ID for the successful charge
        status: 'successful',
        // Store the entire charge object from Culqi as JSONB for future reference
        metadata: JSON.stringify(charge), 
      };

      // Insert the new donation into the database
      await db('donations').insert(newDonation);
      console.log(`Donation ${charge.id} saved to database.`);
    }

    // Respond to Culqi to acknowledge receipt of the event.
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error handling webhook or saving donation:', error);
    // Even if our DB fails, we should try to send a 200 to Culqi to prevent retries
    // But we log the error internally.
    res.status(200).json({ received: true, error: 'Internal error processing event.' });
  }
};


const createCharge = async (req, res) => {
  const { amount, email, tokenId, orderId } = req.body;

  if (!amount || !email || !tokenId || !orderId) {
    return res.status(400).json({ message: "Amount, email, tokenId, and orderId are required." });
  }

  try {
    const amountInCents = Math.round(amount * 100);
    const charge = await culqiService.createCharge({
      amount: amountInCents,
      email: email,
      source_id: tokenId,
      order_id: orderId,
    });

    // The webhook will handle saving the donation to the DB.
    // We just send a success response to the frontend.
    res.status(200).json({ success: true, charge });

  } catch (error) {
    console.error("Error in createCharge controller:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPaymentOrder,
  handleWebhook,
  createCharge,
};
