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
