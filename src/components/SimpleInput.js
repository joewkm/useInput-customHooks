import useInput from './hooks/use-input';

const SimpleInput = (props) => {

  const validateEmail = (input) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
  };

  const {
    value: enteredName, 
    isValid:enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler : nameInputChangeHandler,
    inputBlurHandler : nameInputBlurHandler,
    reset: resetNameInput
  } = useInput( value => value.trim() !== '');

  const {
    value: enteredEmail, 
    isValid:enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler : emailInputChangeHandler,
    inputBlurHandler : emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput( value => value.trim() !== '' && validateEmail(value) );


  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetNameInput();
    resetEmailInput();

  };

  const nameInputClasses = nameInputHasError 
    ? 'form-control invalid' 
    : 'form-control';

    const emailInputClasses = emailInputHasError
    ? 'form-control invalid' 
    : 'form-control';

  return (
    <form onSubmit={formSubmmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}/>
          {nameInputHasError && <p className='error-text'>Name must not be blank</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='email' 
          id='email' 
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}/>
          {emailInputHasError && <p className='error-text'>Email must not be blank</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
