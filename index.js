const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Your personal details - replace these with your actual details
const USER_ID = "Garv_Kumar_12012005"; // format: fullname_ddmmyyyy
const EMAIL = "22bai70298@cuchd.in";
const ROLL_NUMBER = "22BAI70298";

// GET endpoint
app.get('/bfhl', (req, res) => {
    return res.status(200).json({
        operation_code: 1
    });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        // Input validation
        if (!req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input format. Expected array in 'data' field"
            });
        }

        const data = req.body.data;
        
        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && typeof item === 'string' && item.length === 1);
        
        // Find highest alphabet (case insensitive)
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});