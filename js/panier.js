//Paramètre URL
// const queryString = window.location.search; //recupere ladresse entiere
// const urlParams = new URLSearchParams(queryString);
// const product = urlParams.get("id"); //recupere l'id
// const lense = urlParams.get("lenses"); //recupere la lentille
// console.log(product)
// console.log(lense)

//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras/") // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) //Renvoi la reponse en Json
    .then((camera) => panierCameras(camera)) //Appel fonction
    .catch((error) => console.log(error));
}
fillProducts();

let storage = window.localStorage.getItem("panier");

//Fonction pour afficher dans le panier la caméra choisie
function panierCameras(object) {
  console.log(JSON.parse(storage));
  let img = document.getElementById("imageCamera");

  document.getElementById("quantity").addEventListener("change", addToPrice);

  function addToPrice() {
    var x = document.getElementById("quantity");
    let emplacementPrix = document.getElementById("prixCamera");
    emplacementPrix.innerHTML =
      "<small>" + (x.value * object.price) / 100 + "€ </small>";
    let emplacementSupp = document.getElementById("prixCamera");
    // btnSupp = document.createElement('button')
    // btnSupp.type = "button"
    // btnSupp.className = "btn btn-danger"
    // emplacementSupp.appendChild(btnSupp)
  }
  addToPrice();
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    // console.log(key, localStorage.getItem(key));
  }
}
// localStorage.clear();
// console.log(monStorage)
