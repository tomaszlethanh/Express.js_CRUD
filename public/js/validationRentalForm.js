function validateForm() {
  const clientInput = document.getElementById("client");
  const carInput = document.getElementById("car");
  const dateFromInput = document.getElementById("dateFrom");
  const dateToInput = document.getElementById("dateTo");

  const errorClient = document.getElementById("errorClient");
  const errorCar = document.getElementById("errorCar");
  const errorDateFrom = document.getElementById("errorDateFrom");
  const errorDateTo = document.getElementById("errorDateTo");
  const errorsSummary = document.getElementById('errorsSummary');

  resetErrors(
    [clientInput, carInput, dateFromInput, dateToInput],
    [errorClient, errorCar, errorDateFrom, errorDateTo]
  );

  let valid = true;

  if (!checkRequired(clientInput.value)) {
    valid = false;
    clientInput.classList.add("error-input");
    errorClient.innerText = "Select an option";
  }

  if (!checkRequired(carInput.value)) {
    valid = false;
    carInput.classList.add("error-input");
    errorCar.innerText = "Select an option";
  }

  let nowDate = new Date(),
    month = "" + (nowDate.getMonth() + 1),
    day = "" + nowDate.getDate(),
    year = nowDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  const nowString = [year, month, day].join("-");

  if (!checkRequired(dateFromInput.value)) {
    valid = false;
    dateFromInput.classList.add("error-input");
    errorDateFrom.innerText = "Select an option";
  } else if (!checkDate(dateFromInput.value)) {
    valid = false;
    dateFromInput.classList.add("error-input");
    errorDateFrom.innerText = "Field must be a date";
  } else if (checkDateIfAfter(dateFromInput.value, dateToInput.value)) {
    valid = false;
    dateToInput.classList.add("error-input");
    errorDateTo.innerText = "Date to can't be earlier than date from";
  }

  //else if (checkDateIfAfter(dateFromInput.value, nowString)) {
  //   valid = false;
  //   dateFromInput.classList.add("error-input");
  //   errorDateFrom.innerText = "Date can't be from the future";
  // }

  if (!valid) {
    errorsSummary.innerText = "Form has errors";
  }

  return valid;
}
