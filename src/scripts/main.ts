document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.querySelector(".cookie-close").addEventListener("click", (e) => {
  document.querySelector(".cookie").classList.add("hide");
  localStorage.setItem("cookie", "true");
});

if (!localStorage.getItem("cookie"))
  document.querySelector(".cookie").classList.remove("hide");