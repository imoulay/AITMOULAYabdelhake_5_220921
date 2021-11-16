let spanNumeroCommande = document.querySelector("#orderId");

const UrlOrderId = window.location.search;
const NumeroCommande = UrlOrderId.replace("?", "");
spanNumeroCommande.innerText = NumeroCommande;
