const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];



const selectProduct =  document.querySelector("#productName");

products.forEach(product => {
    const options = document.createElement("option");
    options.value = product.id;
    options.textContent = product.name;
    selectProduct.appendChild(options)
});

const currentYear = document.querySelector("#currentyear");
const today = new Date()
currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified")
lastModified.textContent = `Last Modification: ${document.lastModified}`;