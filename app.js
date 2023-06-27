"use strict";

console.log("Duck, duck, goose.");

// Get HTML elements/images:
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

  // Source & alt attributes:
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

// Render (text) results on the page
function renderResults() {
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }

  // Get a reference to the canvas element
  const canvas = document.getElementById("chart");

  // Create the bar chart using Chart.js
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: allProducts.map((product) => product.name), // Array of product names
      datasets: [
        {
          label: "Votes",
          data: allProducts.map((product) => product.clicks), // Array of vote totals
          backgroundColor: "rgba(75, 192, 192, 0.8)", // Adjust the alpha value (last parameter) for transparency
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Views",
          data: allProducts.map((product) => product.views), // Array of view totals
          backgroundColor: "rgba(255, 99, 132, 0.8)", // Adjust the alpha value (last parameter) for transparency
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
}

// Define the product names and image sources
const productNames = [
  "R2D2 Luggage",
  "Banana Slicer",
  "Ipad Stand",
  "Toeless Wellies",
  "Breakfast Machine",
  "Meatball Bubblegum",
  "Hump Chair",
  "Cthulhu",
  "Dog Beak",
  "Dragon Meat",
  "Cutlery Pens",
  "Pet Maid",
  "Pizza Scissors",
  "Shark Sleeping Bag",
  "Baby Maid",
  "Tauntaun Sleeper",
  "Unicorn Meat",
  "Water Can",
  "Wine Glass",
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
