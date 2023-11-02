const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const db = require('../service/db');
router.use(body_parser.json());

router.get('/', (req, res) => {
    context = {};
    let page = db.getPageById(1);
    console.log(page);
    context['title'] = page.title;
    context['content'] = page.content;

    res.render('index', context);
});

router.get('/:reference', (req, res) => {
    let reference = req.params.reference;
    context = {};
    let page = db.getPageByReference(reference);
    console.log(page);
    context['title'] = page.title;
    context['content'] = page.content;
    
    res.render('index', context);
});


module.exports = router;