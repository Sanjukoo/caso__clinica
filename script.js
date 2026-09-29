
const CLAVE = "encomienda_s4";

const pagina = document.body.dataset.pagina;

let datos = null;



try {
  datos = JSON.parse(sessionStorage.getItem(CLAVE));
} catch {
  sessionStorage.removeItem(CLAVE);
}

const form = document.querySelector("#cita");

if (form) {
  if (datos) {
    form.elements.paciente.value = datos.paciente || "";
    form.elements.correo.value = datos.correo || "";
    form.elements.especialidad.value = datos.especialidad || "";
    form.elements.fecha.value = datos.fecha || "";
    form.elements.horario.value = datos.horario || "";
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const paciente = form.elements.paciente.value.trim();
    const correo = form.elements.correo.value.trim();
    const especialidad = form.elements.especialidad.value;
    const fecha = form.elements.fecha.value;
    const horario = form.elements.horario.value;


    if (!paciente || !correo || !especialidad || !fecha || !horario) {
      alert("Completa todos los campos.");
      return;
    }


    const horarioEspecia = {
      consultagene: ["9:00", "10:00","11:00", "15:00", "16:00"],
      nutricion: ["9:00", "10:00","11:00", "15:00", "16:00"],
      odontologia: ["9:00", "10:00","11:00", "15:00", "16:00"],
    }

    const horarioocupado = ["11:00"]



    datos = {
      paciente,
      correo,
      especialidad,
      fecha,
      horario
    };

    sessionStorage.setItem(CLAVE, JSON.stringify(datos));
    location.href = "confirmar_cita.html";
  });
}

if (pagina === "confirmar" || pagina === "resumen") {
  if (!datos) {
    location.replace("cita.html");
  } else if (pagina === "resumen" && datos.estado !== "confirmado") {
    location.replace("confirmar_cita.html");
  } else {
    document.querySelector("#detalle").textContent = [
      "Paciente: " + datos.paciente,
      "Correo\n: " + datos.correo,
      "Especialidad: " + datos.especialidad,
      "Fecha: " + datos.fecha,
      "Horario: " + datos.horario 

    ].join("\n");

    if (pagina === "confirmar") {
      document.querySelector("#confirmar").addEventListener("click", () => {
        datos.estado = "confirmado";
        sessionStorage.setItem(CLAVE, JSON.stringify(datos));
        location.href = "resumen.html";
      });
    } else {
      document.querySelector("#nuevo").addEventListener("click", () => {
        sessionStorage.removeItem(CLAVE);
        location.href = "cita.html";
      });
    }
  }
}

