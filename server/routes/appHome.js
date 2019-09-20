import express from 'express'
import path from 'path'

var router = express.Router({ mergeParams: true });

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'index.html'));
})
