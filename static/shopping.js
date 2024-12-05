function getPurchasedItem() {
    // Intenta recuperar el ítem 'purchased' del localStorage
    const purchased = localStorage.getItem('purchased');

    // Verifica si hay algo almacenado en 'purchased'
    if (purchased) {
        return JSON.parse(purchased); // Devuelve el ítem parseado como objeto
    } else {
        return false; // Si no hay nada, devuelve false
    }
}

function generateCards(isSave = false,conainer = "#not-save-orders > .my-order-content"){

    let purchases = getPurchasedItem()
    const cls = isSave? "save" : "unsave"
    if(!purchases) return
    let TotalSpent = 0
    let TotalArticles = 0
    purchases = Object.entries(purchases)

    purchases.forEach(purchase=>{
        const producto = document.createElement("p")
        const precio = document.createElement("p")
        const cantidad = document.createElement("p")
        const divDetailsContainer = document.createElement("div")
        const total = document.createElement("p")
        const image = document.createElement("img")
        const imageContainer = document.createElement("figure")
        const article = document.createElement("article")
        const divTotalContainer = document.createElement("div")
        const addBtn = document.createElement("button")
        const removeBtn = document.createElement("button")
        let detailsContainer = document.querySelector(conainer) 
        let purchaseDetails = purchase[1]
        purchaseDetails.quantity = parseInt(purchaseDetails.quantity)
        purchaseDetails.precio = parseInt(purchaseDetails.precio)

        const createBtn = (text,classes,pk,btn)=>{
            btn.innerText = text
            classes.forEach(cls=>btn.classList.add(cls))
            btn.dataset.pk = pk
        }

        total.innerText = `Q${purchaseDetails.quantity * purchaseDetails.precio}`
        total.dataset.total = purchaseDetails.quantity * purchaseDetails.precio
        TotalSpent += purchaseDetails.quantity * purchaseDetails.precio
        TotalArticles += purchaseDetails.quantity
        total.id = `total-unsaved-${purchase[0]}`
        total.classList.add("title")

        purchaseDetails.precio = parseInt(purchaseDetails.precio)
        producto.innerText = `Producto:${purchaseDetails.producto}`
        precio.innerText = `Precio unitario: Q${purchaseDetails.precio}`
        cantidad.innerText = `Cantidad: ${purchaseDetails.quantity}`
        cantidad.dataset.cantidad = purchaseDetails.quantity
        cantidad.id = `cantidad-unsaved-${purchase[0]}`
        precio.id = `precio-unsaved-${purchase[0]}`
        divDetailsContainer.appendChild(producto)
        divDetailsContainer.appendChild(precio)
        divDetailsContainer.appendChild(cantidad)
        divDetailsContainer.classList.add("info-purchase-container")

        image.setAttribute("src",purchaseDetails.imagen)
        imageContainer.appendChild(image)

        article.appendChild(imageContainer)
        article.appendChild(divDetailsContainer)
        if(!isSave){
            createBtn("+",["add-btn","btn"],purchase[0],addBtn)
            createBtn("-",["subtract-btn","btn"],purchase[0],removeBtn)

            divTotalContainer.appendChild(addBtn)
            divTotalContainer.appendChild(total)
            divTotalContainer.appendChild(removeBtn)

            article.appendChild(divTotalContainer)
        }else article.appendChild(total)

        article.classList.add("shopping-cart")
        article.classList.add(cls)
        article.id = `unsaved-${purchase[0]}`
        detailsContainer.appendChild(article)

    })


    document.getElementById("total-spent-unsave").innerText = TotalSpent
    document.getElementById("total-articles-unsave").innerText = TotalArticles
    return [TotalSpent,TotalArticles]
}
generateCards()
