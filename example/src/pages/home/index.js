import React from "react";
import Reflux from "reflux";
import { HomeStore, Actions } from "./reflux";
import { connect } from "../../utils/reflux-redux-dva";

class MyComponent extends Reflux.Component {
    constructor() {
        super();
        this.state = { type: "admin" }; // our store will add its own state to the component's
        this.stores = [ HomeStore ]; // <- just assign the store class itself
        this.storeKeys = [ "flag" ];
    }

    handleClick = () => {
        Actions.action1("action1");
        // HomeActions()
        // HomeActions2()
    };

    render() {
        var flag = this.state.flag;
        var info = this.state.info;
        var type = this.state.type;

        console.log(this.props, "---pppppp");
        return (
            <div onClick={this.handleClick}>
                <p>-----home-----</p>
                User is {flag} , info: {info}, type: {type}
            </div>
        );
    }
}

export default connect(
    state => {
        console.log(state, "coonnect-state");
        return {
            a: state.a,
        };
    },
    () => ({}),
    null,
    {
        pure: true,
    }
)(MyComponent);
