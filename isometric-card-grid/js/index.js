window.addEventListener("scroll",scrollGrid);
window.addEventListener("wheel",noShakeScroll);

function scrollGrid() {
	let transY = window.pageYOffset,
		cards = document.querySelector(".cards");
	
	cards.style.setProperty("--scroll",transY + "px");
}
scrollGrid();

/* Without this, the `items` div erratically shakes while scrolling with wheel or touchpad. The issue still persists in Safari though… */
function noShakeScroll(e) {
	this.scrollBy(0,e.deltaY);
	e.preventDefault();
}