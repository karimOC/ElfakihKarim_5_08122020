//Paramètre URL
const queryString = window.location.search; //recupere ladresse entiere
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id"); //recupere l'id

//Appel de l'API
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras/" + product) // Renverra des informations, mais dans un format incorrect
    .then((response) => response.json()) //Renvoi la reponse en Json
    .then((camera) => idCamera(camera)) //Appel fonction
    .catch((error) => console.log(error));
}
fillProducts();

//Fonction pour afficher la caméra séléctionné
function idCamera(object) {
  let idChoisie = document.querySelector("#choixCameras");
  idChoisie.innerHTML += `<div id="camera-card" class="card" style="width: 18em;">
    <img src="${
      object.imageUrl
    }" class="card-img-top" alt="image de la caméra ${object.name}">
    <div class="card-body">
        <h4 class="card-title">${object.name}</h4>
        <p class="card-text">${object.description}</p>
        <select id="listLenses" onchange="getSelectValue()" class="custom-select col-8">
        </select>
        <strong><p class="card-text mt-3">Prix: ${
          object.price / 100
        } €</p></strong>
        <a id="lienHttp">
        <button type="button" class=" btn btn-warning mt-3">Ajouter au panier</button>
        </a>
    </div>
</div>`;

  for (elem of object.lenses) {
    let option = document.createElement("option");
    let emplacementSelect = document.getElementById("listLenses");
    option.text = elem;
    option.value = elem
    emplacementSelect.add(option);
    // console.log(option);
  }
  console.log(idChoisie)
  function getSelectValue() {
    let valueSelected = document.getElementById("listLenses").value
    console.log(valueSelected)
  }
  getSelectValue();

  let emplacementHttp = document.getElementById("lienHttp");
  emplacementHttp.href = "panier.html?id=" + object._id;
  // console.log(emplacementHttp);
}

/* <a id="" href="panier.html?id=${object._id}"> */
