const express = require('express');
const router = express.Router();
// We'll use axios or built-in fetch if node version > 18, but package.json has axios.
// Ideally, use a Culqi SDK or direct axios calls.
// Since 'culqi-nodejs' is being installed, we'll try to use it or fallback to axios.
const axios = require('axios');

// Basic in-memory configuration or use dotenv
require('dotenv').config();

const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY;

router.post('/process', async (req, res) => {
    try {
        const { token, amount, currency, email } = req.body;

        if (!token || !amount || !currency || !email) {
            return res.status(400).json({ message: 'Faltan datos requeridos (token, amount, currency, email)' });
        }

        console.log(`Processing donation: ${amount} ${currency} from ${email}`);

        // Charges API Endpoint
        const url = 'https://api.culqi.com/v2/charges';

        const payload = {
            amount: Math.round(amount * 100), // Convert to cents, ensure integer
            currency_code: currency,
            email: email,
            source_id: token,
            description: `Donación a Alma para Crear - ${amount} ${currency} - ${email}`,
            // Antifraud details (optional but recommended)
            antifraud_details: {
                first_name: 'Donante',
                last_name: 'Anónimo',
                email: email,
                phone: '999999999' // Placeholder or captured from frontend
            }
        };

        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CULQI_SECRET_KEY}`
            }
        });

        console.log('Culqi Response:', response.data);

        // If successful
        if (response.data.object === 'charge') {
            return res.status(200).json({
                message: 'Donación exitosa',
                data: response.data
            });
        } else {
            // Depending on API, error might come here or catch block
            return res.status(400).json({ message: 'No se pudo procesar el cargo', details: response.data });
        }

    } catch (error) {
        console.error('Error processing donation:', error.response?.data || error.message);
        const userMessage = error.response?.data?.user_message || error.message || 'Error interno del servidor';
        return res.status(500).json({ message: userMessage, details: error.response?.data });
    }
});

module.exports = router;
