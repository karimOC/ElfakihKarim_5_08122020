
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

