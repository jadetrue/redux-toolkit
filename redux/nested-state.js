const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Simpsons",
  address: {
    number: 742,
    street: "Evergreen Terrace",
    city: "Springfield",
    state: "Oregon",
  },
};

// define action type
const STREET_UPDATED = "STREET_UPDATED";

// define action creator
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// define reducer to handle action
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("Initial state ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated state ", store.getState());
});

store.dispatch(updateStreet("Not Evergreen Terrace"));
unsubscribe();
