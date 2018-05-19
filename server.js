// const express = require('express');
// const cors = require('cors');
// const bodyParser  = require('body-parser');
// const {graphqlExpress, graphiqlExpress}  = require('apollo-server-express');
// //const graphiqlExpress  = require('apollo-server-express');
//
//
// const models = require('./models');
//
// const expressGraphQL = require('express-graphql');
// const mongoose = require('mongoose');
// //const bodyParser = require('body-parser');
// const schema = require('./schema/schema');
//
//
// const app = express();
//
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true // <-- REQUIRED backend setting
// };
// app.use(cors(corsOptions));
// // Replace with your mongoLab URI
// //const MONGO_URI = 'mongodb://telebot:telebot123@ds251179.mlab.com:51179/qlyrics';
//
// const MONGO_URI ='mongodb://localhost:27017/lyrics';
//
// if (!MONGO_URI) {
//     throw new Error('You must provide a MongoLab URI');
// }
//
// mongoose.Promise = global.Promise;
// mongoose.createConnection(MONGO_URI)
//     .then(()=>{
//         console.log('mongo connected');
//     })
//     .catch(err=>{
//         console.log('mongo connection error: ' + err);
//     });
//
//
// // app.use(express.json());
// // app.use('/graphql', expressGraphQL({
// //     schema,
// //     graphiql: true
// // }));
//
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
//
// const port = 4000;
//
// app.listen(port, ()=>{
//     console.log(
//         `GraphiQL is now running on http://localhost:${port}/graphiql`
//     );
// });
//
// module.exports = app;


import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import schema from './data/schema';
const env = require('dotenv').config();

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 4001;

const graphQLServer = express();

// const corsOptions = {
//     origin: 'http://localhost:3005',
//     credentials: true // <-- REQUIRED backend setting
// };

graphQLServer.use(cors());
graphQLServer.use(compression());

graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema,
        // This option turns on tracing
        //tracing: true
    })
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
    console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
);

// https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035?_ga=2.135700918.62640134.1525599074-942791465.1525599074
// https://github.com/SaraVieira/graphql-simple-server-tutorial/blob/master/index.js
// https://github.com/apollographql/GitHunt-API/blob/master/api/server.js