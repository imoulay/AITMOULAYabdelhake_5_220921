const api = "http://localhost:3000/api/products";

//-----------------------------------------------------------------
//RECUPERATION DE L'ID PRODUIT A PARTIR DE L'ADRESSE URL
const params = new URLSearchParams(document.location.search);
const idProduct = params.get("_id");
const urlProduct = `${api}/${idProduct}`;
//-----------------------------------------------------------------
//RECUPERATION DES INFORMATIONS DU PRODUIT A PARTIR DE L'ADRESSE API
const titre = document.getElementById("title");
const prix = document.getElementById("price");
const description = document.getElementById("description");
const colorProduct = document.getElementById("colors");
const nbArticle = document.getElementById("quantity");
const btnPanier = document.getElementById("addToCart");


fetch(urlProduct)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((values) => {
    titre.innerHTML = values.name;
    prix.innerHTML = values.price;
    description.innerHTML = values.description;

    for (item of values.colors){
        colorProduct.innerHTML += `<option value="${item}">${item}</option>`;
    };
  })
  .catch((err) => {});
//-----------------------------------------------------------------
btnPanier.addEventListener("click", function(){
    let product = {
      id: idProduct,
      nbArticle: nbArticle.value,
      choixCouleur: Number(colorProduct.value),
    };
    let panier = JSON.parse(localStorage.getItem("panier")) ?? [];
    
    if (panier.length == 0) {
        panier.push(product);
        localStorage.setItem("panier", JSON.stringify(panier));
    } else {
        for(produit of panier) {
            if (
              produit.id == idProduct &&
              produit.choixCouleur == colorProduct.value
            ) {
                produit.nbArticle =
                  Number(produit.nbArticle) + Number(nbArticle.value);
                  return localStorage.setItem("panier", JSON.stringify(panier));
            }
        }
        panier.push(product);
        localStorage.setItem("panier", JSON.stringify(panier));
    }
});