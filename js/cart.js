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
      document.getElementById("totalQuantity").innerHTML = `${totalArticle}`;
      document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    })
    .catch((err) => console.log(err));
}

// SUPPRESSION D'ARTICLES DEPUIS LE PANIER-------------------------

// boutonSupprimer.addEventListener("click", (e) => {
//   e.preventDefault();
//   let closetElement = element.closest(boutonSupprimer);
//   let arrtileProduct = e.target.closest("article");

//   if(){

//   }
// })

//---------------------------------------------------------------

const base = document.getElementById("cart__items");
console.log(base);
const boutonSupprimer = document.querySelectorAll(".deleteItem");
const articleSection = document.querySelector(".cart__item");
console.log(boutonSupprimer);
// const closetElement = boutonSupprimer.closest("article");
let btnSupprimer = ".deleteItem";

base.addEventListener("click", function (event) {
  event.preventDefault();
  //diriger l'ecoute  vert le boutton supprimer
  let closest = event.target.closest(btnSupprimer);
  if (closest && base.contains(closest)) {
    let artcileTag = event.target.closest("article");
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
        document.getElementById("totalQuantity").innerHTML = `${totalArticle}`;
        document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
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
  //precuperer le parent
  let parent = closest.closest("article");
  //recuperer les valeurs du parent
  let id = parent.dataset.id;
  let couleur = parent.dataset.couleur;
  //boucler sur le localStorage et changer les valeurs des quantités sous conditions
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
  for (product of panier) {
    let nbArticle = product.nbArticle;
    totalArticle += nbArticle;
    let prix = product.prix;
    totalPrice += nbArticle * prix;
  }
  // mettre à jour les totaux
  document.getElementById("totalQuantity").innerHTML = `${totalArticle}`;
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
});
// CREATION TABLEAU PRODUITS-------------------------------------------

let products = [];

for (product of panier) {
  let panierId = product.id;
  products.push(panierId);
}

// VALIDATION DU FORMULAIRE-----------------------------------------
let formulaire = document.querySelector(".cart__order__form");
let btnCommander = document.getElementById("order");

let prenom = document.getElementById("firstName");
let prenomError = document.getElementById("firstNameErrorMsg");
let nom = document.getElementById("lastName");
let nomError = document.getElementById("lastNameErrorMsg");
let adresse = document.getElementById("address");
let adresseError = document.getElementById("addressErrorMsg");
let ville = document.getElementById("city");
let villeError = document.getElementById("cityErrorMsg");
let email = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg");
let emailRegex = new RegExp(
  "^[a-zA-Z0-9_.+-]+@{1}[a-zA-Z0-9-]+.{1}[a-zA-Z0-9-.]+$"
);
let nomRegex = new RegExp("^[a-zA-Z.-]+$");

//----------------------------------------------------------------------
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

//--------------------------------------------------------

prenom.addEventListener("change", () => {
  if (prenom.value == "") {
    prenomError.textContent = "Veuillez saisir votre prenom";
    prenom.focus();
  } else if (nomRegex.test(prenom.value) == false || prenom.value.length < 2) {
    prenomError.textContent = "Veuillez saisir un prenom valide";
    prenom.focus();
  } else {
    prenomError.textContent = "";
    contact.firstName = prenom.value;
  }
});
//--------------------------------------------------------------
nom.addEventListener("change", () => {
  if (nom.value == "") {
    nomError.textContent = "Veuillez saisir votre nom";
    nom.focus();
  } else if (nomRegex.test(nom.value) == false || nom.value.length < 2) {
    nomError.textContent = "Veuillez saisir un nom valide";
    nom.focus();
  } else {
    nomError.textContent = "";
    contact.lastName = nom.value;
  }
});
//--------------------------------------------------------------
adresse.addEventListener("change", () => {
  if (adresse.value == "") {
    adresseError.textContent = "Veuillez saisir votre adresse";
    adresse.focus();
  } else if (adresse.value.length < 4) {
    adresseError.textContent = "Veuillez saisir votre adresse valide";
  } else {
    adresseError.textContent = "";
    contact.address = adresse.value;
  }
});
//--------------------------------------------------------------
ville.addEventListener("change", () => {
  if (ville.value == "") {
    villeError.textContent = "Veuillez saisir votre ville";
    ville.focus();
  } else if (ville.value.length < 2) {
    villeError.textContent = "Veuillez saisir une ville valide";
  } else {
    villeError.textContent = "";
    contact.city = ville.value;
  }
});
//--------------------------------------------------------------

email.addEventListener("change", () => {
  if (email.value == "") {
    emailError.textContent = "Veuillez saisir votre email";
    email.focus();
  } else if (emailRegex.test(email.value) == false) {
    emailError.textContent = "Adresse email invalide";
    email.focus();
  } else {
    emailError.textContent = "";
    contact.email = email.value;
  }
});

//------------------------------------------------------------
btnCommander.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    prenomError.textContent == "" &&
    nomError.textContent == "" &&
    nom.value !== "" &&
    adresseError.textContent == "" &&
    adresse.value !== "" &&
    villeError.textContent == "" &&
    ville.value !== "" &&
    emailError.textContent == "" &&
    email.value !== ""
  ) {
    //----------------------------------------------------------
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          firstName: prenom.value,
          lastName: nom.value,
          address: adresse.value,
          city: ville.value,
          email: email.value,
        },
        products,
      }),
    })
      .then((res) => res.json())
      .then((values) => {
        let orderId = values.orderId;
        // document.location.replace(`confirmation.html?${orderId}`);
        let numeroCommande = document.querySelector("#orderId");
        console.log(values);
        console.log(orderId);
        console.log(numeroCommande);

        // numeroCommande.innerText = orderId;
      })
      .catch((err) => console.log(err));
  }
});
