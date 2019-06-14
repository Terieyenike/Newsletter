const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
  let firstname = req.body.fname
  let lastname = req.body.lname
  let email = req.body.email

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
  }

  let jsonData = JSON.stringify(data)

  let options = {
    url: 'https://us14.api.mailchimp.com/3.0/lists/fe15ba7a95',
    method: 'POST',
    headers: {
      Authorization: 'terieyenike 9d0946114ee817cb2f779e64b6cefe93-us14'
    },
    body: jsonData
  }

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + '/failure.html')
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html')
      } else {
        res.sendFile(__dirname + '/failure.html')
      }
    }
  })
})

app.post('/failure', (req, res) => {
  res.redirect('/')
})

app.listen(process.env.PORT || 4000, () => {
  console.log('server is running on port 4000')
})

// 9d0946114ee817cb2f779e64b6cefe93-us14

// Unique id
// fe15ba7a95
