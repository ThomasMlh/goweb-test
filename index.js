import "regenerator-runtime/runtime";

// Fetch data from api
const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=20");
  const data = await response.json();
  return data;
};

// Display data on table
const displayProducts = async () => {
  const tableBody = document.getElementById("table-body");

  const products = await getProducts();

  products.forEach((product) => {
    const productUrl = new URL(`${window.location.origin}/product.html`);
    productUrl.searchParams.append("id", product.id);

    const productTr = document.createElement("tr");

    const productNameTr = document.createElement("td");
    productNameTr.className = "product-name";

    const linkProductName = document.createElement("a");
    linkProductName.href = `${productUrl}`;
    linkProductName.innerText = product.title;
    productNameTr.appendChild(linkProductName);

    const categoryTr = document.createElement("td");
    const spanCategory = document.createElement("span");
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

    productTr.appendChild(productNameTr);
    productTr.appendChild(productNameTr);
    productTr.appendChild(categoryTr);
    productTr.appendChild(priceTr);
    productTr.appendChild(priceVatTr);

    tableBody.appendChild(productTr);
  });
};

displayProducts();
