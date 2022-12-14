const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '/dist/video-recorder-webapp')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/video-recorder-webapp/index.html'));
});

app.listen(process.env.PORT || 4200, () => {
  console.log('Connected to Port'); //Listening on port 8888
});
