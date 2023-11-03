const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/save-my-shit', (req, res) => {
    const newData = req.body;
    console.log(newData);
    // Read existing data from the JSON file
    let existingData = {};
    try {
        existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    } catch (error) {
        console.error('Error reading data.json:', error);
    }

    // Update the data with the new information
    const site = newData.site;
    existingData[site] = newData;

    // Write the updated data back to the JSON file
    fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2), 'utf8');

    res.json({ message: 'Data saved successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
