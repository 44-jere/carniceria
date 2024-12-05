function getFromLocalStorage(key) {
    // Buscar el valor en localStorage
    const value = localStorage.getItem(key);

    // Si el valor existe, devolverlo
    if (value !== null) {
        return value;
    }

    // Si el valor no existe, devolver false
    return false;
}
function validatePhone(input) {
    // Verificar que la longitud de la cadena sea de 8 caracteres
    if (input.length !== 8) {
        return false;
    }

    // Verificar que todos los caracteres sean numéricos
    const isNumeric = /^[0-9]+$/.test(input);
    return isNumeric;
}
function validateEmail(email) {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function saveToLocalStorage(key, data) {
    // Guardar el dato en localStorage
    localStorage.setItem(key, data);

    console.log(`Dato guardado con la clave '${key}': ${data}`);
}
function addEmail(email){
    if(validateEmail(email)) saveToLocalStorage("email", email)
    else alert("email no valido")
}
function addPhone(phone){
    if(validatePhone(phone)) saveToLocalStorage("phone", phone)
    else  alert("Teléfono no valido")
}
const phone = getFromLocalStorage("phone")
const email = getFromLocalStorage("email")
const confirmationBTN = document.getElementById("confirmation-button-unsaved")
const inputsContainer = document.querySelector("#inputs-container")
const childrens = () =>{
    const phoneInput = inputsContainer.children[1]
    const mailInput = inputsContainer.children[3]
    return [phoneInput,mailInput]
}
function resetUnsaveCount(){
    const totalArticles = document.querySelector(`#total-articles-unsave`)
    const totalSpent =document.querySelector(`#total-spent-unsave`)
    totalSpent.innerText = 0
    totalArticles.innerText = 0
}
function hideUnsave(){
    document.querySelector("#not-save-orders > .my-order-content").style.display = "none"
}
const [phoneInput,mailInput] = childrens()
if(email) mailInput.value = email
if(phone) phoneInput.value = phone

function sendToDB(){
    const purchaseList = JSON.parse(getFromLocalStorage("purchased"))
    if(!purchaseList) return true
    const totalArticles = Object.entries(purchaseList).reduce((acc,val)=> acc + val[1].quantity,0)
    if(totalArticles < 2){
        alert("minimo de compra son 2 artículos")
        return true
    }
    const purchases = {
        phone,
        email,
        purchaseList
    }
    // Configurar la solicitud fetch
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchases)
    })
    .then(response => response.json())
    .then(data => {
        return false
    })
    .catch((error) => {
        return true
    });

}
function updateUserInfo(){
    if(!email) addEmail(mailInput.value)
    if(!phone) addPhone(phoneInput.value)
    if(email !== mailInput.value) addEmail(mailInput.value)
    if(phone !== phoneInput.value) addPhone(phoneInput.value)
}
function confirmPurchase(){
    updateUserInfo()
    const response = sendToDB()
    if(response) return false

    inputsContainer.style.display = "none"
    generateCards(true,"#save-items-container > .my-order-content") //return [TotalSpent,TotalArticles]
    resetUnsaveCount()
    hideUnsave()
    if (saveContainer.open) updateCountSave()//declarados en shoppingSaveSum
    localStorage.removeItem('purchased');
}

confirmationBTN.addEventListener("click",confirmPurchase)
