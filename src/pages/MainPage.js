import { BaseComponent, html, converter } from 'framework';

export class MainPage extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container pt-5 d-flex flex-column justify-content align-items-center gap-5">
        <counter-one />
        <counter-two />
        <counter-three />

        <div class="d-flex gap-2">
          <custom-link href="/two" text="Page Two" />
          <custom-link href="/form" text="Form Page" />
        </div>
      </div>
    `;
  }
}
