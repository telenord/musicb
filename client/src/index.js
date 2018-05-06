
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';


const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new HttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'same-origin' } ),
     cache: new InMemoryCache(),
    dataIdFromObject: o => o.id
});
//import configureStore from './store/store';

//const initialState = {};

//const store = configureStore(initialState);

const app = (
    //<Provider store={store}>
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
   // </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();