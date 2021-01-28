let storage = JSON.parse(window.localStorage.getItem("panier"));
let storageId = JSON.parse(window.localStorage.getItem("les-id"));
// Si le panier est vide
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

// Prix de la caméra
function priceCamera(price) {
  let prix = document.createElement("p");
  let prixEmplacement = document.getElementById("ligne-panier");
  prix.textContent = "Prix: " + price + " €";
  prix.className = "prix-camera-panier";
  prixEmplacement.appendChild(prix);
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
let textTtcEmplacement = document.getElementById("text-ttc");
let ttcEmplacement = document.getElementById("total-ttc");
ttc.textContent = prixTTC + " €";
textTtcEmplacement.appendChild(paragrapheTTC);
ttcEmplacement.appendChild(ttc);

//---------------------------------------------------------------------------
// FORMULAIRE
let btnCmd = document.getElementById("btn-commander");
btnCmd.addEventListener("click", async function (e) {
  e.preventDefault(); //L'empêche de soumettre le formulaire
  // -----------------------VALIDATION FORM----------------------------------
  let lastName = document.getElementById("lastName").value;
  let firstName = document.getElementById("firstName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let error = document.getElementById("message-erreur");
  error.className = "alert alert-danger mt-2";
  let regexName = /^[a-zA-Z]{3,}$/;
  if (lastName.match(regexName)) {
  } else {
    error.innerText = "Veuillez renseigner un nom correct !";
    return false;
  }
  if (firstName.match(regexName)) {
  } else {
    error.innerText = "Veuillez renseigner un prénom correct !";
    return false;
  }
  let regexAdresse = "[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"

  if (address.match(regexAdresse)) {
  } else {
    error.innerText = "Veuillez renseigner une adresse correcte !";
    return false;
  }
  if (city.match(regexName)) {
  } else {
    error.innerText = "Veuillez renseigner une ville correcte !";
    return false;
  }
  //On vérifie si le mail est correct
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  if (email.match(regex)) {
  } else {
    error.innerText = "Veuillez renseigner un mail correct !";
    return false;
  }
  // On récupère le prix total et les produits de la commande
  let prixTTC = parseInt(document.getElementById("total-ttc").innerText);
  // On récupère tous nos id du panier
  // window.localStorage.getItem("idProducts");
  //Création de l'objet User
  let order = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      city: city,
    },
    products: storageId,
  };
  window.localStorage.getItem("prix-total");
  alert(JSON.stringify(order))
  // ---------------------REQUETE POST VERS LA BASE DE DONNEE-------------------
  //La requête POST
  await fetch("http://localhost:3000/api/cameras/order", {
    method: "POST", // Méthode d'envoi
    body: JSON.stringify(order), // Ce qu'on écrit dans le corps de la requête
    headers: {
      "Content-Type": "application/json", // Format
    },
  })
    .then((response) => response.json()) // Renvoi la réponse en Json
    .then(
      (result) =>
        (window.location.href =
          "./confirmationCmd.html?orderId=" + result.orderId)
    )
    .catch((error) => error);
  window.localStorage.setItem("prix-total", JSON.stringify(prixTTC)); // On stock notre prix total dans localStorage
});
