import React, {Component} from 'react';
import AppCss from './App.scss';
import Movies from './Movies';
import Movie from './Movie';
import Search from './Search';


import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


const Child = ({match}) => (
    <Movie id={match.params.id}/>
)

const Popular = () => (
    <div className="container">
        <div className="app">
            <div className="app__header">
                <h1>Popular Movies</h1>
            </div>
        </div>
        <Movies/>
    </div>
)

const TopRated = () => (
    <div className="container">
        <div className="app">
            <div className="app__header">
                <h1>Top Rated Movies</h1>
            </div>
        </div>
        <Movies type="top_rated"/>
    </div>
)
const Recommended = () => (
    <div className="container">
        <div className="app">
            <div className="app__header">
                <h1>Recommend for you</h1>
            </div>
        </div>
        <Movies type="recommend"/>
    </div>
)

const NewRelease = () => (
    <div className="container">
        <div className="app">
            <div className="app__header">
                <h1>New Release</h1>
            </div>
        </div>
        <Movies type="now_playing"/>
    </div>
)

class App extends Component {

    tryParseJSON(jsonString) {
        try {
            var o = JSON.parse(jsonString);

            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object",
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return o;
            }
        } catch (e) {
        }

        return false;
    };

    render() {

        var account = null;
        var account = this.tryParseJSON(localStorage.getItem('account'));

        console.log(account);

        return (
            <Router>
                <div className="router-container">
                    <Link className="top-bar-brand" to="/">Elastic Movies</Link>
                    <nav className="top-bar">
                        <Search/>
                        <a className="log-button">Login</a>
                        <a className="log-button">Register</a>
                    </nav>
                    <aside className="aside">
                        <ul className="aside__nav">
                            <li><Link className="aside__nav__item aside__nav__item--popular" to="/">Popular</Link></li>
                            <li><Link className="aside__nav__item aside__nav__item--top-rated" to="/top-rated">Top
                                rated</Link></li>
                            <li><Link className="aside__nav__item aside__nav__item--new-release" to="/new-release">New
                                release</Link></li>
                            <li><Link className="aside__nav__item aside__nav__item--recommend" to="/recommend">Recommended</Link></li>
                        </ul>
                    </aside>
                    <Route exact path="/" component={Popular}/>
                    <Route path="/top-rated" component={TopRated}/>
                    <Route path="/new-release" component={NewRelease}/>
                    <Route path="/recommend" component={Recommended}/>
                    <Route path="/movies/:id" component={Child}/>
                </div>
            </Router>
        );
    }
}


export default App;
