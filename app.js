const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();

const app = express();

const api_key = process.env.API_KEY;
const id_key = process.env.ID_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  let firstname = req.body.fname;
  let lastname = req.body.lname;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: `https://us14.api.mailchimp.com/3.0/lists/${id_key}`,
    method: 'POST',
    headers: {
      Authorization: `terieyenike ${api_key}`
    },
    body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + '/failure.html');
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
      } else {
        res.sendFile(__dirname + '/failure.html');
      }
    }
  });
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 4000, () => {
  console.log('server is running on port 4000');
});
