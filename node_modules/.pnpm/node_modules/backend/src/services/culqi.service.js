
const axios = require('axios');

// This service is responsible for all communication with the Culqi API.
const culqiApi = axios.create({
  baseURL: 'https://api.culqi.com/v2',
  headers: {
    'Authorization': `Bearer ${process.env.CULQI_SECRET_KEY}`,
    'Content-Type': 'application/json',
  }
});

/**
 * Creates a payment order in Culqi for the Checkout flow.
 * @param {object} params - The parameters for creating the order.
 * @param {number} params.amount - The amount to charge in the smallest currency unit (e.g., cents for PEN).
 * @param {string} params.description - The description of the charge.
 * @param {string} params.orderNumber - A unique identifier for the order.
 * @param {object} params.clientDetails - The details of the client making the donation.
 * @returns {Promise<string>} The checkout URL to redirect the user to.
 */
const createOrder = async ({ amount, description, orderNumber, clientDetails }) => {
  try {
    // The expiration date is set to 24 hours from now.
    const expirationDate = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

    const orderData = {
      amount: amount,
      currency_code: 'PEN',
      description: description,
      order_number: orderNumber,
      client_details: {
        first_name: clientDetails.firstName,
        last_name: clientDetails.lastName,
        email: clientDetails.email,
        phone_number: clientDetails.phone,
      },
      expiration_date: expirationDate,
      // This tells Culqi that the payment will be confirmed through the checkout.
      confirm: false, 
    };

    const response = await culqiApi.post('/orders', orderData);
    
    console.log('Culqi API Response:', response.data); // Debugging line

    // We return the whole data object so the controller can get the order ID.
    return response.data;

  } catch (error) {
    // Log the detailed error from Culqi if available
    if (error.response) {
      console.error('Error creating Culqi order:', error.response.data);
    } else {
      console.error('Error creating Culqi order:', error.message);
    }
    // Re-throw the error to be handled by the controller
    throw new Error('Failed to create payment order with Culqi.');
  }
};

const createCharge = async ({ amount, email, source_id, order_id }) => {
  try {
    const chargeData = {
      amount: amount,
      currency_code: "PEN",
      email: email,
      source_id: source_id,
      order_id: order_id,
    };

    const response = await culqiApi.post("/charges", chargeData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error creating Culqi charge:", error.response.data);
    } else {
      console.error("Error creating Culqi charge:", error.message);
    }
    throw new Error("Failed to create charge with Culqi.");
  }
};

module.exports = {
  createOrder,
  createCharge,
};
