const express = require('express')
const bodyParser = require('body-parser')



const app = express();
app.use(bodyParser.json())

const jean = 'Jean'
app.get('/', (req,res, next) => {
      res.send(jean)
})

const PORT = process.env.PORT || 3000
app.listen( PORT, ()=> {
      console.log(`You are now running on port ${ PORT }`);
})