const saveContainer = document.getElementById("save-items-container")
function updateCountSave(){
    const totals = document.querySelectorAll("#save-items-container [data-total]")
    const articles = document.querySelectorAll("#save-items-container [data-cantidad]")

    const totalSpent = [...totals].reduce((acc, valu) => {
        const total = parseInt(valu.dataset.total);
        valu.removeAttribute('data-total'); // Eliminar el atributo data-total
        return acc + total;
    }, 0);

    const totalArticles = [...articles].reduce((acc, valu) => {
        const cantidad = parseInt(valu.dataset.cantidad);
        valu.removeAttribute('data-cantidad'); // Eliminar el atributo data-cantidad
        return acc + cantidad;
    }, 0);
    const articleSpan = document.getElementById("total-articles-save")
    const totalSpan = document.getElementById("total-spent-save")
    articleSpan.innerText = parseInt(articleSpan.innerText) + totalArticles
    totalSpan.innerText = parseInt(totalSpan.innerText) + totalSpent
}
saveContainer.addEventListener("click",e=>{
    if (!saveContainer.open) setTimeout(updateCountSave,500)
})
