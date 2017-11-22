import { render, html } from 'lit-html/lib/lit-extended';
import styles from './todo-app.css';

export class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.todos = [];
  }

  set todos(todos) {
    this._todos = todos;
    this.render();
  }

  get todos() {
    return this._todos;
  }

  render() {
    render(html`
      <div class$="${styles.todoApp}">
        <h1>Todos</h1>

        <todo-form
          on-add="${(e) => this.addTodo(e.detail.title)}"
        ></todo-form>

        ${this.todos.map((todo) => html`
          <todo-item
            title="${todo.title}"
            completed="${todo.completed}"
            on-toggle="${() => this.toggleTodo(todo)}"
            on-remove="${() => this.removeTodo(todo)}"
          ></todo-item>
        `)}
      </div>
    `, this);
  }

  addTodo(title) {
    console.log(title);
    this.todos = [
      ...this.todos,
      { title, completed: false }
    ];
  }

  removeTodo(todoToRemove) {
    this.todos = this.todos.filter((todo) => todo !== todoToRemove);
  }

  toggleTodo(todoToToggle) {
    this.todos = this.todos.map((todo) => {
      if (todo === todoToToggle) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      } else {
        return todo;
      }
    })
  }
}
