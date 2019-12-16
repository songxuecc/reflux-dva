import Reflux from "reflux"


import { HomeActions,HomeActions2,Actions } from "./index"
import {fetchAddress} from '../../../utils/server'
class Store extends Reflux.Store {
	constructor() {
		super()
		this.state = { flag: "OFFLINE" } // <- set store's default state much like in React
		this.listenToMany(Actions)
		// this.listenTo(HomeActions, this.onHomeActions) // listen to the statusUpdate action
		// this.listenTo(Actions.action2, this.onActions2) // listen to the statusUpdate action
	}
	// onHomeActions(payload) {
	// 	fetchAddress().then(data=>{
	// 		console.log(data,'jkjhkhj')
	// 	})
	// 	console.log('onHomeActions')
	// 	var newFlag = payload ? "ONLINE" : "OFFLINE"
	// 	this.setState({ flag: newFlag })
	// }

	// onHomeActions2(payload) {
	// 	fetchAddress().then(data=>{
	// 		console.log(data,'jkjhkhj2')
	// 	})
	// 	console.log('onHomeActions2')
	// 	var newFlag = payload ? "ONLINE" : "OFFLINE"
	// 	this.setState({ flag: newFlag })
	// }


	onAction1(payload) {
		
		console.log('onAction1')
		var newFlag = payload ? "ONLINE" : "OFFLINE"
		this.setState({ flag: newFlag })
	}

	onAction2(payload) {
		
		console.log('onAction2')
		var newFlag = payload ? "ONLINE" : "OFFLINE"
		this.setState({ flag: newFlag })
	}
}

export default Store
