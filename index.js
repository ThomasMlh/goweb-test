import "regenerator-runtime/runtime";

// Fetch data from api
const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=20");
  const data = await response.json();
  return data;
};

// Display data on table
const displayProducts = async () => {
  // Get the table
  const tableBody = document.getElementById("table-body");

  // Fetching data
  const products = await getProducts();

  // ForEach product create a <tr> element into the table
  products.forEach((product) => {
    // Create and id parameter foreach product
    const productUrl = new URL(`${window.location.origin}/product.html`);
    productUrl.searchParams.append("id", product.id);

    // Create a link
    const productTr = document.createElement("tr");

    const productNameTr = document.createElement("td");
    productNameTr.className = "product-name";

    const linkProductName = document.createElement("a");
    linkProductName.href = `${productUrl}`;
    linkProductName.innerText = product.title;
    productNameTr.appendChild(linkProductName);

    const categoryTr = document.createElement("td");
    const spanCategory = document.createElement("span");

    // Ternary that define the classname through the product's category
    spanCategory.className = `${
      product.category === "jewelery"
        ? "category jewelery"
        : product.category === "men's clothing"
        ? "category mens-clothing"
        : product.category === "women's clothing"
        ? "category womens-clothing"
        : "category electronics"
    }`;

    spanCategory.innerText = product.category;
    categoryTr.appendChild(spanCategory);

    const priceTr = document.createElement("td");
    priceTr.innerText = `${product.price.toFixed(2)} €`;

    const priceVatTr = document.createElement("td");
    priceVatTr.innerText = `${(product.price * 1.2).toFixed(2)} €`;

    // Append all elements to the tr
    productTr.appendChild(productNameTr);
    productTr.appendChild(productNameTr);
    productTr.appendChild(categoryTr);
    productTr.appendChild(priceTr);
    productTr.appendChild(priceVatTr);

    // Append the tr into the table
    tableBody.appendChild(productTr);
  });
};

displayProducts();
