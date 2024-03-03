export class NavMenu extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/`
    <style rel="stylesheet">
        @import "./app/navMenu/menuStyle.css";
    </style>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Task To Do</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" data-verocultar='["a"]' aria-current="page" href="#">Crear Tarea</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-verocultar='["b"]' href="#">Tareas Pendientes</a>
              </li>
                <li class="nav-item">
                <a class="nav-link" data-verocultar='["c"]' href="#">Tareas Cumplidas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-verocultar='["d"]' href="#">Tareas No Cumplidas</a>
              </li>
            </ul>
          </div>
        </div>
        </nav>
      `;
    this.querySelectorAll('.nav-link').forEach((val, id) => {
      val.addEventListener('click', (e) => {
        let data = JSON.parse(e.target.dataset.verocultar);
        let mainContent = document.querySelector('#mainContent');
        mainContent.innerHTML = '';
        switch (data[0]) {
          case 'a':
            mainContent.innerHTML="<create-task></create-task>";
            break;
          case 'b':
            mainContent.innerHTML = '<task-to-do></task-to-do>'
            break;
          case 'c':
            mainContent.innerHTML = 'ALV si funciono XD 🤯'
            break;
          case 'd':
            mainContent.innerHTML = 'ALV XD 🤯'
            break;
        }
        e.stopImmediatePropagation();
        e.preventDefault();

      })
    });

  }
}
customElements.define("nav-menu", NavMenu)