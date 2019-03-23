import React from "react";
import axios from "axios";
// import ReactDOM from "react-dom";
import "./App.css";

import Header from "./components/header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// MODULES
    import Home from "./modules/home";
    import About from "./modules/about";

class App extends React.Component {

    constructor(props) {

        // console.log('en', process.env.REACT_APP_SECRET_NAME);

        super(props);

        // initialize our state 
        this.state = {
        };
    };

    render() {

        return (
            <div className="app-container">
                <Header />
                <Router>

                        <Route exact path="/" component={Home} />
                        // <Route path="/home" component={Home} />
                        <Route path="/about" component={About} />

                </Router>
            </div>
        );
    };
}

export default App;