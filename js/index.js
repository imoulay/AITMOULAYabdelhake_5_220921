const api = "http://localhost:3000/api/products";


  fetch(api)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((values) => {
        for(item of values) {
            document.querySelector("main .limitedWidthBlock").innerHTML += `<section class="items" id="items"> 
                <a href="./product.html?_id=${item._id}">
                    <article>
                        <img src="${item.imageUrl}" alt="${item.altTxt}">
                        <h3 class="productName">${item.name}</h3>
                        <p class="productDescription">${item.description}</p>
                    </article>
                </a>
            </section>`;
        };
    })
    .catch((err) => {});