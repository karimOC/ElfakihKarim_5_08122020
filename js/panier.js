let storage = JSON.parse(window.localStorage.getItem("panier"));
for (let elem of storage) {
  createImage(elem.image);
  createName(elem.nom, elem.lense);
  quantityCamera();
  addOption();
  priceCamera(elem.prix);
  // totalTTC(elem);
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
let ttc = document.createElement("p");
let ttcEmplacement = document.getElementById("total-ttc");
ttc.textContent = prixTTC + " €";
ttcEmplacement.appendChild(ttc);
