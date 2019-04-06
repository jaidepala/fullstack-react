import React from "react";
// import axios from "axios";
// import ReactDOM from "react-dom";
import "./App.css";

import Header from "./components/header";

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
            </div>
        );
    };
}

export default App;