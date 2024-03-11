const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
const port = 5000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'images'
});

connection.connect();

// Configure multer to save files to the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
    // Check if file exists and is not empty
    if (!req.file || !req.file.buffer) {
        return res.status(400).send('No file uploaded or file is empty');
    }

    const { filename, mimetype, size } = req.file;
    const filePath = req.file.path; // Store the file path

    // Insert the file metadata and path into the database
    const sql = 'INSERT INTO image (filename, mimetype, size, filepath) VALUES (?, ?, ?, ?)';
    connection.query(sql, [filename, mimetype, size, filePath], (err, result) => {
        if (err) {
            // Remove the uploaded file if there's an error
            fs.unlinkSync(filePath);
            return res.status(500).send('Error uploading image');
        }
        res.send('Image uploaded successfully');
    });
});

app.get('/image', (req, res) => {
    // Retrieve all images from the database
    connection.query('SELECT * FROM image', (error, results) => {
        if (error) {
            return res.status(500).send('Error fetching images');
        }
        res.json(results);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
