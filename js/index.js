// INITIALISER UNE VARIABLE CONTENANT L'API
const api = "http://localhost:3000/api/products";

// ON APPELLE L'API POUR RECUPERER LES DETAILS DES PRODUITS
fetch(api)
  .then((res) => res.json())
  // RECUPERER LES DETAILS ET LES INTEGRER DANS LE HTML
  .then((values) => {
    for (item of values) {
      document.getElementById("items").innerHTML += ` 
                <a href="./product.html?_id=${item._id}">
                    <article>
                        <img src="${item.imageUrl}" alt="${item.altTxt}">
                        <h3 class="productName">${item.name}</h3>
                        <p class="productDescription">${item.description}</p>
                    </article>
                </a>`;
    }
  })
  // SI ERREUR RETOURNER ERREUR
  .catch((err) => console.log("Pas de réponse du serveur"));
