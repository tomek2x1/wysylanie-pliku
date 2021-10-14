const express = require('express');
const bodyParser = require('body-parser')
const unirest = require('unirest');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;
const path = require('path');


app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());

app.use(bodyParser.json());



app.post('/', (req, res) => {
  const filesName = [];
  let filesNumber = 0;

  if(req.files){
    const files = req.files.files;

    files.forEach((file, index) => {
      filesName.push(file.name);
      filesNumber++;
      const extensionName = file.name.substr(file.name.indexOf("."))
      file.mv('./uploads/uploads' + index + extensionName, function (err) {
        if(err){
          console.log(err);
        } else {
          console.log("File Upload");
        }
      })
    })
  }

  const apiKey = "Tq7v3NPApQaR5xlpo4f"
  var API_KEY = "YOUR_API_KEY";
  var FD_ENDPOINT = "newaccount1632792215290";
  
  var PATH = "/api/v2/tickets";
  var enocoding_method = "base64";
  var auth = "Basic " + new Buffer(apiKey + ":" + 'X').toString(enocoding_method);
  var URL =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH;
  
  var fields = {
    'email': 'email@yourdomain.com',
    'subject': 'Ticket subject',
    'description': 'Ticket description.',
    'status': 2,
    'priority': 1
  }
  
  var headers = {
    'Authorization': auth,
    'Content-Type': 'multipart/form-data',
  }

  const attachments = [];

  attachments.push(fs.createReadStream(__dirname + `/uploads/uploads0.txt`));
  attachments.push(fs.createReadStream(__dirname + `/uploads/uploads1.png`));



  unirest.post(URL)
    .headers(headers)
    .field(fields)
    .attach('attachments[]', fs.createReadStream(__dirname + `/uploads/uploads0.txt`))
    .attach('attachments[]', fs.createReadStream(__dirname + `/uploads/uploads0.txt`))
    .end(function(response){
      console.log("response.body", response.body)
      console.log("Response Status : " + response.status)
      if(response.status == 201){
        console.log("Location Header : "+ response.headers['location'])
      }
      else{
        console.log("X-Request-Id :" + response.headers['x-request-id']);
      }
    });













  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})