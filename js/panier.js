let storage = JSON.parse(window.localStorage.getItem("panier"));
// Si le panier est vde
if (storage === null) {
  let panierVide = document.createElement("p");
  let panierVideEmplacement = document.getElementById("panier-vide");
  panierVide.innerHTML = `<div class="alert alert-danger" role="alert">
  <h3>Votre panier est vide !</h3>
  </div>
  `;
  panierVideEmplacement.appendChild(panierVide);
  // Cacher le formulaire
  let form = document.getElementById("formulaire");
  form.style.display = "none";
}
// Boucle avec toute nos fonctions
for (let elem of storage) {
  createImage(elem.image);
  createName(elem.nom, elem.lense);
  quantityCamera();
  addOption();
  priceCamera(elem.prix);
}

// Image
function createImage(src) {
  let img = document.createElement("img");
  let imgEmplacement = document.getElementById("ligne-panier");
  img.src = src;
  img.className = "mb-3";
  imgEmplacement.appendChild(img);
}

// Nom de la caméra et lense
function createName(name, lense) {
  let nom = document.createElement("p");
  let nomEmplacement = document.getElementById("ligne-panier");
  nom.innerHTML = "<h6>" + name + "</h6>";
  let lentille = document.createElement("p");
  let lenseEmplacement = document.getElementById("ligne-panier");
  lentille.innerHTML = "<i>" + lense + "</i>";
  nomEmplacement.appendChild(nom);
  lenseEmplacement.appendChild(lentille);
}

// Creation du <select> pour la quantité
function quantityCamera() {
  let select = document.createElement("select");
  let selectEmplacement = document.getElementById("ligne-panier");
  select.className = "quantity";
  selectEmplacement.appendChild(select);
}

// Ajouter les <option> au <select>
function addOption() {
  let optionEmplacement = document.getElementsByClassName("quantity");
  for (let i = 1; i < 4; i++) {
    let option = document.createElement("option");
    option.text = i;
    option.value = i;
    for (let elem of optionEmplacement) {
      elem.add(option);
    }
  }
}

// Prix de la caméra
function priceCamera(price) {
  let prix = document.createElement("p");
  let prixEmplacement = document.getElementById("ligne-panier");
  prix.textContent = "Prix: " + price + " €";
  prix.className = "prix-camera-panier";
  prixEmplacement.appendChild(prix);
  // Changement du prix en fonction de la quantité
  let qtyChoose = document.getElementsByClassName("quantity");
  for (let elem of qtyChoose) {
    // qtyChoose.forEach((elem) => {
    elem.addEventListener("change", function addToPrice() {
      // console.log(elem[i].value);
    });
  }
}

// Boutton supprimer
function createButton() {
  let btn = document.createElement("button");
  let btnEmplacement = document.getElementById("btn-supprimer");
  btn.type = "button";
  btn.id = "btnSupp";
  btn.className = "btn btn-danger mst-1 mb-3";
  btn.textContent = "Vider le panier";
  btnEmplacement.appendChild(btn);
  document.getElementById("btnSupp").addEventListener("click", function () {
    localStorage.clear();
    document.location.reload();
  });
}
createButton();

let prixTTC = 0;
for (let elem of storage) {
  prixTTC += elem.prix;
}
let paragrapheTTC = document.createElement("strong");
paragrapheTTC.textContent = "TOTAL TTC";
let ttc = document.createElement("p");
let ttcEmplacement = document.getElementById("total-ttc");
ttc.textContent = prixTTC + " €";
ttcEmplacement.appendChild(paragrapheTTC);
ttcEmplacement.appendChild(ttc);

//---------------------------------------------------------------------------

// FORMULAIRE
let error = document.getElementById("message-erreur");
error.className = "alert alert-danger mt-2";
error.innerText = "Veuillez renseigner tout les champs !";
let formulaire = document.getElementById("formulaire");
//On recupère nos champs présent dans notre formulaire
let inputName = document.getElementById("name");
let firstName = document.getElementById("firstName");
let adress = document.getElementById("adress");
let city = document.getElementById("city");
let email = document.getElementById("email");

function remplirChamps() {
  let valeurEntreeNom = false;
  let valeurEntreePrenom = false;
  let valeurEntreeAdresse = false;
  let valeurEntreeVille = false;
  inputName.addEventListener("change", function () {
    if (
      //On vérifie si les champs sont vides
      inputName.value.trim().length > 1
    ) {
      // trim() retire les espaces initiaux et finaux
      valeurEntreeNom = true;
    }
  });
  firstName.addEventListener("change", function () {
    if (firstName.value.trim().length > 1) {
      valeurEntreePrenom = true;
    }
  });
  adress.addEventListener("change", function () {
    if (adress.value.trim().length > 1) {
      valeurEntreeAdresse = true;
    }
  });
  city.addEventListener("change", function () {
    if (city.value.trim().length > 1) {
      valeurEntreeVille = true;
    }
  });
  console.log(valeurEntreeAdresse);
  if (
    ((valeurEntreeNom = true),
    (valeurEntreePrenom = true),
    (valeurEntreeAdresse = true),
    (valeurEntreeVille = true))
  ) {
    // error.style.display = "none";
  }
}
remplirChamps();
//On vérifie si le mail est correct
let regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
if (regex.exec(email) == null) {
  //exec() exécute la recherche d'une correspondance sur une chaîne de caractères donnée
  // error.className = "alert alert-danger mt-2";
  // error.innerText = "Veuillez entrer un email correct !";
}

//--------------------------------------------
formulaire.addEventListener("submit", () => {
  //Création de l'objet User
  let users = {
    client: {
      nom: inpu$.value.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
      prénom: firstName.value.trim(),
      adresse: adress.value.trim(),
      ville: city.value.trim(),
      email: email.value.trim(),
    },
    products: productsTotalId, //Tableau des id des items
  };
  //La requête POST
  fetch("http://localhost:3000/api/cameras/users", {
    method: "POST", //Methode d'envoi Post
    headers: new Headers({
      "Content-Type": "application/json", //L'objet envoyé sera au format JSON
    }),
    body: JSON.stringify(users),
  })
    .then(async (result_) => {
      const result = await result_.json(); //On attend le résultat pour exécuter la suite
      window.localStorage.setItem("Commande", JSON.stringify(result.userId)); //On stocke orderId dans le localStorage pour l'utiliser après
      window.localStorage.setItem("users", JSON.stringify(users)); //On stock notre order dans localStorage pour l'utiliser après
    })
    .catch((error) => {
      console.log(error);
    });
  alert(`Votre commande a bien été validé`);
});
