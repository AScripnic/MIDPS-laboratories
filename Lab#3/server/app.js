let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let upload = require('multer')({dest: 'images/'});

let DBManager = require('./DBManager');

let app = express();

app.use(express.static('../website'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/board/:board', (req, res) => {
  res.send('Hello Darkness')
});

app.post('/api/thread', upload.single('thread_image'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send('asd')
});

DBManager.dbStart(() => {
  app.listen(3000, () => {
    console.log('server have started on port 3000');
  });
});

