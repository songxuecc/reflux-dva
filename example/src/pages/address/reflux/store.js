import Reflux from "reflux"


import { AddressActions } from "./index"

class AddressStore extends Reflux.Store {
	constructor() {
		super()
		this.state = { flag: "OFFLINE" } // <- set store's default state much like in React
		// this.listenTo(AddressActions, this.onAddressActions) // listen to the statusUpdate action
		this.listenables = AddressActions;
	}

	onAddressActions(status) {
		var newFlag = status ? "ONLINE" : "OFFLINE"
		this.setState({ flag: newFlag })
	}


	onAddressActionsCompleted(response){
		console.log(response);
	}

	onAddressActionsFailed(response){
		console.log(response);
	}
	onLoadCompleted(data){
		console.log(data,'------delayComplete')
	}
	onLoadFailed(message)
	{
		// failed, with whatever message you sent
	}
}

export default AddressStore
