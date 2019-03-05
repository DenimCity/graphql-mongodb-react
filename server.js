const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require('mongoose');

const Event = require('./model/event');
const app = express();
app.use(bodyParser.json());


const schema = buildSchema(`
      type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
      }
      type RootQuery {
            events: [ Event! ]!
      }

      input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
      }

      type RootMutation {
            createEvent(eventInput: EventInput): Event
      }
      schema {
            query: RootQuery
            mutation: RootMutation
      }

`);

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
    rootValue: root,
    graphiql: true,
    pretty: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD }@cluster0-unydg.mongodb.net/${ process.env.MONGO_DB }?retryWrites=true`)
.then(()=> {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`You are now running on port ${PORT}`);
      });

})
.catch(err => {
      console.log(err);
})
