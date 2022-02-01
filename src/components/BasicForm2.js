/*
 * react forms validation using useReducer custom hooks 
 * 
 */

import useInput2 from './hooks/use-input2';

const validateEmail = (input) => {
  // eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
};

const isNotEmpty = value=> value.trim() !== '';
const isEmail = value => isNotEmpty && validateEmail(value);

const BasicForm = (props) => {

  const {
    value: enteredFirstName, 
    isValid:enteredFirstNameIsValid,
    hasError: firstnameHasError,
    valueChangeHandler : firstnameChangeHandler,
    inputBlurHandler : firstnameBlurHandler,
    reset: resetFirstName
  } = useInput2( isNotEmpty );

  const {
    value: enteredLastName, 
    isValid:enteredLastNameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler : lastnameChangeHandler,
    inputBlurHandler : lastnameBlurHandler,
    reset: resetLastName
  } = useInput2( isNotEmpty );

  const {
    value: enteredEmail, 
    isValid:enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler : emailInputChangeHandler,
    inputBlurHandler : emailInputBlurHandler,
    reset: resetEmail
  } = useInput2( isEmail );

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmmissionHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log('submitted');
    console.log(enteredFirstName, enteredLastName, enteredEmail );

    resetFirstName();
    resetLastName();
    resetEmail();

  };

  const firstnameClasses = firstnameHasError 
    ? 'form-control invalid' 
    : 'form-control';

  const lastnameClasses = lastnameHasError 
    ? 'form-control invalid' 
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid' 
    : 'form-control';


  return (
    <form onSubmit={formSubmmissionHandler}>
      <div className='control-group'>
        <div className={firstnameClasses}>
           <label htmlFor='name'><span className='required-text'>*</span> First Name</label>
          <input type='text' 
            id='name'
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
            value={enteredFirstName} />
            {firstnameHasError && <p className='error-text'>Please enter your First Name</p>}
        </div>
        <div className={lastnameClasses}>
          <label htmlFor='name'><span className='required-text'>*</span> Last Name</label>
          <input type='text'
           id='name'
           onChange={lastnameChangeHandler}
           onBlur={lastnameBlurHandler}
           value={enteredLastName} />
        {lastnameHasError && <p className='error-text'>Please enter your Last Name</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'><span className='required-text'>*</span> E-Mail Address</label>
        <input type='text' 
          id='name' 
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail} />
        {emailInputHasError && <p className='error-text'>Please enter a valid Email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
