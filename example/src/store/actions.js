import Reflux from "reflux";

var Actions = Reflux.createActions(['action1', 'action2']);
var HomeActions2 = Reflux.createAction();
var HomeActions = Reflux.createAction();

// var Actions = Reflux.createActions({
//     HomeActions:Reflux.createAction(),
// 	HomeActions2:Reflux.createAction(),

// });

export default HomeActions;

export { HomeActions2, Actions };
