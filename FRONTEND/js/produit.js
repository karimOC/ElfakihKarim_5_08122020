//Paramètre URL
const queryString = window.location.search; //recupere ladresse entiere
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id"); //recupere l'id
console.log(product);

//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras/" + product) // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) //Renvoi la reponse en Json
    .then((camera) => idCamera(camera)) //Appel fonction
    .catch((error) => console.log(error));
}
fillProducts();

//Fonction pour afficher la liste de toutes les caméras disponible
function idCamera(object) {
  console.log(object);
  let idChoisie = document.querySelector("#choixCameras");
  idChoisie.innerHTML += `<div id="camera-card" class="card" style="width: 18em;">
    <a href="produit.html?id=${object._id}">
    <img src="${
      object.imageUrl
    }" class="card-img-top" alt="image de la caméra ${object.name}">
    </a>
    <div class="card-body">
        <h4 class="card-title">${object.name}</h4>
        <p class="card-text">${object.description}</p>
        <select class="custom-select col-8" id="listLenses">
        </select>
        <strong><p class="card-text mt-3">Prix: ${
          object.price / 100
        } €</p></strong>
        <a href="produit.html?id=${object._id}">
        <button type="button"  onclick="addToBasket()" id="camera-buy" class="add-to-products btn btn-warning mt-3">Ajouter au panier</button>
        </a>
    </div>
</div>`;
  for (elem of object.lenses) {
    let emplacementSelect = document.getElementById("listLenses");
    let option = document.createElement("option");
    option.text = elem;
    emplacementSelect.add(option);
  }
}
