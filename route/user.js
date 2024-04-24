const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    const { userno, username, password, email } = req.body;

    try {
        // 这里添加数据库操作
        res.render('create_success');
    } catch (error) {
        res.render('create_fail');
    }
});

module.exports = router;
