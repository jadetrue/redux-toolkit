const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combinedReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// An action creator is an function that returns and object with action
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const restockCake = (quantity = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
  };
};

const orderIceCream = (quantity = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: quantity,
  };
};

const restockIceCream = (quantity = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: quantity,
  };
};

const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};

// Pure function that accepts state and action as arguments, returning new state
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED: {
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    }
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED: {
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    }
    default:
      return state;
  }
};

const routeReducer = combinedReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// Creating our redux store:
// The reducer function controls how the state changes
const store = createStore(routeReducer);
// Log to the console the initial state
console.log(`Initial state`, store.getState());

// Listener for updating the state
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);

// Reducer will return based on the stock that's changed in the listener
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

unsubscribe();
