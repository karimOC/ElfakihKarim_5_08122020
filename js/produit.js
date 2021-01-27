//Paramètre URL
const queryString = window.location.search; // Récupère l'adresse entière
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id"); // Récupère l'id de la caméra choisie

//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras/" + id) // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) // Renvoi la reponse en Json
    .then((camera) => idCamera(camera)) // Appel fonction
    .catch((error) => console.log(error)); // Ne traite que le cas où la promesse est rejetée
}
fillProducts();

//Fonction pour afficher la caméra séléctionné
function idCamera(object) {
  // On créé le HTML de la caméra sélectionné dans la page Produit.html
  let img = document.getElementById("imageCamera");
  img.src = object.imageUrl;
  let titre = document.getElementById("nomCamera");
  titre.innerText = object.name;
  let description = document.getElementById("descrCamera");
  description.innerText = object.description;
  let prix = document.getElementById("prixCamera");
  prix.innerText = object.price / 100 + " €";
  // On affiche ici les lentilles dans le <select> en fonction de la caméra choisie
  for (let elem of object.lenses) {
    let option = document.createElement("option");
    let emplacementSelect = document.getElementById("listLenses");
    option.text = elem;
    option.value = elem;
    emplacementSelect.add(option);
  }
}

function addToCart() {
  let img = document.getElementById("imageCamera").src;
  let nom = document.getElementById("nomCamera").innerText;
  let prix = parseInt(document.getElementById("prixCamera").innerText);
  let lense = document.getElementById("listLenses").value;
  let storage = window.localStorage.getItem("panier");
  let storageId = window.localStorage.getItem("les-id");
  if (storage == null) {
    storage = [];
    storageId = [];
  } else {
    storage = JSON.parse(storage); //On extrait notre json sans les ""
    storageId = JSON.parse(storageId); //On extrait notre json sans les ""
  }
  storage.push({
    nom,
    prix,
    lense,
    image: img,
  });
  storageId.push({
    id,
  });
  window.localStorage.setItem("panier", JSON.stringify(storage));
  window.localStorage.setItem("les-id", JSON.stringify(storageId));
  alert("Vous avez ajouté " + nom + " " + lense + " à votre panier");
}
