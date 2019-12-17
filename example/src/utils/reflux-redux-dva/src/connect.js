import React, { useMemo, Fragment, useContext } from "react";
import hoistStatics from "hoist-non-react-statics";

import propTypes from "prop-types";
import invariant from "invariant";
import ReactReduxContext from "../components/Context";
import isPlainObject from "../utils/isPlainObject";
import shallowEqual from "../utils/shallowEqual";
/**
 * options 
 * 
 * pure 
 * withRef
 * forwardRef
 * getDisplayName
 */
const defaultMapStateToProps = state => state || {};
const defaultMapActionsToProps = dispatch => ({});
const defaultMergeProps = (stateProps, actionsProps, parentProps) => ({
    ...parentProps,
    ...stateProps,
    ...actionsProps,
});
const wrapActionCreators = actionsMap => dispatch => actionsMap;
const wrapStateCreators = stateMap => state => stateMap;

export default function connect(mapStateToProps, mapActionsToProps, mergeProps, options = {}) {
    const finalMapStateToProps =
        (isPlainObject(mapStateToProps) ? wrapStateCreators(mapStateToProps) : mapStateToProps) ||
        defaultMapStateToProps;

    console.log(finalMapStateToProps, "finalMapStateToProps");

    const finalMapActionsToProps =
        (isPlainObject(mapActionsToProps)
            ? wrapActionCreators(mapActionsToProps)
            : mapActionsToProps) || defaultMapActionsToProps;
    const finalMergeProps = mergeProps || defaultMergeProps;
    const {
        pure = true,
        withRef = false,
        forwardRef = false,
        context = ReactReduxContext,
        getDisplayName = name => `Connect(${name})`,
        ...connectOptions
    } = options;
    const Context = context;

    invariant(
        !withRef,
        "[ connect ] withRef is removed. To access the wrapped instance, use a ref on the connected component"
    );

    function getStateProps(state) {
        const stateProps = finalMapStateToProps(state);

        invariant(
            isPlainObject(stateProps),
            "[ connect ] `mapStateToProps` must return an object. Instead received %s.",
            stateProps
        );

        return stateProps;
    }

    function getActionsProps(dispatch) {
        const actionsProps = finalMapActionsToProps(dispatch);
        invariant(
            isPlainObject(actionsProps),
            "[ connect ] `mapStateToProps` must return an object. Instead received %s.",
            actionsProps
        );
        return actionsProps;
    }

    function getNextState(stateProps, actionsProps, parentProps) {
        const mergedProps = finalMergeProps(stateProps, actionsProps, parentProps);
        invariant(
            isPlainObject(mergedProps),
            "[ connect ] `mergeProps` must return an object. Instead received %s.",
            mergedProps
        );
        return mergedProps;
    }

    return function wrapWithConnect(WrappedComponent) {
        const wrappedComponentName =
            WrappedComponent.displayName || WrappedComponent.name || "Component";
        const displayName = getDisplayName(wrappedComponentName);

        const ExtendsIsPureComponent = pure ? React.PureComponent : React.Component;
        class ConnectCom extends ExtendsIsPureComponent {

            constructor(props) {
                super(props);
            }

            componentWillMount() {
                this.stateProps = getStateProps(this.props.store);
                this.actionsProps = getActionsProps(this.props.store.dispatch);
                const {store,...parentProps} = this.props;
                this.updateState(parentProps);
            }
            // shouldComponentUpdate(nextProps, nextState) {
            //     if (!pure) {
            //         this.updateStateProps(nextState, nextProps);
            //         // this.updateActionsProps(nextState, nextProps);
            //         this.updateState(nextProps);
            //         return true;
            //     }
            // }
            updateStateProps(state) {
                const nextStateProps = getActionsProps(state);
                if (shallowEqual(nextStateProps, this.stateProps)) {
                    return false;
                }
                this.stateProps = nextStateProps;
                return true;
            }
            updateActionsProps(state) {
                const nextStateProps = getStateProps(state);
                if (shallowEqual(nextStateProps, this.stateProps)) {
                    return false;
                }
                return true;
            }
            updateState(props) {
                this.nextState = this.getNextState(props);
            }
            getNextState(props) {
                return getNextState(this.stateProps, this.actionsProps, props);
            }
            render() {
                return <WrappedComponent {...this.nextState} />;
            }
        }

        function ConnectFunction(props) {
            // TODO oprtions withRef forwardRef
            // TODO subscription
            const contextValue = useContext(Context);
            return <ConnectCom store={contextValue.store} {...props}/>;
        }

        const Connect = pure ? React.memo(ConnectFunction) : ConnectFunction;
        Connect.WrappedComponent = WrappedComponent;
        Connect.displayName = displayName;
        return hoistStatics(Connect, WrappedComponent);
    };
}
