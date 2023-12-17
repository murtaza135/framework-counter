import { BaseComponent, html, converter } from 'framework';

/**
 * use global state to increment a counter,
 * global state will be lost upon refreshing or reloading the application,
 * (for example, global state will NOT be lost when changing pages, but will be lost when refreshing the page)
 */
export class CounterTwo extends BaseComponent {
  constructor() {
    super();
    this.counter = this.slice("counter");
  }

  render() {
    return html`
      <div class="border border-2 py-3 px-4 rounded d-flex gap-4 align-items-center">
        <p class="fs-4 m-0 border border-2 px-2 py-0 rounded">${this.counter.state.counter}</p>
        <button class="btn btn-light" @click="${() => this.counter.actions.increment()}">+</button>
      </div>
    `;
  }
}
