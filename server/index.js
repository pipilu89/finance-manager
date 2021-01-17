const express = require('express');
const cors = require('cors')
const monk = require('monk')
// const monk2 = require('monk')

const app = express()

const uri1 = 'mongodb+srv://admin22:260381@cluster0-hsvou.mongodb.net/posDev'
// const uri1 = 'mongodb+srv://admin22:260381@cluster0-hsvou.mongodb.net/meower'

const uri2 = 'mongodb+srv://admin22:260381@cluster0-hsvou.mongodb.net/meower?authSource = admin & replicaSet=Cluster0 - shard - 0 & readPreference=primary & appname=MongoDB % 20Compass % 20Community & ssl=true'

const db = monk(uri1);
const transactions = db.get('fmDev')
// const mews = db.get('mews')


app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//   console.log('get / test');
//   res.json({ message: 'mew!' })
// })

app.get('/transactions', (req, res) => {
  console.log('get /transactions recieved');
  transactions
    .find()
    .then(transactions => {
      res.json(transactions)
    })
  // res.json([{ name: 'pete' }])
})

function isValidMew(transaction) {
  return transaction.account && transaction.account.toString().trim() !== '' &&
    transaction.amount && transaction.amount.toString().trim() !== ''
}

app.post('/transactions', (req, res) => {
  console.log('post /transactions recieved');

  if (isValidMew(req.body)) {
    //insert into db
    const transaction = {
      date: req.body.date.toString(),
      account: req.body.account.toString(),
      amount: req.body.amount.toString(),
      category: req.body.category.toString(),
      subCategory: req.body.subCategory.toString(),
      amount: req.body.amount.toString(),
      notes: req.body.notes.toString(),
      created: new Date()
    }

    // console.log(mew);
    transactions
      .insert(transaction)
      .then(createdTransaction => {
        res.json(createdTransaction)
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


//electricity
const uri3 = 'mongodb+srv://admin22:260381@cluster0-hsvou.mongodb.net/test'
const db2 = monk(uri3);
const electricity = db2.get('people')

app.get('/electricity', (req, res) => {
  console.log('get /electricity recieved');
  electricity
    .find({}, { sort: { time: -1 }, limit: 10 })
    .then(electricity => {
      res.json(electricity)
    })
  // res.json([{ name: 'pete' }])
})