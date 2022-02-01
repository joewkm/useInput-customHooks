/*
 * react custom hooks using useReducer
 * 
 */

import { useReducer } from 'react';

const initialInputState = {
  value : '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {value:action.value, isTouched: state.isTouched};
  }
  if (action.type === 'BLUE') {
    return {value:state.value, isTouched: state.isTouched};
  }
  if (action.type === 'RESET') {
    return {value : '', isTouched: false};
  }
  return initialInputState;
};


const useInput2 = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)


  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    dispatch({
      type: 'INPUT',
      value: event.target.value
    });
  };

  const inputBlurHandler = (event) => {
    dispatch({
      type: 'BLUR'
    });
  };

  const reset = () => {
    dispatch({type:'RESET'});
  };

  return {
    value : inputState.value,
    isValid : valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };

};

export default useInput2;