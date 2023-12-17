import { stateManager } from 'framework';
import { CounterSlice } from '@/state/CounterSlice';

stateManager.createSlices({
  "counter": CounterSlice
});
