"use strict";
// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	if (window.scrollY > navbarHeight) {
		navbar.classList.add("navbar--dark");
	} else {
		navbar.classList.remove("navbar--dark");
	}
});
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
	const target = event.target;
	const link = target.dataset.link;
	if (link == null) {
		return;
	}
	scrollIntoView(link);
});
// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", (event) => {
	scrollIntoView("#contact");
});
<<<<<<< HEAD
// Make home slowly fade to transparent ad the window scrollss down
=======
// Make home sloly fade to transparent ad the window scrollss down
>>>>>>> ff5936ac75d96cb8a016dc1ca6ab30f167be302e
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
	home.style.opacity = 1 - window.scrollY / homeHeight;
});

function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({ behavior: "smooth" });
}
