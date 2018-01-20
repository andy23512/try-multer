var opt = { port: 8315 }

var fs = require('fs')
var express = require('express')
var multer  = require('multer')

var upload = multer({ storage: multer.memoryStorage() })
var app = express()

app.post('/upload', upload.single('file_field'), (req, res) => {
  console.log(req.file) // file infomation you can get is in req.file
  console.log(req.file.buffer) // content in buffer format is at req.file.buffer
  console.log(req.file.buffer.toString('utf8')) // convert buffer to string so you can see the file content
  fs.appendFile('./uploaded_files.log', req.file.buffer, (err) => { // and feel free to do anything to req.file.buffer, such as append to a file
    if(err) throw err
    res.send('File upload success')
  })
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname + '/public/'})
})

app.listen(opt.port, () => {
  console.log('express server is running at port ' + opt.port)
})
