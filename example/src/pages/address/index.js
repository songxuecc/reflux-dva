import React from "react"
import Reflux from "reflux"
import { AddressActions, AddressStore } from "./reflux"
import Mock from "mockjs"
import axios from 'axios';

const list = Mock.mock({
	"data|20": [
	  {
		title: "@title",
		date: "@date(yyyy-MM-d HH:mm)",
		count: "@integer(0, 100)",
		isIncrease: "@boolean",
		id: "@id",
	  },
	],
  }).data
  
  
Mock.mock("api/mock", list)



class MyComponent extends Reflux.Component {
	constructor() {
		super()
		this.state = { type: "admin" } // our store will add its own state to the component's
		this.stores = [ AddressStore ] // <- just assign the store class itself
		this.storeKeys = [ "flag" ]
	}

	componentDidMount(){
		AddressActions.load.listen(this.myCallbackFunc)
	}

	componentWillUnmount(){
		var unsubscribe = AddressActions.load.listen(this.myCallbackFunc);
		unsubscribe();
	}

	myCallbackFunc = () =>{
		console.log("myCallbackFunc")
	}
	handleClick = async () => {
		const a = await axios.get(`api/mock`)
		console.log(a,'jjhg')
		// fetchData()

		// AddressActions.load()
		// statusUpdate.statusUpdate(true)
		// anotherUpdate.anotherUpdate(true)
	}

	render() {
		var flag = this.state.flag // <- flag is mixed in from the StatusStore
		var info = this.state.info
		var type = this.state.type
		return (
			<div onClick={this.handleClick}>
				<p>-----Address-----</p>
				User is {flag} , info: {info}, type: {type}
			</div>
		)
	}
}

export default MyComponent
