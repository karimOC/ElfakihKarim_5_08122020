//Paramètre URL
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(queryString);

//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras/") // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) //Renvoi la reponse en Json
    .then((cameras) => idCameras(cameras)) //Appel fonction
    .catch((error) => console.log(error));
}
fillProducts();

//Fonction pour afficher la liste de toutes les caméras disponible
function idCameras(array) {
  let idChoisie = document.querySelector("#choixCameras");
  for (let elem of array) {
    let lenses = elem.lenses;
    idChoisie.innerHTML += `<div id="camera-card" class="card" style="width: 18em;">
    <a href="produit.html?id=${elem._id}">
    <img src="${elem.imageUrl}" class="card-img-top" alt="image de la caméra ${elem.name}">
    </a>
    <div class="card-body">
        <h4 class="card-title">${elem.name}</h4>
        <p class="card-text">${elem.description}</p>
        <select class="custom-select col-sm-4 col-12" id="inputGroupSelect01">
            ${lenses.innerHTML}
        </select>
          <label class="camera-quantity-selector col-sm-4 col-12 text-center " for="camera-quantity">Quantité: 
            <select id="quantity" onclick="addToPrice()" class="text-center mx-auto" name="camera-quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </label>
        <a href="produit.html?id=${elem._id}">
        <button type="button"  onclick="addToBasket()" id="camera-buy" class="add-to-products btn btn-warning">Ajouter au panier</button>
        </a>


    </div>
</div>`;
  }
}
