// intialzing the dependinces
const express = require('express');
const cors = require('cors');
const config = require('./config/config')

// database connection
require('./database/db')

// defining the port on which application should run
port = config.port || 5000

//usng dependencies
const app = express()
// parses incoming requests with JSON payloads
app.use(express.json())
app.use(cors())

//  parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }))

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

// getting intilaze response from server
app.get('/', (req, res) => {
    return res.status(200).json({
        message:"server responding "
    })
})

app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})