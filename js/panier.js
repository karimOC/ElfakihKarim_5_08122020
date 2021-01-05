//Paramètre URL
const queryString = window.location.search; //recupere ladresse entiere
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id"); //recupere l'id
console.log(product)
//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras/" + product) // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) //Renvoi la reponse en Json
    .then((camera) => panierCameras(camera)) //Appel fonction
    .catch((error) => console.log(error));
}
fillProducts();

//Fonction pour afficher dans le panier la caméra choisie
function panierCameras(object) {
  let shopCamera = document.querySelector("#monPanier");
  shopCamera.innerHTML += `
        <div id="lignePanier" class="container border-bottom">
            <div class="row mb-2">
                <div class="col-3">
                    <img src="${
                      object.imageUrl
                    }" class="img-fluid" alt="image de la caméra ${
    object.name
  }">
                </div>
                <div class="col-6">
                    <p class="card-text">${object.name}<br>
                    ${object.lenses}</p>
                    <div class="input-group">
                        <label>Quantité: 
                            <select id="quantity" onchange="addToPrice()">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div id="prixCamera" class="col-3 d-flex justify-content-end">
                </div>
            </div>
        </div>
        <div class="row border-bottom">
            <div class="col-7">
            </div>
            <div class="col-5 d-flex justify-content-end">
            <p><strong>TOTAL TTC</strong><br>
            <strong id="totalTTC">${object.price / 100} €</strong></p>
            </div>
        </div>
        `;
  let emplacementPrix = document.getElementById("prixCamera");
  emplacementPrix.innerHTML = "<small>" + object.price / 100 + "€ </small>";

  function addToPrice() {
    // let quantité = document.getElementById("quantity")
    // qty = quantité.value
    // if (qty === 2) {
    // emplacementPrix.innerHTML = '<small>' + object.price*2/100 + '€ </small>'
    // else if (qty === 3) {
    //     emplacementPrix.innerHTML = '<small>' + object.price*3/100 + '€ </small>'
    // }
    // else
    //     emplacementPrix.innerHTML = '<small>' + object.price/100 + '€ </small>'
    // }
    // console.log(qty)
  }
  addToPrice();
}
