import { render, html } from 'lit-html/lib/lit-extended';

export class Todos extends HTMLElement {
  constructor() {
    super();
    this.todos = [];
  }

  set todos(todos) {
    this._todos = todos;
    this.invalidate();
  }

  get todos() {
    return this._todos;
  }

  invalidate() {
    if (!this._isRendering) {
      this._isRendering = true;
      Promise.resolve().then(() => {
        this.render();
        this._isRendering = false;
      })
    }
  }

  render() {
    render(html`
      <h1>Todos</h1>
      <form on-submit="${(e) => this.onSubmitNewTodoForm(e)}">
        <input type="text" name="title" />
        <button type="submit">Add</button>
      </form>
      <div>
        ${this.todos.map((todo) => html`
          <dy-todo-item
            todo="${todo}"
            on-toggle="${() => this.toggleTodo(todo)}"
            on-remove="${() => this.removeTodo(todo)}"
          ></dy-todo-item>
        `)}
      </div>
    `, this);
  }

  onSubmitNewTodoForm(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.title;
    this.addTodo(input.value);
    input.value = '';
  }

  addTodo(title) {
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
