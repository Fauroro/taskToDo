import { getTasks } from '../../apis/apitask.js';
import { putTasks } from '../../apis/apitask.js';
import { postTasks } from '../../apis/apitask.js';

export class taskToDo extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.saveData();
  }

  connectedCallback() {
    this.loadDataAndRender();
  }

  async loadDataAndRender() {
    let data = await this.loadData();
    const btnGuardar = this.querySelector('#btnGuardar');
    let condition;
    if (condition = data.some(item => item.estado === '1')) {
      btnGuardar.style.display = 'inline-block';
      const fechaActual = new Date();
      data.forEach(item => {
        let fechaFin = new Date(item.fechaFin);
        if (fechaFin < fechaActual) {
          item.estado = '3';
        }
      });
      this.crearCard(data);
      document.querySelector('#btnGuardar').addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        this.saveData(data);
      });
    } else {
      btnGuardar.style.display = 'none';
    }
  }

  async loadData() {
    let tasks = await getTasks();
    return tasks;
  }

  crearCard(data) {
    const cardContainer = this.querySelector('.row-cols-1.row-cols-md-3.g-4');
    cardContainer.innerHTML = '';
    data.forEach(item => {

      if (item.estado === '1') {
        let task = item.task;
        let id = item.id;
        const cardCol = document.createElement('div');
        cardCol.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = task;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = `
          <br><strong>Fecha de Inicio: </strong> ${item.fechaInicio} <br>
          <strong>Fecha de Finalizacion: </strong> ${item.fechaFin}<br>
          <strong>Responsable: </strong> ${item.responsable}<br>
          <strong>Prioridad: </strong> ${item.prioridad}<br>
          `

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const divSwitch = document.createElement("div");
        divSwitch.classList.add('form-check', 'form-switch');

        const labelSwitch = document.createElement('label');
        labelSwitch.classList.add('form-check-label');
        labelSwitch.setAttribute('for', id);
        labelSwitch.textContent = 'Tarea Finalizada'

        const inputSwitch = document.createElement('input');
        inputSwitch.classList.add('form-check-input', id)
        inputSwitch.setAttribute('id', id);
        inputSwitch.setAttribute('type', 'checkbox');
        inputSwitch.setAttribute('role', 'switch');

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        divSwitch.appendChild(labelSwitch);
        divSwitch.appendChild(inputSwitch);
        cardFooter.appendChild(divSwitch);
        card.appendChild(cardFooter);
        cardCol.appendChild(card);
        cardContainer.appendChild(cardCol);
      }
    });
  };


  render() {
    this.innerHTML = /*html*/`
      <div class="card mt-3">
        <div class="card-header">Tareas Pendientes</div>
          <div class="card-body">
            <div class="row row-cols-1 row-cols-md-3 g-4">
              <br>No se tienen tareas pendientes
            </div>
            <div class="container mt-4 text-center">
              <button type="button" class="btn btn-primary" id="btnGuardar" data-bs-toggle="button">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  saveData = (data) => {
    data.forEach(item => {
      if (item.estado === "1") {
        const idCheck = this.getElementsByClassName(`${item.id}`);
        if (idCheck[0].checked) {
          item.estado = '2';
        }
      }
      putTasks(item, item.id);
    });
    mainContent.innerHTML = '<task-to-do></task-to-do>'
  }
}

customElements.define("task-to-do", taskToDo);