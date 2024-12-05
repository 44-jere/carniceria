// Asignación de variables globales
let pk = document.querySelector("#pk").dataset.pk;
let producto = document.querySelector("#producto").textContent;
let precio = document.querySelector("#precio").textContent;
let unidad = document.querySelector("#unidad").textContent;
let submitBTN = document.querySelector("#submitBTN");
let imagen = document.querySelector("#producto-imagen").dataset.imagen

// Función para parsear el precio
function parsePrice(number) {
    try {
        return Math.floor(parseInt(number));
    } catch (e) {
        alert("La cantidad ingresada no es válida");
        return false;
    }
}
function verifyContentExist(localInfo){
    if (!localInfo) {
        return localInfo = {};
    } else {
        try {
            return localInfo = JSON.parse(localInfo);
        } catch (e) {
            console.error("Error al parsear JSON desde localStorage:", e);
            return localInfo = {};
        }
    }
}

// Función para guardar las compras
function savePurchases() {
    const divCount = document.getElementById("total-articles-in-car")
    let quantity = document.querySelector("#quantity").value;
    quantity = parsePrice(quantity);
    precio = parsePrice(precio);
    if (quantity <= 0) return alert("El mínimo de compra es 1");

    let localInfo = localStorage.getItem("purchased");
    localInfo = verifyContentExist(localInfo)//return {} if not exist

    // Validar si el pk ya existe y actualizar la cantidad
    if (localInfo[pk]) {
        localInfo[pk].quantity += quantity;
    } else {
        let currentPurchase = {
            producto,
            precio,
            unidad,
            quantity,
            imagen
        };
        localInfo[pk] = currentPurchase;
    }

    // Guardar el objeto actualizado en el localStorage
    localStorage.setItem("purchased", JSON.stringify(localInfo));
    updateCountOnShoppingCard()
    document.querySelector("#quantity").value = 0;//resetear input
}

// Asignación del evento al botón de submit
submitBTN.addEventListener("click", savePurchases);
