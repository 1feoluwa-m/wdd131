const currentYear = document.querySelector("#currentyear");
const navigationMain = document.querySelector('nav');
const hambutton = document.querySelector('#hamburger-button')

hambutton.addEventListener('click', function(){
    navigationMain.classList.toggle('show');
    hambutton.classList.toggle('open');
});

const today = new Date()
currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified")
lastModified.textContent = `Last Modification: ${document.lastModified}`;



// Array stuff
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Manti Utah Temple",
    location: "Manti, Utah",
    dedicated: "1877, April, 25",
    area: 74792,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  },
  {
    templeName: "Curitiba Brazil Temple",
    location: "Curitiba, Brazil",
    dedicated: "2008, June, 1",
    area: 27850 ,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/curitiba-brazil-temple/curitiba-brazil-temple-1078-main.jpg"
  },
  {
    templeName: "Yorba Linda California Temple",
    location: "Yorba Linda, California",
    dedicated: "2022, June, 18",
    area: 30872,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yorba-linda-california-temple/yorba-linda-california-temple-70766-main.jpg"
  },
  {
    templeName: "Urdaneta Philippines Temple",
    location: "Urdaneta, Philippines",
    dedicated: "2019, January, 16",
    area: 32604,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45874-main.jpg"
  }
];

// Function to loop through the temples and display it

function createTempleCard(templeArrangement) {
  const cardContainer = document.querySelector("#temples");
  cardContainer.innerHTML = "";

  templeArrangement.forEach(temple => {
    const card = document.createElement("section");

    const name = document.createElement("h3");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    const dedication = document.createElement("p");
    dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<span class="label">Area:</span> ${temple.area} sq ft`;

    const img = document.createElement("img");
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", temple.templeName);
    img.setAttribute("loading", "lazy");

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedication);
    card.appendChild(area);
    card.appendChild(img);

    cardContainer.appendChild(card);
  });
}

createTempleCard(temples)



function getYear(temple){
  return parseInt(temple.dedicated.split(",")[0]);
}

document.querySelector("#old").addEventListener("click", () =>{
  createTempleCard(temples.filter(t => getYear(t) < 1900));
});

document.querySelector("#new").addEventListener("click", () =>{
  createTempleCard(temples.filter(t => getYear(t) > 2000));
});

document.querySelector("#large").addEventListener("click", () => {
  createTempleCard(temples.filter(t => t.area > 90000));
});

document.querySelector("#small").addEventListener("click", () => {
  createTempleCard(temples.filter(t => t.area < 10000));
});

document.querySelector("#home").addEventListener("click", () => {
  createTempleCard(temples);
});