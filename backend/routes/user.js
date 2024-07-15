const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

// 獲取用戶列表
router.get('/userList', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM `student-project`.`user`');  // 根據你的資料庫查詢語句來修改
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '無法獲取用戶列表' });
    }
});

module.exports = router;