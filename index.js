const express = require('express');
const app = express();
const body_parser = require('body-parser');
const primary_router = require('./routes/primary');
const admin_router = require('./routes/admin');
const notes_router = require('./routes/notes');
const PORT = 58000

/* Setup App */
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false })); // <--- middleware configuration
app.use(body_parser.json());

app.use(express.static('public'));


/* Primary Routes */
app.use('/', primary_router);

/* Admin Routes */
app.use('/admin', admin_router);

/* Notes Routes */
app.use('/notes', notes_router);


app.listen(PORT, () => {
    console.log(`GEOL452_652 is hosted on localhost at port ${PORT}`);
});