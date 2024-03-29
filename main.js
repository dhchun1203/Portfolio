"use strict";
// Make navbar transparent when scrolling
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
  navbarMenu.classList.remove("open");
  navbarMenu.firstElementChild.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  navbarMenu.firstElementChild.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent with window scroll down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
/*
1. 클릭한 category__btn 에 selected 스타일을 적용하고 이전에 선택되어 있던 
   selected 스타일은 제거
2. 클릭한 category__btn의 data-filter와 일치하는 project 들을 filtering 
   및 display
*/
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (event) => {
  // category__count를 클릭했을 경우도 생각
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  // break point 를 위로 올려 성능을 향상
  if (filter == null) {
    return;
  }
  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  if (active == null) return;
  active.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  /*
	비동기적으로 시간차를 두어 filter와 display를 실행하여 위의 anim-out이 
	정상적으로 동작하게 함
	*/
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 200);
});

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// (https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화(active) 시킨다.
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
  // 교차 기준을 viewport로 설정
  root: null,
  rootMargin: "0px",
  threshold: 0.3, // intersection ratio 요소가 교차하는 정도를 나타냄(0 - 1)
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  // wheel 이벤트는 사용자가 직접 손으로 스크롤을 할 때만 동작하는 이벤트
  if (window.scrollY === 0) {
    // 화면이 제일 위에 있을 때
    selectedNavIndex = 0;
  } else if (
    // 화면이 제일 아래에 있을 때
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// 지금 이 코드는 for 루프를 돌지도 않고 getboundingRect() 를 사용하지도 않은 최적화된 코드
