import { render, html } from 'lit-html/lib/lit-extended';
import styles from "./todo-item.css";

export class TodoItem extends HTMLElement {
  set todo(todo) {
    this._todo = todo;
    this.invalidate();
  }

  get todo() {
    return this._todo;
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
    if (this.todo) {
      render(html`
        <div class$="${styles.todoItem}">
          <span class$="${styles.title} ${this.todo.completed ? styles.isCompleted : ''}">
            ${this.todo.title}
          </span>
          <button on-click="${() => this.onClickToggle()}">✓</button>
          <button on-click="${() => this.onClickRemove()}">x</button>
        </div>
      `, this);
    } else {
      this.innerHTML = '';
    }
  }

  onClickToggle() {
    this.dispatchEvent(new CustomEvent('toggle'));
  }

  onClickRemove() {
    this.dispatchEvent(new CustomEvent('remove'));
  }
}
