const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const genres = [
   { id: 1, name: 'horror' },
   { id: 2, name: 'comedy' },
   { id: 3, name: 'romantic comdey' },
   { id: 4, name: 'film noir' },
   { id: 5, name: 'marvel universe' }
]


app.get('/', (req,res) => {
    res.send('Hello world')
})

app.get('/api/genres', (req,res) => {
    res.send(genres);
})

app.post('/api/genres', (req,res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
})

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given id could not be found');

    return res.send(genre);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(2).required()
    };
    console.log(`genre: ${genre}`);

    return Joi.validate(genre, schema);
};

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))