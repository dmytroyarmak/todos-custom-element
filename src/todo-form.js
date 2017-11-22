import { render, html } from 'lit-html/lib/lit-extended';
import styles from './todo-form.css';

export class TodoForm extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    render(html`
        <form class$="${styles.todoForm}" on-submit="${(e) => this.onSubmitNewTodoForm(e)}">
            <input class$="${styles.titleInput} type="text" name="title" />
            <button type="submit">Add</button>
        </form>
    `, this);
  }

  onSubmitNewTodoForm(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.title;
    if (input.value) {
      this.dispatchEvent(new CustomEvent('add', {
        detail: {
          title: input.value
        }
      }));
      input.value = '';
    }
  }
}
