const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')


const UserRoute = require('./routes/user.routes')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})