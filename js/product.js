import "regenerator-runtime/runtime";

// Get url paramater
const getUrlParameter = () => {
  const parameterUrl = window.location.search;
  const urlParams = new URLSearchParams(parameterUrl);

  const productId = urlParams.get("id");
  return productId;
};

// Fetch the product from the id
const getProduct = async () => {
  const productId = await getUrlParameter();
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  const data = await response.json();
  return data;
};

// Patch the new price into the db
const updatePrice = async (product, newPrice) => {
  fetch(`https://fakestoreapi.com/products/${product.id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify({
      price: newPrice,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};

// Display the product's informations
const displayProductInfo = async () => {
  const product = await getProduct();

  // If there's no product display and error message
  if (product === null) {
    // Get the product container
    const productContainer = document.getElementById("product-container");

    // Clear the product container
    productContainer.innerHTML = "";

    // Create all elements for no product found

    const titleError = document.createElement("h2");
    titleError.innerText = "Sorry, product not found !";
    titleError.style.color = "#564aff";

    const returnHomeButton = document.createElement("button");
    returnHomeButton.innerText = "Return Home";
    returnHomeButton.id = "return-button";
    returnHomeButton.style.backgroundColor = "#564aff";

    const linkReturnHome = document.createElement("a");
    linkReturnHome.href = "index.html";
    linkReturnHome.appendChild(returnHomeButton);

    // Appends all elements
    productContainer.appendChild(titleError);
    productContainer.appendChild(linkReturnHome);
  }
  // Else display product's information
  else {
    // Get all elements needed by id

    const titleProduct = document.getElementById("title-product");
    const description = document.getElementById("product-description");
    const priceWithVat = document.getElementById("price-with-vat");
    const inputPrice = document.getElementById("input-price");
    const imagePreview = document.getElementById("image-preview");
    const category = document.getElementById("category-title");
    const btnUpdatePrice = document.getElementById("btn-update-product");

    // Display values in each elements

    titleProduct.innerText = product.title;
    imagePreview.src = product.image;
    description.innerText = product.description;
    inputPrice.value = product.price;
    priceWithVat.innerText = `Price (including VAT): ${(
      product.price * 1.2
    ).toFixed(2)} €`;

    category.innerText = product.category;

    // Ternary that define the classname through the product's category
    category.className = `${
      product.category === "jewelery"
        ? "category jewelery"
        : product.category === "men's clothing"
        ? "category mens-clothing"
        : product.category === "women's clothing"
        ? "category womens-clothing"
        : "category electronics"
    }`;

    // This button will run the updatePrice function on click
    btnUpdatePrice.addEventListener("click", (e) => {
      e.preventDefault();
      const myInputValue = parseFloat(inputPrice.value);
      btnUpdatePrice.disabled = true;
      updatePrice(product, myInputValue);
    });

    // Get the current price
    inputPrice.addEventListener("input", (event) => {
      const price = parseFloat(event.target.value);
      priceWithVat.innerText = `Price (including VAT): ${(price * 1.2).toFixed(
        2
      )} €`;
      if (price === product.price) btnUpdatePrice.disabled = true;
      else btnUpdatePrice.disabled = false;
    });
  }
};

displayProductInfo();
