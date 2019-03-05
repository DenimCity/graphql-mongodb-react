const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
app.use(bodyParser.json());

// const jean = 'Jean'

const schema = buildSchema(`
      type RootQuery {
            events: [ String! ]
      }

      type RootMutation {
            createEvent(name: String): String
      }
      schema {
            query: RootQuery
            mutation: RootMutation
      }

`);

const root = {
  events: () => {
    return ["Cooking", "Sailing", "flippers"];
  },
  createEvent: args => {
    const eventName = args.name;
    return eventName;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`You are now running on port ${PORT}`);
});
