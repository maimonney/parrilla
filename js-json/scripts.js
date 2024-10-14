document.addEventListener("DOMContentLoaded", function() {
    // Código para producto
    var productoLink = document.getElementById("producto-link");
    var productoMenu = document.getElementById("producto-menu");

    if (productoLink && productoMenu) {
        productoLink.addEventListener("click", function(event) {
            event.preventDefault();
            productoMenu.classList.toggle("show");
        });

        document.addEventListener("click", function(event) {
            if (!productoLink.contains(event.target) && !productoMenu.contains(event.target)) {
                productoMenu.classList.remove("show");
            }
        });
    }

    // Aparición de texto
    const containers = document.querySelectorAll('.conteinertienda, .conteinerinfo');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        containers.forEach(container => {
            const elementTop = container.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                container.classList.add('visible');
            } else {
                container.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 

    // Código para galería de imágenes
    const galleryNames = document.querySelectorAll('.galeria-name');
    const images = document.querySelectorAll('.gallleryprducts img');

    galleryNames.forEach(name => {
        name.addEventListener('mouseover', () => {
            const index = name.getAttribute('data-img');
            images.forEach((img, i) => {
                img.classList.toggle('show', i == index);
            });
        });
    });

    // Asegúrate de que maingallery esté presente antes de agregar el listener
    const maingallery = document.querySelector('.maingallery');
    if (maingallery) {
        maingallery.addEventListener('mouseleave', () => {
            images.forEach((img, i) => {
                img.classList.toggle('show', i == 0);
            });
        });
    }

    // Nav: overlay del ul
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            const menuwrap = document.querySelector('.menuwrap');
            document.getElementById('menu').classList.add('hidden');
            overlay.classList.add('hidden');
            menuwrap.classList.remove('no-scroll');
        });
    }

    // Scroll btn
    var scroll_btn = document.getElementById('scroll_btn');
    if (scroll_btn) {
        scroll_btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    //Obtener token de acceso
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            console.error('No se encontró el refresh token.');
            return;
        }
  
        try {
            const response = await fetch('https://api.mercadolibre.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: '4323246973136745',
                    client_secret: 'cO9aKV3GMdA2h9aAbMRs5BcFM5IICFkl'
                })
            });
            const data = await response.json();
            // console.log('Token de acceso renovado:', data.access_token);
            localStorage.setItem('access_token', data.access_token);
        } catch (error) {
            console.error('Error al obtener el token:', error);
        }
    };
  
    //Renovación periódica del token (cada 24 horas)
    setInterval(refreshAccessToken, 24 * 60 * 60 * 1000); 
  
    //Oobtener el token
    const getInitialToken = async () => {
        try {
            const response = await fetch('https://api.mercadolibre.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: '4323246973136745',
                    client_secret: 'cO9aKV3GMdA2h9aAbMRs5BcFM5IICFkl'
                })
            });
            const data = await response.json();
            // console.log('Token de acceso inicial:', data.access_token);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('token_expiration', Date.now() + data.expires_in * 1000); // Expiración en milisegundos
        } catch (error) {
            console.error('Error al obtener el token:', error);
        }
    };
  

    getInitialToken();
});





function toggleSpecs() {
    const specs = document.getElementById("specs");
    specs.classList.toggle("show");
}
















// Obtener todos los elementos con la clase 'dropdown-item'
var dropdownItems = document.querySelectorAll('.dropdown-item');

// Agregar eventos de mouseover y mouseout para controlar la animación
dropdownItems.forEach(function(item) {
    var img = item.querySelector('img');
    
    // Cuando se pasa el cursor, mostrar la imagen
    item.addEventListener('mouseenter', function() {
        img.classList.remove('hover-out');
    });
    
    // Cuando el cursor sale, esconder la imagen con animación inversa
    item.addEventListener('mouseleave', function() {
        img.classList.add('hover-out');
    });
});



// ------------------------------------------------------Esto causa error
// Función para cambiar las imágenes al hacer hover
function cambiarImagenAlHover(id, imgAbierto, imgCerrado) {
    const imagen = document.getElementById(id);
    
    // Verificamos que la imagen exista
    if (!imagen) {
        console.error(`Elemento con ID "${id}" no encontrado.`);
        return;
    }

    imagen.addEventListener('mouseover', function() {
        imagen.src = imgCerrado; // Cambia a la imagen "cerrado"
    });

    imagen.addEventListener('mouseout', function() {
        imagen.src = imgAbierto; // Vuelve a la imagen "abierto"
    });
}

// Aplicamos la función a cada una de las imágenes
cambiarImagenAlHover('img1', 'img/abierto1.jpg', 'img/cerrado1.jpg');
cambiarImagenAlHover('img2', 'img/abierto2.jpg', 'img/cerrado2.jpg');
cambiarImagenAlHover('img3', 'img/abierto3.jpg', 'img/cerrado3.jpg');
cambiarImagenAlHover('img4', 'img/abierto4.jpg', 'img/cerrado4.jpg');

