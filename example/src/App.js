import React from "react";
import Home from "./pages/home";
import Address from "./pages/address";
import AddressDva from "./pages/address-dva";
import HomeDva from "./pages/home-dva";
import { Store } from "./store";
import Reflux from "reflux";
import { Provider } from "./utils/reflux-redux-dva";

import refluxConnect from "./utils/reflux-connect";

import "./App.css";

class App extends Reflux.Component {
    constructor() {
        super();
        this.stores = [ Store ];
    }

    componentDidMount() {}
    render() {
        return (
            <div>
                <Provider store={{ a: "test-Provider-connect" }}>
                    <Home parentProps={'parentProps'}/>
                </Provider>
                <br />
                {/* <Address /> */}
                <br />
                <br />
                <br />
                <HomeDva />
                <br />
                <AddressDva />
            </div>
        );
    }
}

export default App;
