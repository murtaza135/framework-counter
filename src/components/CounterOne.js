import { BaseComponent, html, converter } from 'framework';

/**
 * use local state to increment a counter,
 * local state will be lost upon component dismount,
 * (for example, a component will always dismount when changing pages)
 */
export class CounterOne extends BaseComponent {
  constructor() {
    super();
    this.counter = this.state(0);
    this.buttonId = this.generateId();
  }

  render() {
    return html`
      <div class="border border-2 py-3 px-4 rounded d-flex gap-4 align-items-center">
        <p class="fs-4 m-0 border border-2 px-2 py-0 rounded">${this.counter.state}</p>

        <!-- click handler directly on button -->
        <button class="btn btn-light" @click="${() => this.increment()}">+</button>

        <!-- add an ID, and then add click handler through event listener in the hydrate method -->
        <button class="btn btn-light" id="${this.buttonId}">+</button>
      </div>
    `;
  }

  hydrate() {
    const button = this.querySelector(`#${this.buttonId}`);
    this.addEventListenerToElement(button, "click", () => this.increment());
  }

  increment() {
    this.counter.state++;
  }
}
