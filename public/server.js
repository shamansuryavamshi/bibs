import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Route to serve index.html on GET "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve wish.html on GET "/wish"
app.get("/wish", (req, res) => {
    res.sendFile(path.join(__dirname, 'wish.html'));
});

// Password submission handler
app.post("/submit", (req, res) => {
    let inputValue = req.body.input;

    if (typeof inputValue !== "string") inputValue = "";
    inputValue = inputValue.trim();

    const isValid = /^[0-9]{4}$/.test(inputValue) && inputValue === "4901";

    if (isValid) {
        // ✅ Redirect to /wish if password is correct
        res.redirect("/wish");
    } else {
        // ❌ Show alert and redirect back to home
        res.send(`<script>alert('Incorrect password: ${inputValue}'); window.location.href = '/';</script>`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
