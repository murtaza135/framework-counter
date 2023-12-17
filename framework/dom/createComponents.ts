import { ClassZero } from '../types';

/**
 * Allow custom components to be renderable onto the DOM
 * @param components an object mapping names to components
 */
export function createComponents(components: Record<string, ClassZero<HTMLElement>>) {
  Object.entries(components).forEach(([name, component]) => {
    customElements.define(name, component);
  });
}