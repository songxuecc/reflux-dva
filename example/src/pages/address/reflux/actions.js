import Reflux from "reflux"
import {fetchAddress} from '../../../utils/server'
// var AddressActions = Reflux.createAction({
//     actionName: 'myActionName',
//     asyncResult:true,
//     sync:false,
//     children:['success']
// })



// preEmit
// var AddressActions = Reflux.createAction({
//     add: {
//         asyncResult: true
//     }
// })

// AddressActions.add.listen(function() {
//     fetchAddress
//         .then(this.completed)
//         .catch(this.failed)
// });

// export default AddressActions



var Actions = Reflux.createActions({
	'load': {children: ['completed', 'failed']}
});

Actions.load.listen( function() {
    fetchAddress()
        .then( this.completed )
        .catch( this.failed );
});

export default Actions
