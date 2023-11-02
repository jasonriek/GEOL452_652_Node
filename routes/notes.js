const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const db = require('../service/notes_db');
router.use(body_parser.json());

router.get('/:subject/:id', (req, res) => {
    let context = {};
    let subject = req.params.subject;
    let id = parseInt(req.params.id);
    let page = db.getNotesById(subject, id);
    let page_count = db.getNotesCount(subject);
    context['title'] = page.title;
    context['content'] = page.content;
    context['subject'] = subject;
    context['id'] = id;
    context['page_count'] = page_count;
    console.log(`page_count: ${page_count}`)
    
    res.render('notes', context);
});


module.exports = router;