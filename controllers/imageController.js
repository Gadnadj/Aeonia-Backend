import axios from 'axios';
import userModel from '../models/User.js';
import FormData from 'form-data';

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!userId || !prompt) {
            return res.json({ success: false, message: "Missing Details!" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance });
        }

        if (typeof prompt !== 'string' || prompt.trim() === '') {
            return res.json({ success: false, message: "Invalid prompt!" });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
        user.creditBalance -= 1;

        res.json({ success: true, message: 'Image Generated', creditBalance: user.creditBalance, resultImage });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

export default generateImage;
