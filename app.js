const express = require("express");
const bodyParser = require("body-parser");
const {graphqlHTTP} = require("express-graphql");
const { buildSchema } = require("graphql");


const events = []


const app = express();
app.use(bodyParser.json());

app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`

        type Event{
        
        _id:ID!,
        title : String!,
        description : String!,
        price:Float!,
        date : String!
        
        }


        input EventInput{
        title : String!
        description : String!
        price:Float!
        date : String!
        }



        type RootQuery{
            events: [Event!]
        }
        
        type RootMutation {
            createEvent(event : EventInput) : Event!
        }
        
        schema{
                query:RootQuery
                mutation:RootMutation 
            }
        `),
    rootValue: {
        events:()=>{
            return events;
        },
        createEvent:(args)=>{
          const  _id = Math.random().toString();
          const argsEvent = args.event;
          const { title, description, price = +args.price, date = args.date } = argsEvent;

          const event = {
            _id,
            title,
            description,
            price,
            date,
          };
          console.log(event,'this is event');
          
          events.push(event);
          return event
        }
    },
    graphiql:true
  })
);

app.listen(3000, () => {
  console.log("server runing on port 3000");
});
