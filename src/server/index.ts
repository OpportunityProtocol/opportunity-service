// Create express app
var express = require("express")
var app = express()

const port = process.env.SERVER_PORT || 8080

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});