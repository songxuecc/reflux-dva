import Reflux from "reflux"
import { Actions } from "./index"
class Store extends Reflux.Store {
	constructor() {
		super()
		this.state = { flag: "OFFLINE" } // <- set store's default state much like in React
		this.listenToMany(Actions)
	}
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
