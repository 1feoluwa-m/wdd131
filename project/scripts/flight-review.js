let revCount = Number(localStorage.getItem("rcounts")) || 0;
revCount++;

localStorage.setItem("rcounts", revCount);
document.querySelector("#rcounts").textContent = revCount;

const currentYear = document.querySelector("#currentyear");
const today = new Date()
currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified")
lastModified.textContent = `Last Modification: ${document.lastModified}`;