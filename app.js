const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 使用用户路由
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
