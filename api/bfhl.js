// api/bfhl.js
export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const USER_ID = "Garv_Kumar_12012005";
    const EMAIL = "22bai70298@cuchd.in";
    const ROLL_NUMBER = "22BAI70298";

    if (req.method === 'GET') {
        res.status(200).json({
            operation_code: 1
        });
        return;
    }

    if (req.method === 'POST') {
        try {
            if (!req.body.data || !Array.isArray(req.body.data)) {
                res.status(400).json({
                    is_success: false,
                    message: "Invalid input format. Expected array in 'data' field"
                });
                return;
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

            res.status(200).json({
                is_success: true,
                user_id: USER_ID,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                numbers: numbers,
                alphabets: alphabets,
                highest_alphabet: highest_alphabet
            });
            return;

        } catch (error) {
            res.status(500).json({
                is_success: false,
                message: "Internal server error"
            });
            return;
        }
    }
}
