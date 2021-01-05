//Paramètre URL
const queryString = window.location.search; //recupere ladresse entiere
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id"); //recupere l'id
const lense = urlParams.get("lenses"); //recupere la lentille
// console.log(product)
// console.log(lense)

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
  let img = object.imageUrl;
  let name = object.name;
  let price = object.price;
  localStorage.setItem("name", JSON.stringify(name));
  localStorage.setItem("image", JSON.stringify(img));
  localStorage.setItem("prix", JSON.stringify(price));
  localStorage.setItem("lense", JSON.stringify(lense));
  let shopCamera = document.querySelector("#monPanier");
  shopCamera.innerHTML += `
        <div id="lignePanier" class="container border-bottom">
            <div class="row mb-2">
                <div class="col-3">
                    <img src="${img}" class="img-fluid" alt="image de la caméra ${
    object.name
  }">
  <button type="button" class=" btn btn-danger mt-3">x</button>

                </div>
                <div class="col-6">
                    <p class="card-text">${name}<br>
                    ${lense}</p>
                    <div class="input-group">
                        <label>Quantité: 
                            <select id="quantity"">
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
localStorage.clear();
// console.log(monStorage)
