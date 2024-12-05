const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}
function moveArrows(e){
  const items = document.querySelectorAll('.item');
  if(e.key === "ArrowLeft") slider.prepend(items[items.length-1]);
  if(e.key === "ArrowRight") slider.append(items[0]);

}
document.addEventListener('click',activate,false);
document.addEventListener('keydown',moveArrows)
