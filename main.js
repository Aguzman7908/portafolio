const grid = new Muuri('.grid', {
    layout: {
        fillGaps: false,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
    }
});


window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // agregamos los listener de los enlaces para filtrar por categoria
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
       elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            // Ternario si
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`); 
       });
    });

    // agregamos el listener para la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value; // obtener el valor que esta en el input
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda)); // evento de Muuri dataset por cada uno de los item ejecuta el codigo
        // si las etiquetas incluyen la busqueda entonces va a mostrar el elemento.

    })

    // Agrego listener para las imagenes
    const overlay= document.getElementById('overlay'); 
    document.querySelectorAll('.grid .item img').forEach ((elemento) => {
        

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    // Event listener del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    })
    
    // eventlistener del overlay
    overlay.addEventListener('click', (evento) => {
        //overlay.classList.remove('activo')
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })
});