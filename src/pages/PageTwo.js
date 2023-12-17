import { BaseComponent, html, converter } from 'framework';

export class PageTwo extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container pt-5 d-flex flex-column justify-content align-items-center gap-5">
        <counter-one />
        <counter-two />
        <counter-three />
        <custom-link href="/" text="Go to main page" />
      </div>
    `;
  }
}
