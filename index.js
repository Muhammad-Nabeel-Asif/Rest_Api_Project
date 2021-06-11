const express = require('express');
const app = express();

app.get('/cookies', (req ,res) => {
    res.send('/cookies');
})

app.post('/cookies',  (req,res) => {
    res.send('Post : /cookies')
})

app.get("*", (req,res) => {
    res.send('sorry nothing found :)')
})

app.listen(3000, () => {
    console.log('listening at port 3000');
})