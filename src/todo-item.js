import { render, html } from 'lit-html/lib/lit-extended';
import styles from "./todo-item.css";

export class TodoItem extends HTMLElement {
  set title(newTitle) {
    this.setAttribute('title', newTitle);
  }

  get title() {
    return this.getAttribute('title');
  }

  set completed(newCompleted) {
    if (newCompleted) {
      this.setAttribute('completed', '');
    } else {
      this.removeAttribute('completed');
    }
  }

  get completed () {
    return this.hasAttribute('completed');
  }

  static get observedAttributes() {
    return ['title', 'completed'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    render(html`
      <div class$="${styles.todoItem}">
        <span class$="${styles.title} ${this.completed ? styles.isCompleted : ''}">
          ${this.title}
        </span>
        <button on-click="${() => this.onClickToggle()}">✓</button>
        <button on-click="${() => this.onClickRemove()}">x</button>
      </div>
    `, this);
  }

  onClickToggle() {
    this.dispatchEvent(new CustomEvent('toggle'));
  }

  onClickRemove() {
    this.dispatchEvent(new CustomEvent('remove'));
  }
}
