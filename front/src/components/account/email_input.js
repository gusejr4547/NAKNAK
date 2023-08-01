import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const isValidEmailFormat = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  let hasError = (!valueIsValid && isTouched) || (isTouched && (!isValidEmailFormat(enteredValue) || enteredValue.trim() === ''));

  if (hasError && (!valueIsValid && isTouched)) {
    hasError = '필수 입력값입니다';
  } else if (hasError && (!isValidEmailFormat(enteredValue) || enteredValue.trim() === '')) {
    hasError = '이메일 형식 오류입니다';
  }

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    $value: enteredValue,
    $isValid: valueIsValid,
    $hasError: hasError,
    $valueChangeHandler: valueChangeHandler,
    $inputBlurHandler: inputBlurHandler,
    $reset: reset,
  };
};

export default useInput;
