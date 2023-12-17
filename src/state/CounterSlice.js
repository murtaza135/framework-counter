import { StateSlice } from 'framework';

export class CounterSlice extends StateSlice {
  constructor() {
    const state = {
      counter: 0
    };

    super(state);
  }

  increment() {
    this.state.counter++;
  }
}
