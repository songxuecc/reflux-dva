app {
     _models: array,
    _store: object,
    _plugin: array,
    use: func,
    model:array,
    start:func,
}




app._store = createStore({
      reducers: createReducer(),
      initialState: hooksAndOpts.initialState || {},
      plugin,
      createOpts,
      sagaMiddleware,
      promiseMiddleware,
    })

    // 
app.start 
1. 创建 Middleware : [sagaMiddleware,promiseMiddleware]
2. Middleware 柯理化



    reducers :{
        namspace :reducers
    },
    actions :{
        namspace:actions
    }
    state : {
        namspace:state
    }
    
    create

### func 
 
3. applyMiddleware  
 



### redux

1. utils
a. isPlainObject
b.

2. combineReducers  Array<reducer>

3. createEffects  <T>(effect) : Promise<T> 

3. createStore 

return 
a. dispatch
b. 


4. createEffects