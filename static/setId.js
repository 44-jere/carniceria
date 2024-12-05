document.addEventListener("DOMContentLoaded", function() {
    // Obtener los valores de phone y email desde el Local Storage
    const phone = localStorage.getItem("phone");
    const email = localStorage.getItem("email");

    // Verificar que los valores no sean nulos o vacíos
    if (phone && email) {
      // Crear el cuerpo de la solicitud
      const data = { phone: phone, email: email };

      // Enviar una solicitud POST al backend en /setID
      fetch('/setID', {
        method: 'POST', // Método de la solicitud
        headers: {
          'Content-Type': 'application/json' // Tipo de contenido
        },
        body: JSON.stringify(data) // Convertir el cuerpo de la solicitud a JSON
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {

      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    } else {
      console.error('Phone or email is missing in Local Storage.');
    }
  });
