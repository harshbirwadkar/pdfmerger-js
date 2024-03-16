// const express = require('express')
// const app = express()
// const port = 3000
// const path = require('path')

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname , "templates/index.html"))
//   // res.send('GET request to the home')
// })

// // app.get('/', function (req, res) {
// //   const options = {
// //     // root: path.join(__dirname),
// //     root: path.join(__dirname, 'templates'),
// //   };

// //   const fileName = 'index.html';
// //   res.sendFile(fileName, options, function (err) {
// //     if (err) {
// //       console.error('Error sending file:', err);
// //     } else {
// //       console.log('Sent:', fileName);
// //     }
// //   });
// // });





// // POST method route
// app.post('/', (req, res) => {
//   res.send('POST request to the homepage')
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })



// server.js

const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
import {mergePdfs} from './merge.js';

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
