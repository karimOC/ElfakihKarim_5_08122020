//VARIABLES
let camera;
const $cameraProduct = document.querySelector("#choixCameras");
const lenses = document.createElement("select");

//Appel URL
const params = new URL(document.location).searchParams;
const id = params.get("id"); //Obtiens l'id du produit

//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras") // Renverra des informations, mais dans un format incorrect
  .then(response => response.json())
  .then((cameras) => idCameras(cameras))
  .catch(error => console.log(error));
  }
fillProducts();

//Fonction pour afficher la liste de toutes les caméras disponible 
function idCameras(array) {
  let idChoisie = document.querySelector("#choixCameras");
  for (let elem of array) {
    idChoisie.innerHTML += `<div id="camera-card" class="card" style="width: 18em;">
      <a href="produit.html?id=${elem._id}">
      <img src="${elem.imageUrl}" class="card-img-top" alt="image de la caméra ${elem.name}">
      </a>
      <div class="card-body">
          <h4 class="card-title">${elem.name}</h4>
          <p class="card-text">${elem.description}</p>
          <a href="produit.html?id=${elem._id}">
              <button type="button" id="camera-infos" class="add-to-cart  btn btn-dark btn-md">Plus d'informations</button>
          </a>
      </div>
  </div>`;
  }
}
