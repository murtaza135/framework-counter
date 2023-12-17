import { BaseComponent, html, converter } from 'framework';

export class CustomLink extends BaseComponent {
  constructor() {
    super();
    this.href = this.attr("href");
    this.text = this.attr("text");
  }

  render() {
    return html`
      <x-link href="${this.href}" class="btn btn-light fs-3 px-3">${this.text}</x-link>
    `;
  }
}
