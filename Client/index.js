const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'app', 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app', 'app.html'));
});

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to ${PORT} port`));