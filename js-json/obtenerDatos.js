document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productoSeleccionado = urlParams.get("id");

  if (productoSeleccionado) {
    await loadData(productoSeleccionado);
  } else {
    console.error("No se ha especificado el ID del producto.");
  }
});

const loadData = async (productoSeleccionado) => {
  try {
    const response = await axios.get("js-json/datos.json");
    const datos = response.data;

    const titulo = document.getElementById("titulo");
    const pie = document.getElementById("pie");
    const subtitulo1 = document.getElementById("subtitulo1");
    const caracteristicasList = document.getElementById("caracteristicas");
    const subtitulo2 = document.getElementById("subtitulo2");
    const img1 = document.getElementById("producto-img1");
    const img2 = document.getElementById("producto-img2");
    const img3 = document.getElementById("producto-img3");
    const img4 = document.getElementById("producto-img4");

    if (datos[productoSeleccionado] && datos[productoSeleccionado].length > 0) {
      const producto = datos[productoSeleccionado][0];

      if (titulo)
        titulo.textContent = producto.titulo || "Título no disponible";
      if (pie) pie.textContent = producto.pie || "Texto no disponible";

      if (subtitulo1)
        subtitulo1.textContent =
          producto.subtitulo1 || "Subtítulo 1 no disponible";
      if (caracteristicasList) {
        caracteristicasList.innerHTML = "";
        for (const [key, value] of Object.entries(producto.caracteristicas)) {
          const li = document.createElement("li");
          li.textContent = value;
          caracteristicasList.appendChild(li);
        }
      }

      if (subtitulo2)
        subtitulo2.textContent =
          producto.subtitulo2 || "Subtítulo 2 no disponible";

      // Actualizar imagen del producto
      if (img1) img1.src = producto.img.img1 || "";
      if (img2) img2.src = producto.img.img2 || "";
      if (img3) img3.src = producto.img.img3 || "";
      if (img4) img4.src = producto.img.img4 || "";

      // Cargar medidas
      document.getElementById("medidas.alto.ln_1").textContent =
        producto.medidas.alto.ln_1 || "";
      document.getElementById("medidas.alto.ln_2").textContent =
        producto.medidas.alto.ln_2 || "";
      document.getElementById("medidas.alto.ln_3").textContent =
        producto.medidas.alto.ln_3 || "";
      document.getElementById("medidas.ancho.an_1").textContent =
        producto.medidas.ancho.an_1 || "";
      document.getElementById("medidas.ancho.an_2").textContent =
        producto.medidas.ancho.an_2 || "";
      document.getElementById("medidas.ancho.an_3").textContent =
        producto.medidas.ancho.an_3 || "";
      document.getElementById("medidas.profundidad.pn_1").textContent =
        producto.medidas.profundidad.pn_1 || "";
      document.getElementById("medidas.profundidad.pn_2").textContent =
        producto.medidas.profundidad.pn_2 || "";
      document.getElementById("medidas.profundidad.pn_3").textContent =
        producto.medidas.profundidad.pn_3 || "";
      document.getElementById("medidas.herraje.hn_1").textContent =
        producto.medidas.herraje.hn_1 || "";
      document.getElementById("medidas.herraje.hn_2").textContent =
        producto.medidas.herraje.hn_2 || "";
      document.getElementById("medidas.herraje.hn_3").textContent =
        producto.medidas.herraje.hn_3 || "";

      //productos
      if (producto.productos) {
        const barba1 = producto.productos.barba1;
        const barba2 = producto.productos.barba2;
        const barba3 = producto.productos.barba3;

        // Obtiene los IDs
        const idBarba1 = barba1.id;
        const idBarba2 = barba2.id;
        const idBarba3 = barba3.id;

        // Obtiene los link
        const linkBarba1 = barba1.link;
        const linkBarba2 = barba2.link;
        const linkBarba3 = barba3.link;

        // Asigna los IDs a los atributos data-item-id en HTML
        document
          .getElementById("producto-id-barba1")
          .setAttribute("data-item-id", idBarba1);
        document
          .getElementById("producto-id-barba2")
          .setAttribute("data-item-id", idBarba2);
        document
          .getElementById("producto-id-barba3")
          .setAttribute("data-item-id", idBarba3);

        // Asigna los links a los atributos href en HTML
        document
          .getElementById("producto-link-barba1")
          .setAttribute("href", linkBarba1);
        document
          .getElementById("producto-link-barba2")
          .setAttribute("href", linkBarba2);
        document
          .getElementById("producto-link-barba3")
          .setAttribute("href", linkBarba3);
      }

      if (producto.accesorios) {
        const ac1 = producto.accesorios.ac_1;
        const ac2 = producto.accesorios.ac_2;
        const ac3 = producto.accesorios.ac_3;
      
        // Verificar si los accesorios están definidos
        if (ac1 && ac2 && ac3) {
          // Obtiene los IDs
          const idac1 = ac1.precio;
          const idac2 = ac2.precio;
          const idac3 = ac3.precio;
      
          // Obtiene los links
          const linkac1 = ac1.link;
          const linkac2 = ac2.link;
          const linkac3 = ac3.link;
      
          // Asigna los IDs a los atributos data-item-id en HTML
          const idElementAc1 = document.getElementById("accesorio-id-ac1");
          const idElementAc2 = document.getElementById("accesorio-id-ac2");
          const idElementAc3 = document.getElementById("accesorio-id-ac3");
      
          if (idElementAc1) idElementAc1.setAttribute("data-item-id", idac1);
          if (idElementAc2) idElementAc2.setAttribute("data-item-id", idac2);
          if (idElementAc3) idElementAc3.setAttribute("data-item-id", idac3);
      
          // Asigna los links a los atributos href en HTML
          const linkElementAc1 = document.getElementById("accesorio-link-ac1");
          const linkElementAc2 = document.getElementById("accesorio-link-ac2");
          const linkElementAc3 = document.getElementById("accesorio-link-ac3");
      
          if (linkElementAc1) linkElementAc1.setAttribute("href", linkac1);
          if (linkElementAc2) linkElementAc2.setAttribute("href", linkac2);
          if (linkElementAc3) linkElementAc3.setAttribute("href", linkac3);
        } else {
          console.error("Algunos accesorios no están definidos en los datos.");
        }
      } else {
        console.error("No se encontraron accesorios en los datos del producto.");
      }

    } else {
      console.error("Producto seleccionado no encontrado en los datos.");
    }
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
};
