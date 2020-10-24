import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from 'components/Header';
import Home from 'pages/home';
import SearchResults from 'pages/search';

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-size: 14px;
        font-family: 'Open Sans';

        @media(min-width: 400px) {
            font-size: 16px;
        }
    }
`

const App = () => {
    return (
        <>
        <GlobalStyle />
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