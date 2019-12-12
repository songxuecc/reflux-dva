'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Reflux = _interopDefault(require('reflux'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

// 改写 effect方法
// 改写reducer方法
// 改写request

var createStore = function createStore() {
  var StateCache = {};
  var actionTypes = [];
  var actionsCache = {};
  var reducersCache = {};

  for (var _len = arguments.length, registerModels = new Array(_len), _key = 0; _key < _len; _key++) {
    registerModels[_key] = arguments[_key];
  }

  registerModels.forEach(function (model) {
    var namespace = model.namespace,
        state = model.state,
        effects = model.effects,
        reducers = model.reducers; // actions

    Object.keys(effects || {}).forEach(function (key) {
      var keyPrefix = "on".concat(namespace.replace(/^\S/, function (s) {
        return s.toUpperCase();
      }), "/").concat(key);
      actionsCache = Object.assign(actionsCache, _defineProperty({}, keyPrefix, effects[key]));
    }); // reducer

    Object.keys(reducers || {}).forEach(function (key) {
      var keyPrefix = "on".concat(namespace.replace(/^\S/, function (s) {
        return s.toUpperCase();
      }), "/").concat(key);
      reducersCache = Object.assign(reducersCache, _defineProperty({}, keyPrefix, reducers[key]));
    }); // state

    StateCache = Object.assign(StateCache, state); // actionTypes

    var actionsTypesPrefix = Object.keys(effects || {}).map(function (key) {
      return "".concat(namespace, "/").concat(key);
    });
    actionTypes = actionTypes.concat(actionsTypesPrefix);
  });
  var listenActions = Reflux.createActions(actionTypes);

  var Store =
  /*#__PURE__*/
  function (_Reflux$Store) {
    _inherits(Store, _Reflux$Store);

    function Store() {
      var _this;

      _classCallCheck(this, Store);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Store).call(this));
      _this.state = StateCache;

      _this.listenToMany(listenActions);

      return _this;
    }

    return Store;
  }(Reflux.Store);

  Object.keys(Object.assign(actionsCache, reducersCache)).forEach(function (key) {
    Store.prototype[key] = actionsCache[key];
  }); // prefix 前缀 检测 type dispatch namespace
  // export connect dipatch
  // effects 里 有 put select call
  // reducer 自动调用 setState

  return {
    Store: Store,
    Actions: listenActions
  };
};

exports.createStore = createStore;
