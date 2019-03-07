require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require('mongoose');
const schema = require('./schema');
const cors = require('cors');





const app = express();
// allow cross-origin request
app.use(cors());


//mLab Connection to MongoDb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const connection = mongoose.connection;
connection.on('connected', ( ) => {
  console.log('Mongoose Connected Successfully');
})

connection.on('error', (error ) => {
  console.log(`Mongoose Connection interrupted becasue of ${ error }`)
})

app.use(bodyParser.json());


const root = {
  events: () => {
    return events;
  },
  createEvent: args => {
       const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date)
       })
       return event.save().then(result => {
              console.log(result)
              return {...result._doc}
        }).catch(error => {
              console.log(error)
              throw err;
        })
    return event;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
//     rootValue: root,
    graphiql: true,
    pretty: true
  })
);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`You are now running on port ${PORT}`);
});