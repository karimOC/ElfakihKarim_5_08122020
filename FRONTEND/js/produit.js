//VARIABLES
let camera;
const $cameraProduct = document.querySelector("#choixCameras");
const lenses = document.createElement("select");

//Appel URL
const params = new URL(document.location).searchParams;
const id = params.get("id"); //Obtiens l'id du produit

//Appel de notre API
fetch("http://localhost:3000/api/cameras/" + id) //Rappel notre api + l'id de notre produit
  .then(async (result_) => {
    //Récupère le tableau json
    const result = await result_.json(); //Donne un nom au tableau json récupéré
    camera = result; //Result deviens camera
    //Appel de nos functions
    lenseList();
    cameraCard();
  })
  .catch((error) => {
    console.log(error);
  });
  
