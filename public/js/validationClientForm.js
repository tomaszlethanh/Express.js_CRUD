function validateForm() {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const peselInput = document.getElementById("pesel");
  const phoneNumberInput = document.getElementById("phoneNumber");

  const errorFirstName = document.getElementById("errorFirstName");
  const errorLastName = document.getElementById("errorLastName");
  const errorPesel = document.getElementById("errorPesel");
  const errorPhoneNumber = document.getElementById("errorPhoneNumber");
  const errorsSummary = document.getElementById('errorsSummary');

  resetErrors(
      [firstNameInput, lastNameInput, peselInput, phoneNumberInput],
      [errorFirstName, errorLastName, errorPesel, errorPhoneNumber]
  );

  let valid = true;

  if (!checkRequired(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Field is required";
  } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Field should be between 2 and 60 symbols";
  }

  if (!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Field is required";
  } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Field should be between 2 and 60 symbols";
  }

  if (!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Field is required";
  } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Field should be between 2 and 60 symbols";
  }

  if (!checkRequired(peselInput.value)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = "Field is required";
  } else if (!checkPesel(peselInput.value)) {
    valid = false;
    peselInput.classList.add("error-input");
    errorPesel.innerText = "Field should be 11 digits";
  }

  if (!checkRequired(phoneNumberInput.value)) {
    valid = false;
    phoneNumberInput.classList.add("error-input");
    errorPhoneNumber.innerText = "Field is required";
  } else if (!checkPhoneNumber(phoneNumberInput.value)) {
    valid = false;
    phoneNumberInput.classList.add("error-input");
    errorPhoneNumber.innerText = "Wrong phone number";
  }

  if (!valid) {
    errorsSummary.innerText = "Form has errors";
  }

  return valid;
}
