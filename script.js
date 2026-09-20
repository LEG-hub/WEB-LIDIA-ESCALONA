document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function initLeadForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const fields = form.querySelector(".leadform__fields");
  const successEl = form.querySelector(".leadform__success");
  const errorEl = form.querySelector(".leadform__error");
  const submitBtn = form.querySelector(".leadform__submit");
  const submitLabel = submitBtn.textContent;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("submit failed");

      fields.hidden = true;
      successEl.hidden = false;
    } catch (err) {
      errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }
  });
}

initLeadForm("formPrivado");
