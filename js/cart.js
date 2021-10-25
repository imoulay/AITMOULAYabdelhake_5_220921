//DECLARER VARIABLES
let totalPrice = 0;
let totalArticle = 0;
//RECUPERER LES ARTICLES DU LOCALSTORAGE
const panier = JSON.parse(localStorage.getItem("panier"));
//BOUCLER SUR PANIER POUR RECUPERER LA COULEUR ET LE NOMBRE DE PRODUIT
for (product of panier) {
  let couleurArticle = product.choixCouleur;
  let nbArticle = product.nbArticle;
  totalArticle += product.nbArticle;
  let prix = product.prix;
  //APPELER L'API POUR RECUPERER L'URL DU PRODUIT
  const api = "http://localhost:3000/api/products";
  const urlProduct = `${api}/${product.id}`;
  //APPELER L'URL DU PRODUIT POUR RECUPERER SES INFORMATIONS
  fetch(urlProduct)
    .then((res) => res.json())
    .then((values) => {
      document.querySelector(
        "#cart__items"
      ).innerHTML += `<article class="cart__item" data-id="${values._id}" data-couleur="${couleurArticle}" data-prix="${values.price}">
                <div class="cart__item__img">
                <img src="${values.imageUrl}" alt="${values.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${values.name}(${couleurArticle})</h2>
                    <p>${values.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1"max="100" value="${nbArticle}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`;
      totalPrice += nbArticle * prix;
      document.querySelector("#totalQuantity").innerHTML = `${totalArticle}`;
      document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
    })
    .catch((err) => console.log(err));
}

// SUPPRESSION D'ARTICLES DEPUIS LE PANIER-----------------------------------------
const base = document.querySelector("#cart__items");
let btnSupprimer = ".deleteItem";

base.addEventListener("click", function (event) {
  event.preventDefault();
  //diriger l'ecoute  vert le boutton supprimer
  let closest = event.target.closest(btnSupprimer);
  if (closest && base.contains(closest)) {
    const artcileTag = event.target.parentNode.parentNode.parentNode.parentNode;
    // mettre à jour le loalStorage
    const id = artcileTag.dataset.id;
    const couleur = artcileTag.dataset.couleur;
    const prix = artcileTag.dataset.prix;
    for (product of panier) {
      if (product.id === id && product.choixCouleur === couleur) {
        const index = panier.indexOf(product);
        panier.splice(index, 1);

        // mise à jour du localStorage
        localStorage.setItem("panier", JSON.stringify(panier));

        // mettre à jour les totaux
        totalArticle -= product.nbArticle;
        totalPrice -= product.nbArticle * prix;
        document.querySelector("#totalQuantity").innerHTML = `${totalArticle}`;
        document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
      }
    }

    // supprimer l'élément
    artcileTag.parentElement.removeChild(artcileTag);
  }
});
// MISE À JOUR DES QUANTITES-------------------------------------------
let inputQuantite = ".itemQuantity";
base.addEventListener("change", function (event) {
  event.preventDefault();
  //diriger l'ecoute  vert l'input
  let closest = event.target.closest(inputQuantite);
  console.log(closest);
  //recuperer la valeur de la quantite
  let valeurQuantite = closest.value;
  console.log(valeurQuantite);
  //precuperer le parent
  let parent = closest.closest("article");
  console.log(parent);
  //recuperer les valeurs du parent
  let id = parent.dataset.id;
  let couleur = parent.dataset.couleur;
  let prix = parent.dataset.prix;

  for (product of panier) {
    if (product.id === id && product.choixCouleur === couleur) {
      product.nbArticle = Number(valeurQuantite);
    }
  }
  // mise à jour du localStorage
  localStorage.setItem("panier", JSON.stringify(panier));
  //---------------------------------------------------------------
  totalArticle = 0;
  totalPrice = 0;
  JSON.parse(localStorage.getItem("panier"));
  console.log(panier);
  for (product of panier) {
    let nbArticle = product.nbArticle;
    totalArticle += nbArticle;
    let prix = product.prix;
    console.log(nbArticle);
    console.log(totalArticle);
    totalPrice += nbArticle * prix;
  }

  // mettre à jour les totaux

  document.querySelector("#totalQuantity").textContent = `${totalArticle}`;
  document.querySelector("#totalPrice").textContent = `${totalPrice}`;
});

//VALIDATION DU FORMULAIRE---------------------
// const formulaire = document.getElementsByName("cart__order__form");
// const btnCommander = document.getElementById("order");

// btnCommander.addEventListener("click", function (e) {
//   e.preventDefault();
//   let prenom = document.getElementById("firstName");
//   let prenomError = document.getElementsByName("firstNameErrorMsg");
//   let nom = document.getElementById("lastName");
//   let nomError = document.getElementsByName("lastNameErrorMsg");
//   let adresse = document.getElementById("address");
//   let ville = document.getElementById("city");
//   let email = document.getElementById("email");
//   let regexNom = /^[a-zA-Z-\s]{2,}+$/;
//   let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (
//     prenom.value == "" ||
//     nom.value == "" ||
//     adresse.value == "" ||
//     ville.value == "" ||
//     email.value == ""
//   ) {
//     e.preventDefault();
//   } else if (myRegex.test(prenom.value) == false) {
//     prenomError.innerHTML = "Champs invalide";
//     prenomError.style.color = "red";
//     e.preventDefault();
//   } else if (myRegex.test(nom.value) == false) {
//     nomError.innerHTML = "Champs invalide";
//     nomError.style.color = "red";
//     e.preventDefault();
//   }
// });
