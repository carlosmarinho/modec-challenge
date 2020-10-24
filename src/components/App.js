import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from 'components/Header';
import Home from 'pages/home';
import SearchResults from 'pages/search';

const App = () => {
    return (
        <>
        <Header />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchResults} />
            </Switch>
        </BrowserRouter>
        </>
    )
}

export default App;