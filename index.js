const itemsContainer = document.querySelector("#list-items") //selección del contenedor para almacenar en ese nodo.

//Crea un item para recibir cada color del API
function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}


async function fetchColorsList() {
  const url = "https://reqres.in/api/unknown";
  //petición 
  try{
    const response = await fetch(url, {
      headers:{
        "x-api-key": "reqres-free-v1"
      }
    });
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json(); //convierte la respuesta en un objeto JS
    console.log(result);

    //El array que contiene todo los colores
    //.forEach(color => {}) recorre cada valor
    result.data.forEach(color => {
      addItem(color); //crea la tarjeta para cada color


    //Se configura para almacenar los colores al localStorage   
    localStorage.setItem("colors", JSON.stringify(result.data));
      
    });
     
  }catch(error){
    console.log(error.message);
  }
}


//función para cargar desde localStorage
function loadColorsFromStorage() {
  const addColors = localStorage.getItem("colors"); //recupera lo almacenado 

//Validación
if(addColors){
  const colorsArray = JSON.parse(addColors);

  colorsArray.forEach( color => {
    addItem(color);
  });
}else{
  console.log("No se guardadron los colores")
}
  
}


borrarColores = () =>{
  itemsContainer.innerHTML="";
  localStorage.removeItem("colors");
  console.log("Colores eliminados");
}
const miBtn = document.getElementById("Button");
miBtn.addEventListener("click", borrarColores);
//Echa a andar este código (corre la funciones)
fetchColorsList()
loadColorsFromStorage()