// ** Initial State
const initialState = {
  userToken: {},
  userData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        userData: action.data,
      };
    case 'LOGIN':
      return {
        ...state,
        userToken: action.data,
      };
    case 'REFRESH_TOKEN':
      return {
        ...state,
        userToken: action.data,
      };
    case 'LOGOUT':
      const obj = {...action};
      delete obj.type;
      return {...state, userToken: {}, userData: {}, ...obj};
    default:
      return state;
  }
};

export default authReducer;
