//Paramètre URL
const queryString = window.location.search; // Récupère l'adresse entière
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId"); // Récupère l'id
//On récupère le prix total
let storage = window.localStorage.getItem("prix-total");
// On affiche le numéro Id et le prix dans le Html
let idText = document.getElementById("num-commande");
idText.innerHTML =
  "<u>Numéro de commande</u>: <strong>" +
  orderId +
  "</strong><br><u>Prix de la commande</u>: <strong>" +
  storage +
  " €</strong>";

let lienAccueil = document.getElementById("lien-accueil");
lienAccueil.addEventListener("click", function () {
  localStorage.clear();
});