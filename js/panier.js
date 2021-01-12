let storage = JSON.parse(window.localStorage.getItem("panier"));
console.log(storage);
for (let elem of storage) {
  createImage(elem.image);
  createButton();
  // Nom de la caméra et lense
  let nom = document.createElement("p");
  let nomEmplacement = document.getElementById("ligne-panier");
  nom.textContent = elem.nom;
  let lense = document.createElement("p");
  let lenseEmplacement = document.getElementById("ligne-panier");
  lense.textContent = elem.lense;
  nomEmplacement.appendChild(nom);
  lenseEmplacement.appendChild(lense);
  // Quantité
  let select = document.createElement("select");
  let selectEmplacement = document.getElementById("ligne-panier");
  select.className = "quantity";
  selectEmplacement.appendChild(select);

  // Prix de la caméra
  let prix = document.createElement("p");
  let prixEmplacement = document.getElementById("ligne-panier");
  prixEmplacement.appendChild(prix);
  // Changement du prix en fonction de la quantité
  let listQuantities = document.getElementsByClassName("quantity");
  for (let elem of listQuantities) {
    elem.addEventListener("change", addToPrice);
  }
}

// Image
function createImage(src) {
  let img = document.createElement("img");
  let imgEmplacement = document.getElementById("ligne-panier");
  img.src = src;
  img.className = "w-100";
  imgEmplacement.appendChild(img);
}
// Boutton supprimer
function createButton() {
  let btn = document.createElement("button");
  let btnEmplacement = document.getElementById("ligne-panier");
  btn.type = "button";
  btn.className = "btn-xs btn-danger mt-1 mb-3";
  btn.textContent = "x";
  btnEmplacement.appendChild(btn);
}
// Nom de la caméra et lense
function createButton() {
  let btn = document.createElement("button");
  let btnEmplacement = document.getElementById("ligne-panier");
  btn.type = "button";
  btn.className = "btn-xs btn-danger mt-1 mb-3";
  btn.textContent = "x";
  btnEmplacement.appendChild(btn);
}

function addToPrice(prix) {
  var qty = document.getElementsByClassName("quantity");
  for (let elem of qty) {
    prix.textContent = qty.value * elem.prix + " €";
  }
}

let optionEmplacement = document.getElementsByClassName("quantity");
for (i = 1; i < 4; i++) {
  let option = document.createElement("option");
  option.text = i;
  option.value = i;
  for (let elem of optionEmplacement) {
    elem.add(option);
  }
}
addToPrice(prix);
// localStorage.clear();
