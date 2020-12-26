//----------AFFICHER TOUT LES MODELES DE CAMERAS-----------
// let emplacement = document.getElementById('lesProduits')
// let newDiv = document.createElement('div')
// let newImg = document.createElement('img')
// let newBtn = document.createElement('button')
// newDiv.className = 'row modeleProduit'
// newDiv.innerHTML = "new caméras"
// newImg.className = "imgProduit"
// newImg.src = "/JWDP5/images/vcam_2.jpg"
// newBtn.className = 'btn btn-light btn-sm'
// newBtn.type = 'button'
// emplacement.appendChild(newDiv)
// emplacement.appendChild(newImg)
// emplacement.appendChild(newBtn)
// console.log(newDiv)
// console.log(newImg)
// console.log(newBtn)

// Caution: when using fetch from your terminal, you need to use an external package like 'node-fetch'
function remplirListeProduits(cameras) {
    // loop here to display nounourses names
    for (let elem of cameras) {
      console.log(elem.name)
    }
  }
  

  
  async function fillProducts() {
    await fetch('http://localhost:3000/api/cameras') // will return info, but in wrong format
      .then((response) => response.json()) // will return info, in json format
      .then((cameras) => remplirListeProduits(cameras)) // main code here, using json info
  }
  
  fillProducts()
