"use strict";

console.log("Duck, duck, goose.");

// Get  HTML elements/images:
const resultsButton = document.getElementById("resultsButton");
const image1 = document.getElementById("productImage1");
const image2 = document.getElementById("productImage2");
const image3 = document.getElementById("productImage3");

let clicks = 0;
const maxClicksAllowed = 5;

let allProducts = [];

function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);
}

// Constructor (product)
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

// Render products/images
function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  // Don't let products repeat
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  }

  // Source & alt attribtes:
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;
}

// Handle product click event
function handleProductClick(event) {
  if (event.target === productContainer) {
    alert("Click One!");
  } else {
    clicks++;
    let clickedProduct = event.target.alt;
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productContainer.removeEventListener("click", handleProductClick);
      productContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderResults);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

// Render the results on the page
function renderResults() {
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

// Define the product names and image sources
const productNames = [
  "Product 1",
  "Product 2",
  "Product 3",
  "Product 4",
  "Product 5",
  "Product 6",
  "Product 7",
  "Product 8",
  "Product 9",
  "Product 10",
  "Product 11",
  "Product 12",
  "Product 13",
  "Product 14",
  "Product 15",
  "Product 16",
  "Product 17",
  "Product 18",
  "Product 19"
];

const imageSources = [
  "Assets/bag.jpg",
  "Assets/banana.jpg",
  "Assets/bathroom.jpg",
  "Assets/boots.jpg",
  "Assets/breakfast.jpg",
  "Assets/bubblegum.jpg",
  "Assets/chair.jpg",
  "Assets/cthulhu.jpg",
  "Assets/dog-duck.jpg",
  "Assets/dragon.jpg",
  "Assets/pen.jpg",
  "Assets/pet-sweep.jpg",
  "Assets/scissors.jpg",
  "Assets/shark.jpg",
  "Assets/sweep.png",
  "Assets/tauntaun.jpg",
  "Assets/unicorn.jpg",
  "Assets/water-can.jpg",
  "Assets/wine-glass.jpg",
];

// Create Product instances using the product names and image sources
for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], imageSources[i]);
}

// Render the initial set of products
renderProducts();

// Get a reference to the product container
const productContainer = document.querySelector("section");

// Add a click event listener to the product container
productContainer.addEventListener("click", handleProductClick);
