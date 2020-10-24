import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

const Home = () => <div>Home</div>;
const SearchResults = () => <div>Search Results</div>

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchResults} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;