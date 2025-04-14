import "../style/index.css";

/**
 *  Esta función se llama cada vez que el usuario cambia un valor.
 *  Aquí renderizamos la tarjeta de perfil en función de las variables.
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Mostrar u ocultar portada según includeCover
  const cover =
    variables.includeCover === false
      ? `<div class="cover"></div>`
      : `<div class="cover"><img src="${variables.background}" /></div>`;

  // Preparar valores con fallback si son null
  const fullName = `${variables.name || "Your name"} ${variables.lastName ||
    "Your lastname"}`;
  const role = variables.role || "Web Developer";
  const location = `${variables.city || "City"}, ${variables.country ||
    "Country"}`;
  const avatar =
    variables.avatarURL || "https://randomuser.me/api/portraits/men/45.jpg";

  // Redes sociales (solo si están definidas)
  const socialLinks = `
    ${
      variables.twitter
        ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
        : ""
    }
    ${
      variables.github
        ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
        : ""
    }
    ${
      variables.linkedin
        ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
        : ""
    }
    ${
      variables.instagram
        ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
        : ""
    }
  `;

  const socialPosition = variables.socialMediaPosition || "position-right";

  // Renderizar el contenido
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${avatar}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      <ul class="${socialPosition}">
        ${socialLinks}
      </ul>
    </div>
  `;
}

// No modificar nada debajo de esta línea
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables); // render inicial

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
