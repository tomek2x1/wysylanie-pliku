const express = require('express');
const bodyParser = require('body-parser')
const unirest = require('unirest');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;



app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());

app.use(bodyParser.json());



app.post('/', (req, res) => {
  // console.log(req.files)
  let formData = req.files;
  console.log('form data', formData);

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
  }
  
  // unirest.post(URL)
  //   .headers(headers)
  //   .field(fields)
  //   // .attach('attachments[]', fs.createReadStream('/path/to/file1.ext'))
  //   // .attach('attachments[]', fs.createReadStream('/path/to/file2.ext'))
  //   .end(function(response){
  //     console.log(response.body)
  //     console.log("Response Status : " + response.status)
  //     if(response.status == 201){
  //       console.log("Location Header : "+ response.headers['location'])
  //     }
  //     else{
  //       console.log("X-Request-Id :" + response.headers['x-request-id']);
  //     }
  //   });













  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})