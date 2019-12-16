/*
 * @Author: 祢豆
 * @ModuleName: 2019-12-09 21:32:14
 * @Date: 2019-12-09 21:32:14
 * @Last Modified by: 祢豆
 * @Last Modified time: 2019-12-13 16:27:14
 */
import Reflux from "reflux";
// 返回的action 改成 dispatch
// 改写 effect方法
// 改写reducer方法
// 改写request
const createStore = (...registerModels) => {
    let StateCache = {};
    let actionTypes = [];
    let actionsCache = {};
    let reducersCache = {};

    registerModels.forEach(model => {
        const { namespace, state, effects, reducers } = model;

        // actions
        Object.keys(effects || {}).forEach(key => {
            const keyPrefix = `on${namespace.replace(/^\S/, s => s.toUpperCase())}/${key}`;
            actionsCache = Object.assign(actionsCache, { [keyPrefix]: effects[key] });
        });

        // reducer
        Object.keys(reducers || {}).forEach(key => {
            const keyPrefix = `on${namespace.replace(/^\S/, s => s.toUpperCase())}/${key}`;
            reducersCache = Object.assign(reducersCache, {
                [keyPrefix]: reducers[key],
            });
        });

        // state
        StateCache = Object.assign(StateCache, state);

        // actionTypes
        const actionsTypesPrefix = Object.keys(effects || {}).map(key => `${namespace}/${key}`);
        actionTypes = actionTypes.concat(actionsTypesPrefix);
    });

    const listenActions = Reflux.createActions(actionTypes);
    class Store extends Reflux.Store {
        constructor() {
            super();
            this.state = StateCache;
            this.listenToMany(listenActions);
        }
    }
    Object.keys(Object.assign(actionsCache, reducersCache)).forEach(key => {
        Store.prototype[key] = actionsCache[key];
    });

    // prefix 前缀 检测 type dispatch namespace
    // export connect dipatch
    // effects 里 有 put select call
    // reducer 自动调用 setState
    return { Store, Actions: listenActions };
};

export default createStore;
