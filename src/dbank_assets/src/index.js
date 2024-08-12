import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  const currentAmount = await dbank.checkbalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
});

document.querySelector("form").addEventListener("submit", async function (evt) {
  evt.preventDefault();

  const button = evt.target.querySelector("#submit-btn");
  const topUpAmount = parseFloat(document.getElementById("input-amount").value);
  const withDrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.disabled = true;
  button.style.opacity = 0.5; // Visual feedback that button is disabled
  button.style.cursor = "not-allowed"; // Cursor feedback

  if (!isNaN(topUpAmount) && topUpAmount > 0) {
    debugger;
    await dbank.topUp(topUpAmount);
  }

  if (!isNaN(withDrawAmount) && withDrawAmount > 0) {
    await dbank.withdrawl(withDrawAmount);
  }

  const currentAmount = await dbank.checkbalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

  evt.target.querySelector("#input-amount").value = "";
  evt.target.querySelector("#withdrawal-amount").value = "";

  button.disabled = false;
  button.style.opacity = 1; // Reset button to active state
  button.style.cursor = "pointer"; // Reset cursor
});
