import { render } from './render';
import onChange from 'on-change';
import { Hole } from 'uhtml';
import { converter as converterFns, Converter } from './converter';
import { StateActions, Transformer, QueryStateValue, MutationStateValue, QueryFunction, MutationFunction } from '../state/state.types';
import { stateManager } from '../state/StateManager';

type Unsubscriber = () => void;

type QueryMethodArgs<T = any> = {
  queryFn: QueryFunction,
  tag: string,
  transformer?: Transformer<T>;
};

type MutationMethodArgs<T = any> = {
  mutationFn: MutationFunction,
  invalidateTags?: string[];
  transformer?: Transformer<T>;
};

export class BaseComponent extends HTMLElement {
  static observedAttributes: string[] = [];

  protected childrenHTML: string;
  private eventListenerUnsubscriberFunctions: Unsubscriber[];
  private stateUnsubscriberFunctions: Unsubscriber[];

  constructor() {
    super();
    this.childrenHTML = this.innerHTML;

    this.eventListenerUnsubscriberFunctions = [];
    this.stateUnsubscriberFunctions = [];
  }

  connectedCallback() {
    this.update();
  }

  disconnectedCallback() {
    this.dehydrate();
    this.unsubscribe();
    this.cleanup();
  }

  attributeChangedCallback() {
    this.update();
  }

  private update() {
    this.dehydrate();
    render(this, this.render());
    this.hydrate();
    this.effect();
  }

  private dehydrate() {
    this.eventListenerUnsubscriberFunctions.forEach(fn => fn());
    this.eventListenerUnsubscriberFunctions.splice(0);
  }

  private unsubscribe() {
    this.stateUnsubscriberFunctions.forEach(fn => fn());
    this.stateUnsubscriberFunctions.splice(0);
  }

  /**
   * Add an event listener to a particular element after rendering the component.
   * This method will handle the automatic removal of the event listener for you
   * upon the unmounting of the component from the DOM.
   * @param element the element to which the listener should be attached
   * @param event 
   * @param handler
   * @param options 
   */
  protected addEventListenerToElement(
    element: Element,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined,
  ) {
    element.addEventListener(event, handler, options);
    const unsubscribe = () => element.removeEventListener(event, handler, options);
    this.eventListenerUnsubscriberFunctions.push(unsubscribe);
  }

  /**
   * Retrieve an attribute associated with this component.
   * @param name the name of the attribute
   * @param converter since all attributes are string values, a optional converter function can be passed in to convert the attribute to a particular form
   */
  protected attr<T extends any>(name: string): string | undefined;
  protected attr<T extends any>(name: string, converter: Converter<T>): T | undefined;
  protected attr<T extends any>(name: string, converter?: Converter<T>): string | T | undefined {
    const attrValue = this.getAttribute(name);
    const converterFn = converter ?? converterFns.string;
    return attrValue ? converterFn(attrValue) : undefined;
  }

  /**
   * Create some local state that will re-render the component when changed
   * @param initial the initial value
   * @returns the state object
   */
  protected state<T>(initial: T) {
    const state = onChange({ state: initial }, () => this.update());
    const unsubscribe = () => onChange.unsubscribe(state);
    this.stateUnsubscriberFunctions.push(unsubscribe);
    return state;
  }

  /**
   * Subscribe to some precreated global state slice. The subscription will ensure that the component will re-render when the state changes.
   * @param name the name of the precreated global state slice
   * @returns an object that contains the state and actions to manipulate that state
   */
  protected slice(name: string) {
    const slice = stateManager.slice(name);
    const unsubscribe = slice.subscribe(() => this.update());
    this.stateUnsubscriberFunctions.push(unsubscribe);
    return {
      state: slice.state,
      actions: slice as StateActions,
    } as const;
  }

  /**
   * Subscribe to query that will fetch server data and re-render the component whenever it becomes outdated.
   * @param object object containing a queryFn, tag, and optional transformer
   * @returns an object that contains the query state and a refetch action
   */
  protected query<T = any>({ queryFn, tag, transformer }: QueryMethodArgs<T>) {
    const subscriber = () => this.update();
    const { query, refetch, unsubscribe } = stateManager.query({ queryFn, tag, subscriber, transformer });
    this.stateUnsubscriberFunctions.push(unsubscribe);
    return {
      state: query.state as QueryStateValue<T>,
      actions: { refetch },
    } as const;
  }

  /**
   * Subscribe to mutation that will mutate server data and re-render the component whenever data changes.
   * @param object object containing a mutationFn, invalidateTags, and optional transformer
   * @returns an object that contains the mutation state and a mutate action
   */
  protected mutation<T = any>({ mutationFn, invalidateTags, transformer }: MutationMethodArgs<T>) {
    const subscriber = () => this.update();
    const { mutation, mutate, unsubscribe } = stateManager.mutation({ mutationFn, subscriber, invalidateTags, transformer });
    this.stateUnsubscriberFunctions.push(unsubscribe);
    return {
      state: mutation.state as MutationStateValue<T>,
      actions: { mutate }
    } as const;
  }

  /**
   * generate a random ID in order to give html tags an ID
   * @param name optional name of tag
   * @returns random ID
   */
  protected generateId(name?: string) {
    if (name) {
      return `${name}-${crypto.randomUUID()}`;
    } else {
      return `${this.constructor.name}-${crypto.randomUUID()}`;
    }
  }

  /**
   * Returns html to be rendered to the DOM
   * @returns html
   */
  public render(): Hole {
    /* required: must be implemented by subclasses */
    throw new Error("Must implement render method");
  }

  /**
   * Hydrates the html that was rendered onto the DOM
   */
  protected hydrate() {
    /* optional: can be implemented by subclasses */
  }

  /**
   * Additional logic that should be run after rendering
   */
  protected effect() {
    /* optional: can be implemented by subclasses */
  }

  /**
   * Any cleanup logic that should be run before unmouting of the component
   */
  protected cleanup() {
    /* optional: can be implemented by subclasses */
  }
}
