/**
 * RECUPERATION DE L'ELEMENT HTML (EMPLACEMENT DU NUMERO DE COMMANDE)
 */
let spanNumeroCommande = document.querySelector("#orderId");
/**
 * RECUPERATION DE  DU NUMERO DE COMMANDE A PARTIR DE L'URL
 */
const UrlOrderId = window.location.search;
const NumeroCommande = UrlOrderId.replace("?", "");
/**
 * INJECTION DU NUMERO DE COMMANDE DANS L'ELEMENT HTML'
 */
spanNumeroCommande.innerText = NumeroCommande;
