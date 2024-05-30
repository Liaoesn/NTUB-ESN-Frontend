import { withSession } from '../../../lib/session';
import pool from '../../../lib/db';
import { OAuth2Client } from 'google-auth-library';

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, HOST } = process.env;

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `${HOST}/api/auth/callback`,
});

// 查看資料庫內有無紀錄
const getUserFromDb = async (email) => {
  const [rows] = await pool.query('SELECT * FROM `student-project`.`user` WHERE email = ?', [email]);
  return rows[0];
};

const createUserInDb = async (userInfo) => {
  // 動態獲取當前年份和月份
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() - 1911; // 將西元年轉為民國年
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // 獲取月份並補齊兩位

  // 獲取最新的 userno
  const [result] = await pool.query('SELECT userno FROM `student-project`.`user` ORDER BY userno DESC LIMIT 1');
  let newUserNo;
  if (result.length > 0) {
    const latestUserNo = result[0].userno;
    const latestSequence = latestUserNo % 1000 + 1; // 提取最新的序號部分並加1
    newUserNo = parseInt(`${currentYear}${currentMonth}${String(latestSequence).padStart(3, '0')}`);
  } else {
    newUserNo = `${currentYear}${currentMonth}001`;
  }

  await pool.query('INSERT INTO `student-project`.`user` (userno, username, avatar_url, email, permissions, state) VALUES (?, ?, ?, ?, ?, ?)', [
    newUserNo, userInfo.name, userInfo.picture, userInfo.email, 0, '使用中'
  ]);

  return {
    ...userInfo,
    userno: newUserNo,
    permissions: 0,
    state: '使用中',
  };
};

export default withSession(async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userInfoResponse = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    });

    const userInfo = userInfoResponse.data;

    const userEmail = userInfo.email;

    if (!userEmail.endsWith('@ntub.edu.tw')) {
      return res.status(403).send('Please log in with your school Google account');
    }

    let user = await getUserFromDb(userEmail);

    if (!user) {
      user = await createUserInDb(userInfo);
    }

    // 如果請求中带有 name 和 email，則更新資料庫
    if (userInfo.name && userInfo.email) {
      await pool.query('UPDATE `student-project`.`user` SET username = ?, email = ? WHERE email = ?', [userInfo.name, userInfo.email, userEmail]);

      // 獲取更新後的使用者信息
      user = await getUserFromDb(userInfo.email);
    }

    req.session.set('user', userInfo);
    await req.session.save();
    res.redirect('/user/loginSuccess');
  } catch (error) {
    console.error('Error in authentication flow:', error); // 添加錯誤日誌
    res.status(400).send('Error fetching Google user info');
  }
});

// import { withSession } from '../../../lib/session';
// import pool from '../../../lib/db'

// import { OAuth2Client } from 'google-auth-library';


// const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, HOST } = process.env;

// const client = new OAuth2Client({
//   clientId: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_SECRET_KEY,
//   redirectUri: `${HOST}/api/auth/callback`,
// });

// //查看資料庫內有無紀錄
// const getUserFromDb = async (email) => {
//   const [rows] = await pool.query('SELECT * FROM `student-project`.`user` WHERE email = ?', [email]);
//   return rows[0];
// };

// const createUserInDb = async (userInfo) => {
//   // 動態獲取當前年份和月份
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear() - 1911; // 將西元年轉為民國年
//   const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // 獲取月份並補齊兩位

//   // 獲取最新的 userno
//   const [result] = await pool.query('SELECT userno FROM `student-project`.`user` ORDER BY userno DESC LIMIT 1');
//   let newUserNo;
//   if (result.length > 0) {
//     const latestUserNo = result[0].userno;
//     const latestSequence = latestUserNo % 1000 + 1; // 提取最新的序號部分並加1
//     newUserNo = parseInt(`${currentYear}${currentMonth}${String(latestSequence).padStart(3, '0')}`);
//   } else {
//     newUserNo = `${currentYear}${currentMonth}001`;
//   }

//   await pool.query('INSERT INTO `student-project`.`user` (userno, username, avatar_url, email, permissions, state) VALUES (?, ?, ?, ?, ?, ?)', [
//     newUserNo, userInfo.name, userInfo.picture, userInfo.email, 0, '使用中'
//   ]);

//   return {
//     ...userInfo,
//     userno: newUserNo,
//     permissions: 0,
//     state: '使用中',
//   };
// };

// export default withSession(async (req, res) => {
//   const { code, name, email } = req.query;

//   try {
//     const { tokens } = await client.getToken(code);
//     client.setCredentials(tokens);

//     const userInfo = await client.request({
//       url: 'https://www.googleapis.com/oauth2/v3/userinfo'
//     });

//     const userEmail = userInfo.data.email;
//     if (!userEmail.endsWith('@ntub.edu.tw')) {
//       return res.status(403).send('Please log in with your school Google account');
//     }

//     let user = await getUserFromDb(userEmail);

//     if (!user) {
//       user = await createUserInDb(userInfo);
//     }

//     if (name && email) {
//       // 更新使用者名稱和電子郵件地址
//       await pool.query('UPDATE `student-project`.`user` SET username = ?, email = ? WHERE email = ?', [name, email, userEmail]);

//       // 獲取更新後的使用者信息
//       user = await getUserFromDb(email);
//     }

//     req.session.set('user', user);
//     await req.session.save();
//     res.redirect('/user/loginSuccess');
//   } catch (error) {
//     console.error('Error in authentication flow:', error); // 添加错误日志

//     res.status(400).send('Error fetching Google user info');
//   }
// });