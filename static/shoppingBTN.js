let notSaveContainer = document.querySelector("#not-save-orders")

function modifyPurchase(purchase,pk,operation){
    const totalArticles = document.querySelector(`#total-articles-unsave`)
    const totalSpent =document.querySelector(`#total-spent-unsave`)
    purchase.quantity = parseInt(purchase.quantity) + operation
    totalSpent.innerText = parseInt(totalSpent.innerText) + (purchase.precio*operation)
    totalArticles.innerText = parseInt(totalArticles.innerText) + operation
    if(purchase.quantity <= 0 ) return true

    purchase.precio = parseInt(purchase.precio)
    const quantity = document.querySelector(`#cantidad-unsaved-${pk}`)
    const total = document.querySelector(`#total-unsaved-${pk}`)
    quantity.innerText = `Cantidad: ${purchase.quantity}`
    total.innerText = `Q${purchase.quantity * purchase.precio}`
}
const add = (purchase,pk)=>modifyPurchase(purchase,pk,1)
const subtract = (purchase,pk)=>modifyPurchase(purchase,pk,-1)
const funciones={
    "add-btn btn":add,
    "subtract-btn btn":subtract,
}
notSaveContainer.addEventListener("click",e=>{
    const purchase = getPurchasedItem()
    if(!purchase) return false

    const target = e.target
    const btn = target.classList.value
    const funcion = funciones[btn]
    if(!funcion) return false

    const article = target.parentElement.parentElement
    const pk = target.dataset.pk

    if(!purchase[pk]) return false
    const lessThan1 = funcion(purchase[pk],pk)
    if(lessThan1){
        article.remove()
        // Crear una nueva copia del objeto sin la propiedad especificada
        const { [pk]: _, ...newPurchase } = purchase;

        // Convertir el nuevo objeto en una cadena JSON
        const newPurchaseJSON = JSON.stringify(newPurchase);

        // Almacenar la cadena JSON en localStorage
        localStorage.setItem('purchased', newPurchaseJSON);
    }else{
        localStorage.setItem("purchased", JSON.stringify(purchase));
    }

})
