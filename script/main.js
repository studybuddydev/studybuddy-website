// @ts-ignore
function gtag() { dataLayer.push(arguments); }
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function closeCookie(accepted) {
    localStorage.setItem("cookie", accepted ? "true" : "false");
    document.querySelector(".cookie").classList.add("hide");
    // @ts-ignore
    if (accepted)
        gtag('consent', 'update', { 'ad_storage': 'granted', 'analytics_storage': 'granted' });
}
document.querySelector(".cookie-cancel").addEventListener("click", (e) => closeCookie(false));
document.querySelector(".cookie-accep").addEventListener("click", (e) => closeCookie(true));
function main() {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', 'G-FR9JDD39YJ');
    if (localStorage.getItem("cookie") === 'true') {
        document.querySelector(".cookie").classList.remove("hide");
        // @ts-ignore
        gtag('consent', 'default', { 'ad_storage': 'granted', 'analytics_storage': 'granted' });
    }
    else {
        // @ts-ignore
        gtag('consent', 'default', { 'ad_storage': 'denied', 'analytics_storage': 'denied' });
    }
}
main();
//# sourceMappingURL=main.js.map