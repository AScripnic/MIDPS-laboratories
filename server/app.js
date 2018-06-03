let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let multer = require('multer');

let DBManager = require('./DBManager');
let ImageEditor = require('./ImageEditor');

let app = express();
let upload = multer({storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
  }
})});

app.use(express.static('../website'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/images', express.static('images'));

app.get('/api/board/:board', (req, res) => {
  res.send(dbManager.getBoardLastActiveThreads(req.params.board));
});

app.post('/api/thread', upload.single('thread_image'), (req, res) => {
  if (!req.file) {
    res.status(400).send({error: 'Please submit an image'});
  }

  ImageEditor.resize(req.file.path)
    .then((previewPath) => {
      dbManager.createThread(req.body, req.file, previewPath);

      res.send();
    }).catch((error) => {
      res.status(500).send({error: 'Internal error. Please try again later'});
    });
});

app.post('/api/post/', upload.fields([{name: 'post_image', maxCount: 1}]), (req, res) => {
  if (!req.files['post_image']) {
    return res.send(dbManager.createPost(req.body));
  }

  ImageEditor.resize(req.files['post_image'][0].path)
    .then((previewPath) => {
      dbManager.createPost(req.body, req.files['post_image'][0], previewPath);

      res.send();
    })
    .catch((error) => {
      res.status(500).send({error: 'Internal error. Please try again later'});
    });

});

app.get('/api/thread/:id', (req, res) => {
  res.send(dbManager.getPosts(req.params.id));
});

let dbManager = DBManager.dbStart(() => {
  app.listen(3000, () => {
    console.log('server have started on port 3000');
  });
});

