const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const db = require('../service/db');
const notes_db = require('../service/notes_db');
router.use(body_parser.json());

router.get('/create', (req, res) => {
    context = {}
    res.render('index_create', context);
});

router.post('/create', (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let content = req.body.content;
    let reference = req.body.reference;
    db.createPage(title, content, reference);
    res.send('Page created!');
});

module.exports = router;