// INITIALISER UNE VARIABLE CONTENANT L'API
const api = "http://localhost:3000/api/products";

// ON APPELLE L'API POUR RECUPERER LES INFORMATIONS DES PRODUITS
  fetch(api)
    .then(res => res.json())
    // RECUPERER LES VALEURS ET LES INTEGRER DANS LE HTML
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
    // SI ERREUR RETOURNER ERREUR
    .catch(err => console.log(err));