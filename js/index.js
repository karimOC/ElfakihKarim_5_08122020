//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras") // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) // Renvoi la reponse en Json
    .then((cameras) => homeCameras(cameras)) // On récupère la réponse de la ligne précédente
    .catch((error) => console.log(error)); // Ne traite que le cas où la promesse est rejetée
}
fillProducts(); // On appel la fonction

//Fonction pour afficher la liste de toutes les caméras disponible
function homeCameras(array) {
  let lesCameras = document.querySelector("#listCameras");
  for (let elem of array) {
    lesCameras.innerHTML += `<div id="camera-card" class="card" style="width: 20em;">
      <a href="produit.html?id=${elem._id}">
      <img src="${elem.imageUrl}" class="card-img-top" alt="image de la caméra ${elem.name}">
      </a>
      <div class="card-body">
          <h4 class="card-title">${elem.name}</h4>
          <p class="card-text">${elem.description}</p>
          <a href="produit.html?id=${elem._id}">
              <button type="button" class=" btn btn-dark btn-md">Plus d'informations</button>
          </a>
      </div>
  </div>`;
  }
}