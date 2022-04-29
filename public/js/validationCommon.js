function resetErrors(inputs, errorTexts) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("error-input");
  }
  for (let i = 0; i < errorTexts.length; i++) {
    errorTexts[i].innerText = "";
  }
}

function checkRequired(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  return value !== "";

}

function checkTextLengthRange(value, min, max) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const length = value.length;
  if (max && length > max) {
    return false;
  }
  if (min && length < min) {
    return false;
  }
  return true;
}

function checkNumber(value) {
  if (!value) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  return true;
}

function checkNumberRange(value, min, max) {
  if (!value) {
    return false;
  }
  if (isNaN(value)) {
    return false;
  }
  value = parseFloat(value);
  if (value < min) {
    return false;
  }
  return value <= max;

}

function checkDate(value) {
  if (!value) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
  if (!value) {
    return false;
  }
  if (!compareTo) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  if (!pattern.test(value)) {
    return false;
  }
  const valueDate = new Date(value);
  const compareToDate = new Date(compareTo);
  if (valueDate.getTime() <= compareToDate.getTime()) {
    return false;
  }
  return true;
}

function checkPesel(value) {
  return checkTextLengthRange(value, 11, 11) && checkNumber(value);
}

function checkPhoneNumber(value) {
  return checkTextLengthRange(value, 9, 9) && checkNumber(value);
}

function checkRegistration(value) {
  if (!value) {
    return false;
  }
  const pattern = /^[a-zA-Z0-9]+$/;
  const bool = pattern.test(value);
  return checkTextLengthRange(value, 3, 8) && bool;
}
