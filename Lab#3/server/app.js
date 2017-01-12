let express = require('express');
let path = require('path');

let app = express();

app.use(express.static('../website'));

app.listen(3000, () => {
  console.log('server have started on port 3000');
});

