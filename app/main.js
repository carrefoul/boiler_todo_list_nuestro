import { tareas } from '../assets/data/tareas.js';

window.onload = () => {
    let lista = document.querySelector("#lista");
    let idContador = 1;

    function renderizarTareas() {
        lista.innerHTML = '';
        tareas.forEach((tarea) => {
            let elem = `
                <li class="lista_elemento" id="${tarea.id}">
                    <p>${tarea.titulo}</p>
                    <button class="btn_cerrar">X</button>
                </li>
            `;
            lista.innerHTML += elem;
        });
    }

    function crearModal() {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <input type="text" id="nuevaTareaInput" placeholder="Nueva tarea">
                <button id="agregarNuevaTareaBtn">Añadir</button>
            </div>
        `;
        document.body.appendChild(modal);

        let agregarNuevaTareaBtn = modal.querySelector('#agregarNuevaTareaBtn');
        agregarNuevaTareaBtn.addEventListener('click', () => {
            let nuevoTitulo = document.querySelector('#nuevaTareaInput').value.trim();
            if (nuevoTitulo !== '') {
                const nuevaTarea = {
                    id: idContador++,
                    titulo: nuevoTitulo
                };
                tareas.push(nuevaTarea);
                renderizarTareas();
                document.querySelector('#nuevaTareaInput').value = '';
            }
        });

        return modal;
    }

    crearModal();

    renderizarTareas();

    lista.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn_cerrar')) {
            let tareaId = event.target.parentElement.id;
            tareas = tareas.filter(tarea => tarea.id != tareaId);
            renderizarTareas();
        }
    });
};
