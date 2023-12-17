import { BaseComponent, html, converter } from 'framework';
import { counterQuery } from '@/api/counterQuery';
import { counterIncrementMutation } from '@/api/counterIncrementMutation';

/**
 * use server state to increment a counter,
 * server state will be persistent across page changes and refreshing/reloading,
 * to view server state, you use a `query`, and to change server state, you use a `mutation`
 */
export class CounterThree extends BaseComponent {
  constructor() {
    super();
    this.counter = this.query(counterQuery());
    this.counterMutation = this.mutation(counterIncrementMutation());
  }

  render() {
    if (this.counter.state.status === "loading") {
      return html`Loading...`;
    }

    return html`
      <div class="border border-2 py-3 px-4 rounded d-flex gap-4 align-items-center">
        <p class="fs-4 m-0 border border-2 px-2 py-0 rounded">${this.counter.state.data}</p>
        <button class="btn btn-light" @click="${() => this.increment()}">+</button>
      </div>
    `;
  }

  increment() {
    const newValue = this.counter.state.data + 1;
    this.counterMutation.actions.mutate(newValue);
  }
}
