// async function fillProducts() {
//   await fetch("http://localhost:3000/api/cameras")
//     .then((response) => response.json())
//     .then((cameras) => {
//       remplirListeProduits(cameras);
//       afficherMoitiePrix(cameras);
//     });
//     .catch(err) => console.log('Erreur: ' + err))
// }

// fillProducts();
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras")
    .then((response) => response.json())
    .then((cameras) => {
      remplirListeProduits(cameras);
      afficherMoitiePrix(cameras);
    });
}

fillProducts();

function remplirListeProduits(cameras) {
  for (let elem of cameras) {
    console.log(elem.name);
  }
}

function afficherMoitiePrix(array) {
  for (let elem of array) {
    console.log(elem.name + " à -50% est à " + elem.price / 100 / 2 + "€");
  }
}
