import { history } from './history';
import { BaseComponent } from '../dom/BaseComponent';
import { html } from '../dom/html';

export class Navigate extends BaseComponent {
  static observedAttributes = ["to"];
  private to?: string;

  constructor() {
    super();
    this.to = this.attr("to", String);
    console.log("lol");
  }

  render() {
    return html``;
  }

  effect() {
    if (!this.to)
      throw new Error("Must provide the 'to' attribute to be able to navigate");
    history.replace(this.to);
  }
}

customElements.define('x-navigate', Navigate);