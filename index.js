const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

// parsing body with urlencoded method && json file as well
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting up the views directory and joining to combine the route for file access.
app.set('/views', path.join(__dirname , 'views'));
app.set('view engine', 'ejs')

const comments = [
    {
        id:uuid(),
        username: 'Nabeel',
        comment: 'Heheheehehhehe , here is my comment !'
    },
    {
        id:uuid(),
        username: 'Asif',
        comment: 'Heheheehehhehe , here is my comment !'
    },
    {
        id:uuid(),
        username: 'Adeel',
        comment: 'Heheheehehhehe , here is my comment !'
    },
    {
        id:uuid(),
        username: 'Hadi',
        comment: 'Heheheehehhehe , here is my comment !'
    }
];

// we are rendering comments from above comments array to a ejs file => index.ejs when we receive a get request for '/comments' 

app.get('/comments', (req,res) => {
    res.render('comments/index', {comments});
})


// creating route for adding new comments :
// {
app.get('/comments/new', (req,res) => {
    res.render('comments/new');
})
// sending post request to retrieve data from form and do opr on it and use it :
app.post('/comments', (req,res) => {
    const {username, comment} = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments')
})
// }

app.get('/comments/:id', (req,res) => {
    const { id } = req.params;
    let comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})  


app.get("*", (req,res) => {
    res.send('sorry nothing found :)')
})

app.listen(3000, () => {
    console.log('listening at port 3000');
})