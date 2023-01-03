const redux = require("redux");
const createStore = redux.createStore;

const CAKE_ORDERED = "CAKE_ORDERED";

// An action creator is an function that returns and object
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
};

const initialState = {
  numOfCakes: 10,
};

// Pure function that accepts state and action as arguments, returning new state
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

// Creating our redux store:
// The reducer function controls how the state changes
const store = createStore(reducer);
// Log to the console the initial state
console.log(`Initial state`, store.getState());

// Listener for updating the state
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);

// Reducer will return based on the stock that's changed in the listener
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();
