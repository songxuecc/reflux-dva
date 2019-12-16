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

1. combineReducers
2. dispatch 
3. applyMiddleware  
4. createEffects