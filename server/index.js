const express = require('express');
const cors = require('cors')
const monk = require('monk')

const app = express()

const uri1 = 'mongodb+srv://admin22:260381@cluster0-hsvou.mongodb.net/meower'
const uri2 = 'mongodb+srv://admin22:260381@cluster0-hsvou.mongodb.net/meower?authSource = admin & replicaSet=Cluster0 - shard - 0 & readPreference=primary & appname=MongoDB % 20Compass % 20Community & ssl=true'

const db = monk(uri2);
const mews = db.get('mews')


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'mew!' })
})

app.get('/mews', (req, res) => {
  mews
    .find()
    .then(mews => {
      res.json(mews)
    })
})

function isValidMew(mew) {
  return mew.name && mew.name.toString().trim() !== '' &&
    mew.content && mew.content.toString().trim() !== ''
}

app.post('/mews', (req, res) => {
  if (isValidMew(req.body)) {
    //insert into db
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    }

    // console.log(mew);
    mews
      .insert(mew)
      .then(createdMew => {
        res.json(createdMew)
      });

  } else {
    res.status(422)
    res.json({
      message: 'hey! name and content are required'
    })
  }

})

app.listen(5000, () => {
  console.log('listening on port http://localhost:5000/');
})