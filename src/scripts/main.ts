document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function closeCookie(accepted: boolean) {
  localStorage.setItem("cookie", accepted ? "true" : "false");
  document.querySelector(".cookie").classList.add("hide");
}

document.querySelector(".cookie-cancel").addEventListener("click", (e) => closeCookie(false));
document.querySelector(".cookie-accep").addEventListener("click", (e) => closeCookie(true));

if (!localStorage.getItem("cookie"))
  document.querySelector(".cookie").classList.remove("hide");