// RECUPERATION DE L'ID PRODUIT A PARTIR DE L'ADRESSE URL
const api = "http://localhost:3000/api/products";
const idProduit = window.location.search.replace("?_id=", "");
const urlProduit = `${api}/${idProduit}`;
//-----------------------------------------------------------------
const titre = document.getElementById("title");
const prix = document.getElementById("price");
const description = document.getElementById("description");
const colorProduct = document.getElementById("colors");
const nbArticle = document.getElementById("quantity");
const image = document.querySelector(".item__img");
//-----------------------------------------------------------------
// APPELER L'API DU PRODUIT POUR RECUPERER SES DETAILS
fetch(urlProduit)
  .then((res) => res.json())
  .then((values) => {
    titre.innerHTML = values.name;
    prix.innerHTML = values.price;
    description.innerHTML = values.description;
    imageUrl = values.imageUrl;
    altTxt = values.altTxt;
    image.innerHTML = `<img src="${imageUrl}" alt="${altTxt}" />`;
    //BOUCLER SUR COLORS POUR RECUPERER TOUTES LES COULEURS DU PRODUITS
    for (item of values.colors) {
      colorProduct.innerHTML += `<option value="${item}">${item}</option>`;
    }
  })
  .catch((err) => console.log(err));
//-----------------------------------------------------------------
// RECUPERER LE BOUTON AJOUTER AU PANIER
const btnPanier = document.getElementById("addToCart");
// ECOUTER LE BOUTON AJOUTER AU PANIER
btnPanier.addEventListener("click", function (e) {
  e.preventDefault();
  // INITIALISE LA VARIABLE ET Y INJECTER LES INFORMATIONS DU PRODUIT
  let product = {
    id: idProduit,
    nbArticle: Number(nbArticle.value),
    choixCouleur: colorProduct.value,
    prix: prix.innerHTML,
  };
  // INITIALISER LA VARIABLE ET VARIFIER SI LOCALSTORAGE EST EXISTANT
  let panier = JSON.parse(localStorage.getItem("panier")) ?? [];
  // SI LOCALSTORAGE EST VIDE, CREER UN NOUVEAU TABLEAU ET LE PLACER DANS LE LOCALSTORAGE
  if (panier.length == null) {
    panier.push(product);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Votre produit a bien été ajouté au panier");
    nbArticle.value = 0;
    // SI LE NOMBRE D'ARTICLE ET DE O, ONT FAIT RIEN
  } else if (nbArticle.value == 0 || colorProduct.value == "") {
    e.preventDefault();
  } else {
    // SI LOCALSTORAGE N'EST PAS VIDE, VERIFIER SI L'ID ET LA COULEUR RECUPERE SONT DEJA PRESENTE
    for (produit of panier) {
      if (
        produit.id == idProduit &&
        produit.choixCouleur == colorProduct.value
      ) {
        // SI OUI INCREMENTER LE NOMBRE D'ARTICLE ET AJOUTER AU LOCALSTORAGE
        produit.nbArticle = Number(produit.nbArticle) + Number(nbArticle.value);
        alert("Votre produit a bien été ajouté au panier");
        nbArticle.value = 0;
        return localStorage.setItem("panier", JSON.stringify(panier));
      }
    }
    // SI L'ID ET LA COULEUR RECUPERE NE SONT PAS PRESENT, AJOUTER UN NOUVEAU TABLEAU ET PLACER DANS LE LOCALSTORAGE
    panier.push(product);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Votre produit a bien été ajouté au panier");
  }
});
