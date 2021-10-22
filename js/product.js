const api = "http://localhost:3000/api/products";
//-----------------------------------------------------------------
// RECUPERATION DE L'ID PRODUIT A PARTIR DE L'ADRESSE URL
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
//-----------------------------------------------------------------
// APPELER L'API DU PRODUIT POUR RECUPERER TITRE, PRIX ET DESCRIPTION
fetch(urlProduct)
  .then((res) => res.json())
  .then((values) => {
    titre.innerHTML = values.name;
    prix.innerHTML = values.price;
    description.innerHTML = values.description;
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
    id: idProduct,
    nbArticle: Number(nbArticle.value),
    choixCouleur: colorProduct.value,
  };
  // INITIALISER LA VARIABLE ET VARIFIER SI LOCALSTORAGE EST EXISTANT
  let panier = JSON.parse(localStorage.getItem("panier")) ?? [];
  // SI LOCALSTORAGE EST VIDE, CREER UN NOUVEAU TABLEAU ET LE PLACER DANS LE LOCALSTORAGE
  if (panier.length == null) {
    panier.push(product);
    localStorage.setItem("panier", JSON.stringify(panier));
    // SI LE NOMBRE D'ARTICLE ET DE O, ONT FAIT RIEN
  } else if (nbArticle.value == 0 || colorProduct.value == "") {
  } else {
    // SI LOCALSTORAGE N'EST PAS VIDE, VERIFIER SI L'ID ET LA COULEUR RECUPERE SONT DEJA PRESENTE
    for (produit of panier) {
      if (
        produit.id == idProduct &&
        produit.choixCouleur == colorProduct.value
      ) {
        // SI OUI INCREMENTER LE NOMBRE D'ARTICLE ET AJOUTER AU LOCALSTORAGE
        produit.nbArticle = Number(produit.nbArticle) + Number(nbArticle.value);
        return localStorage.setItem("panier", JSON.stringify(panier));
      }
    }
    // SI L'ID ET LA COULEUR RECUPERE NE SONT PAS PRESENT, AJOUTER UN NOUVEAU TABLEAU ET PLACER DANS LE LOCALSTORAGE
    panier.push(product);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
});