//QBO
const qboCarbon = document.getElementById('qbo-carbon');
if (qboCarbon) {
    qboCarbon.addEventListener('click', function() {
        const section = document.getElementById('qbo-c');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "qbo-c" no encontrada.');
        }
    });
}

const qboGas = document.getElementById('qbo-gas');
if (qboGas) {
    qboGas.addEventListener('click', function() {
        const section = document.getElementById('qbo-g');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "qbo-g" no encontrada.');
        }
    });
}

const qbotCard = document.getElementById('qbot-card');
if (qbotCard) {
    qbotCard.addEventListener('click', function() {
        const section = document.getElementById('qbot-c');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "qbot-c" no encontrada.');
        }
    });
}

const qbitCard = document.getElementById('qbit-card');
if (qbitCard) {
    qbitCard.addEventListener('click', function() {
        const section = document.getElementById('qbito');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "qbito" no encontrada.');
        }
    });
}


function cambiarImagenAlHover(id, imgAbierto, imgCerrado) {
    const imagen = document.getElementById(id);
    
    // Verificamos que la imagen exista
    if (!imagen) {
        console.error(`Elemento con ID "${id}" no encontrado.`);
        return;
    }

    imagen.addEventListener('mouseover', function() {
        imagen.src = imgCerrado; // Cambia a la imagen "cerrado"
    });

    imagen.addEventListener('mouseout', function() {
        imagen.src = imgAbierto; // Vuelve a la imagen "abierto"
    });
}


cambiarImagenAlHover('imgFlama1', 'img/flama_abierto1.jpg', 'img/flama_cerrado1.jpg');
cambiarImagenAlHover('imgFlama2', 'img/flama_abierto2.jpg', 'img/flama_cerrado2.jpg');
cambiarImagenAlHover('imgFlama3', 'img/flama_abierto3.jpg', 'img/flama_cerrado3.jpg');


const flama1 = document.getElementById('flama1');
if (flama1) {
    flama1.addEventListener('click', function() {
        const section = document.getElementById('f1');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "f1" no encontrada.');
        }
    });
}

const flama2 = document.getElementById('flama2');
if (flama2) {
    flama2.addEventListener('click', function() {
        const section = document.getElementById('f2');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "f2" no encontrada.');
        }
    });
}

const flama3 = document.getElementById('flama3');
if (flama3) {
    flama3.addEventListener('click', function() {
        const section = document.getElementById('f3');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "f3" no encontrada.');
        }
    });
}

function cambiarImagenAlHover(id, imgAbierto, imgCerrado) {
    const imagen = document.getElementById(id);
    
    // Verificamos que la imagen exista
    if (!imagen) {
        console.error(`Elemento con ID "${id}" no encontrado.`);
        return;
    }

    imagen.addEventListener('mouseover', function() {
        imagen.src = imgCerrado; // Cambia a la imagen "cerrado"
    });

    imagen.addEventListener('mouseout', function() {
        imagen.src = imgAbierto; // Vuelve a la imagen "abierto"
    });
}

// Aplicamos la función a cada una de las imágenes de la familia Barba
cambiarImagenAlHover('imgBarba1', 'img/barba_abierto1.jpg', 'img/barba_cerrado1.jpg');
cambiarImagenAlHover('imgBarba2', 'img/barba_abierto2.jpg', 'img/barba_cerrado2.jpg');
cambiarImagenAlHover('imgBarba3', 'img/barba_abierto3.jpg', 'img/barba_cerrado3.jpg');

// Eventos de clic para las tarjetas de familia Barba
const barba1 = document.getElementById('barba1');
if (barba1) {
    barba1.addEventListener('click', function() {
        const section = document.getElementById('b1');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "b1" no encontrada.');
        }
    });
}

const barba2 = document.getElementById('barba2');
if (barba2) {
    barba2.addEventListener('click', function() {
        const section = document.getElementById('b2');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "b2" no encontrada.');
        }
    });
}

const barba3 = document.getElementById('barba3');
if (barba3) {
    barba3.addEventListener('click', function() {
        const section = document.getElementById('b3');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Sección "b3" no encontrada.');
        }
    });
}




//Obtener precios
const obtenerPrecios = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('No se encontró el token de acceso.');
        return;
    }

    try {
        const items = document.querySelectorAll('p[data-item-id]');

        for (const item of items) {
            const itemId = item.getAttribute('data-item-id');
            const precioElemento = item.querySelector('.precio-modelo');

            if (!precioElemento) {
                console.error(`Elemento de precio no encontrado para el itemId ${itemId}`);
                continue;
            }

            try {
                const response = await axios.get(`https://api.mercadolibre.com/items/${itemId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && response.data.price) {
                    console.log(response.data); 
                    precioElemento.textContent = `$${response.data.price}`;
                } else {
                    console.error(`Precio no disponible para el itemId ${itemId}`);
                    precioElemento.textContent = 'Precio no disponible';
                }
            } catch (error) {
                console.error(`Error al obtener el precio del producto ${itemId}:`, error);
                precioElemento.textContent = 'Error al obtener el precio';
            }
        }
    } catch (error) {
        console.error('Error al obtener los precios:', error);
    }

};

window.onload = obtenerPrecios;
