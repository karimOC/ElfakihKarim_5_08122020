
let camera;
let $lesCameras = document.querySelector("#listCameras");

//Appel de notre API
fetch("http://localhost:3000/api/cameras")
  .then(async (result_) => {
    //Fonction asynchrone
    const result = await result_.json(); //Le reste du code s'execute après l'execution de la promesse
    result.forEach((result) => {
      camera = result; //Result deviens camera
      //Appel de nos functions
      cameraCard();
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Notre template camera card
const cameraCard = () => {
  $lesCameras.innerHTML += `<div id="camera-card" class="card" style="width: 20em;">
      <a href="produit.html?id=${camera._id}">
      <img src="${camera.imageUrl}" class="card-img-top" alt="image de la caméra ${camera.name}">
      </a>
      <div class="card-body">
          <h4 class="card-title">${camera.name}</h4>
          <p class="card-text">${camera.description}</p> 
          <a href="produit.html?id=${camera._id}">
              <button type="button" id="camera-infos" class="add-to-cart  btn btn-dark btn-md">Plus d'informations</button>
          </a>
      </div>   
  </div>`;
};
