const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const USER_ID = "Garv_Kumar_12012005";
const EMAIL = "22bai70298@cuchd.in";
const ROLL_NUMBER = "22BAI70298";

app.get('/api/bfhl', (req, res) => {
    return res.status(200).json({
        operation_code: 1
    });
});

app.post('/api/bfhl', (req, res) => {
    try {
        if (!req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input format. Expected array in 'data' field"
            });
        }

        const data = req.body.data;
        
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && typeof item === 'string' && item.length === 1);
        
        let highest_alphabet = [];
        if (alphabets.length > 0) {
            const highestChar = alphabets.reduce((max, current) => {
                return current.toLowerCase() > max.toLowerCase() ? current : max;
            });
            highest_alphabet = [highestChar];
        }

        return res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

module.exports = app;