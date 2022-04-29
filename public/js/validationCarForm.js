function validateForm() {
  const brandInput = document.getElementById("brand");
  const modelInput = document.getElementById("model");
  const registrationNumberInput = document.getElementById("registrationNumber");
  const numberOfSeatsInput = document.getElementById("numberOfSeats");

  const errorBrand = document.getElementById("errorBrand");
  const errorModel = document.getElementById("errorModel");
  const errorRegistrationNumber = document.getElementById(
    "errorRegistrationNumber"
  );
  const errorNumberOfSeats = document.getElementById("errorNumberOfSeats");
  const errorsSummary = document.getElementById('errorsSummary');

  resetErrors(
    [brandInput, modelInput, registrationNumberInput, numberOfSeatsInput],
    [errorBrand, errorModel, errorRegistrationNumber, errorNumberOfSeats, errorsSummary]
  );

  let valid = true;

  if (!checkRequired(brandInput.value)) {
    valid = false;
    brandInput.classList.add("error-input");
    errorBrand.innerText = "Field is required";
  } else if (!checkTextLengthRange(brandInput.value, 2, 60)) {
    valid = false;
    brandInput.classList.add("error-input");
    errorBrand.innerText = "Field should be between 2 and 60 symbols";
  }

  if (!checkRequired(modelInput.value)) {
    valid = false;
    modelInput.classList.add("error-input");
    errorModel.innerText = "Field is required";
  } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
    valid = false;
    modelInput.classList.add("error-input");
    errorModel.innerText = "Field should be between 2 and 60 symbols";
  }

  if (!checkRequired(registrationNumberInput.value)) {
    valid = false;
    registrationNumberInput.classList.add("error-input");
    errorRegistrationNumber.innerText = "Field is required";
  } else if (!checkRegistration(registrationNumberInput.value)) {
    valid = false;
    registrationNumberInput.classList.add("error-input");
    errorRegistrationNumber.innerText =
      "Field should be between 3 and 8 symbols";
  }

  if (!checkRequired(numberOfSeatsInput.value)) {
    valid = false;
    numberOfSeatsInput.classList.add("error-input");
    errorNumberOfSeats.innerText = "Field is required";
  } else if (
    !checkNumber(numberOfSeatsInput.value) ||
    !checkTextLengthRange(numberOfSeatsInput.value, 0, 2)
  ) {
    valid = false;
    numberOfSeatsInput.classList.add("error-input");
    errorNumberOfSeats.innerText = "Field should be a 1 or 2 digit number";
  }

  if (!valid) {
    errorsSummary.innerText = "Form has errors";
  }

  return valid;
}
