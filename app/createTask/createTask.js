import { getTasks } from '../../Apis/apitask.js';
import { postTasks } from '../../Apis/apitask.js';

export class CreateTask extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
    this.clearData();
  }
  render() {
    this.innerHTML = /*html*/`
    <div class="card mt-3">
      <div class="card-header">Registro de Tareas</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="task" class="form-label">Tarea *</label>
                <input type="text" class="form-control" id="task" name="task" aria-describedby="" required>
                <div class="invalid-feedback">* Campo requerido.</div>
              </div>
            </div>
            <div class="row mt-3"></div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              <div class="col">
                <label for="fechaInicio" class="form-label">Fecha de Inicio: *</label>
              </div>
              <div class="col">
                <input type="datetime-local" id="fechaInicio" name="fechaInicio" required>
                <div class="invalid-feedback">* Campo requerido.</div>
              </div>
              <div class="col">
                <label for="fechaFin" class="form-label">Fecha de finalizacion: *</label>
              </div>
              <div class="col">
                <input type="datetime-local" id="fechaFin" name="fechaFin" required>
                <div class="invalid-feedback">* Campo requerido.</div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label for="responsable" class="form-label">Responsable</label>
                <input type="text" class="form-control" id="responsable" name="responsable" aria-describedby="emailHelp">
              </div>
            </div>
            <div class="row mt-3"></div>
            <div class="row mt-3">
              <div class="col">
                <label for="prioridad" class="form-label">Seleccione la priodidad...</label>
                <select class="form-select" id="prioridad" name="prioridad" required aria-label="Default select example">
                  <option selected></option>
                    <option value="Urgente">Urgente</option>
                    <option value="Importante">Importante</option>
                    <option value="Baja Priodidad">Baja Priodidad</option>
                  </select>
                  <div class="invalid-feedback">* Campo requerido.</div>
              </div>
            </div>
            <div class="col">
              <div class="container mt-4 text-center">
              <button type="button" class="btn btn-primary" id="btnGuardar" data-bs-toggle="button">Guardar Registro</button>
              <button type="button" class="btn btn-danger" id="btnCancelar" data-bs-toggle="button">Limpiar registro</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;

  }
  saveData = () => {
    // const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    // console.log(datos);
    // const btnGuardar = this.querySelector('#btnGuardar');
    // let condition;
    // condition = Object.values(datos).some(valor => valor === '');
    // if (condition!==true) {
    //   btnGuardar.removeAttribute('disabled')      
    // }
    const frmRegistro = document.querySelector('#frmDataTask');
    document.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      datos['estado']='1';
      console.log(datos);
      postTasks(datos);
      e.stopImmediatePropagation();
      e.preventDefault();
      alert("Datos guardados correctamente")
    })
  }
  clearData = () => {
    document.querySelector('#btnCancelar').addEventListener("click", (e) => {
      mainContent.innerHTML = "<create-task></create-task>";
      e.stopImmediatePropagation();
      e.preventDefault();
    })
  }
}
customElements.define("create-task", CreateTask);