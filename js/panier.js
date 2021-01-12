//Paramètre URL
// const queryString = window.location.search; //recupere ladresse entiere
// const urlParams = new URLSearchParams(queryString);
// const product = urlParams.get("id"); //recupere l'id
// const lense = urlParams.get("lenses"); //recupere la lentille
// console.log(product)
// console.log(lense)

//Appel de l'API
// async function fillProducts() {
//   await fetch("http://localhost:3000/api/cameras/") // Renverra des informations, mais dans un format incorrect
//     .then((response) => response.json()) //Renvoi la reponse en Json
//     .then((camera) => panierCameras(camera)) //Appel fonction
//     .catch((error) => console.log(error));
// }
// fillProducts();

let storage = JSON.parse(window.localStorage.getItem("panier"));
console.log(storage);
for (let elem of storage) {
  // Image
  let img = document.createElement("img");
  let imgEmplacement = document.getElementById("image-panier");
  img.src = elem.image;
  img.className = "w-100";
  imgEmplacement.appendChild(img);
  // Boutton supprimer
  let btn = document.createElement("button");
  let btnEmplacement = document.getElementById("image-panier");
  btn.type = "button";
  btn.className = "btn-xs btn-danger mt-1 mb-3";
  btn.textContent = "x";
  btnEmplacement.appendChild(btn);
  // Quantité
  let select = document.createElement("select");
  let selectEmplacement = document.getElementById("label-quantité");
  select.textContent = "Quantité:";
  select.id = "quantity";
  selectEmplacement.appendChild(select);
  for (i = 1; i < 4; i++) {
    let option = document.createElement("option");
    let optionEmplacement = document.getElementById("quantity");
    option.text = [i];
    option.value = [i];
    optionEmplacement.add(option);
  }
  // Nom de la caméra et lense
  let nom = document.createElement("p");
  let nomEmplacement = document.getElementById("nom-camera");
  nom.textContent = elem.nom;
  let lense = document.createElement("p");
  let lenseEmplacement = document.getElementById("nom-camera");
  lense.textContent = elem.lense;
  nomEmplacement.appendChild(nom);
  lenseEmplacement.appendChild(lense);
  // Prix de la caméra
  let prix = document.createElement("p");
  let prixEmplacement = document.getElementById("prix-camera");
  prix.textContent = elem.prix + " €";
  prixEmplacement.appendChild(prix);
}

//Fonction pour afficher dans le panier la caméra choisie
// function panierCameras(storage) {
//   let img = document.getElementById("imageCamera");

  document.getElementById("quantity").addEventListener("change", addToPrice);

  function addToPrice() {
    var x = document.getElementById("quantity");
    let emplacementPrix = document.getElementById("prixCamera");
    emplacementPrix.innerHTML =
      "<small>" + (x.value * storage.prix) / 100 + "€ </small>";
  }
  addToPrice();
// }
// localStorage.clear();
