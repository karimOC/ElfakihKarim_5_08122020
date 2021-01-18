let storage = JSON.parse(window.localStorage.getItem("panier"));
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
  // quantityCamera();
  // addOption();
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
// function quantityCamera() {
//   let select = document.createElement("select");
//   let selectEmplacement = document.getElementById("ligne-panier");
//   select.className = "quantity";
//   selectEmplacement.appendChild(select);
// }

// // Ajouter les <option> au <select>
// function addOption() {
//   let optionEmplacement = document.getElementsByClassName("quantity");
//   for (let i = 1; i < 4; i++) {
//     let option = document.createElement("option");
//     option.text = i;
//     option.value = i;
//     for (let elem of optionEmplacement) {
//       elem.add(option);
//     }
//   }
// }

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
let textTtcEmplacement = document.getElementById("text-ttc");
let ttcEmplacement = document.getElementById("total-ttc");
ttc.textContent = prixTTC + " €";
textTtcEmplacement.appendChild(paragrapheTTC);
ttcEmplacement.appendChild(ttc);

//---------------------------------------------------------------------------
// FORMULAIRE
function validation() {
  // -----------------------VALIDATION FORM----------------------------------
  let inputName = document.getElementById("name").value;
  let firstName = document.getElementById("firstName").value;
  let adress = document.getElementById("adress").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let error = document.getElementById("message-erreur");
  error.className = "alert alert-danger mt-2";
  if (inputName.trim().length < 3) {
    //trim() permet de supprimer les espaces ajouté
    error.innerText = "Veuillez renseigner un nom correct !";
    return false;
  }
  if (firstName.trim().length < 3) {
    error.innerText = "Veuillez renseigner un prénom correct !";
    return false;
  }
  if (adress.trim().length < 5) {
    error.innerText = "Veuillez renseigner une adresse correct !";
    return false;
  }
  if (city.trim().length < 2) {
    error.innerText = "Veuillez renseigner une ville correct !";
    return false;
  }
  //On vérifie si le mail est correct
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  //exec() exécute la recherche d'une correspondance sur une chaîne de caractères donnée
  if (email.match(regex)) {
  } else {
    error.innerText = "Veuillez renseigner un mail correct !";
    return false;
  }
  // ---------------------LOCAL STORAGE CLIENTS ET COMMANDE-------------------
  // On récupère notre storage pour les clients
  // let storageClients = window.localStorage.getItem("clients");
  // if (storageClients == null) {
  //   storageClients = [];
  // } else {
  //   storageClients = JSON.parse(storageClients); //On extrait notre json
  // }
  // On récupère le prix total et les produits de la commande
  let prixTTC = parseInt(document.getElementById("total-ttc").innerText);
  //Création de l'objet User
  let order = {
    contact: {
      firstName: firstName,
      lastName: inputName,
      address: adress,
      city: city,
      email: email,
    },
    products: ["5be9c8541c9d440000665243"],
  };
  //     Prenom: firstName,
  // let command = [];
  // for (let elem of storage) {
  //   command = {
  //     Nom: inputName,
  //     Prenom: firstName,
  //     PrixTTC: prixTTC
  //   };
  // }
  // alert(JSON.stringify(order));
  // ---------------------REQUETE POST VERS LA BASE DE DONNEE-------------------
  //La requête POST
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST", //Methode d'envoi
    body: JSON.stringify({
      firstName: firstName,
      lastName: inputName,
      address: adress,
      city: city,
      email: email,
    }),
    headers: {
      "Content-Type": "application/json",
    }
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      }),
  });
  // window.localStorage.setItem("clients", JSON.stringify(storageClients)); //On stock notre Utilsateur dans localStorage

  // fetch("http://localhost:3000/api/cameras/order", {
  //   method: "POST", //Methode d'envoi Post
  //   headers: new Headers({
  //     "Content-Type": "application/json", //L'objet envoyé sera au format JSON
  //   }),
  //   body: JSON.stringify(order),
  // })
  //   .then(async (result_) => {
  //     const result = await result_.json(); //On attend le résultat pour exécuter la suite
  //     // window.localStorage.setItem("Commande", JSON.stringify(storage)); //On stocke orderId dans le localStorage
  //     // window.localStorage.setItem("clients", JSON.stringify(storageClients)); //On stock notre Utilsateur dans localStorage
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  alert("Votre commande a bien été validé");
}
