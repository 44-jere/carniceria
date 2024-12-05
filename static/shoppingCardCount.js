function updateCountOnShoppingCard(){
    // 1. Obtener el campo 'purchased' del Local Storage
    const purchasedData = localStorage.getItem("purchased");

    // 2. Verificar si el campo 'purchased' existe
    if (!purchasedData) {
      console.log("El campo 'purchased' no existe en el Local Storage.");
      return;
    }

    try {
      // 3. Parsear el JSON del Local Storage
      const purchasedObj = JSON.parse(purchasedData);

      // 6. Contar cuántos elementos hay en purchasedItems
      const itemCount =
      Object.entries(purchasedObj)
      .reduce((acc,e)=>acc + e[1].quantity,0);
      
      if (itemCount <= 0 ) return
      if(!itemCount) return
      const divCount = document.getElementById("total-articles-in-car")
      divCount.innerText = itemCount
      divCount.style.display = "flex"

    } catch (error) {
      // 7. Manejar cualquier error de parseo
      console.log("Error al analizar el campo 'purchased':", error);
    }
}
document.addEventListener("DOMContentLoaded", updateCountOnShoppingCard);
