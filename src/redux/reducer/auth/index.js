// ** Initial State
const initialState = {
  userdata: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return state;
    case 'LOGIN':
      return {
        ...state,
        userdata: action.data,
      };
    case 'LOGOUT':
      const obj = {...action};
      delete obj.type;
      return {...state, userdata: {}, ...obj};
    default:
      return state;
  }
};

export default authReducer;
