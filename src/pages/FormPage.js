import { BaseComponent, html, converter } from 'framework';

export class FormPage extends BaseComponent {
  constructor() {
    super();
    this.inputRef1 = this.ref();
    this.inputRef2 = this.ref();
    this.formRef = this.ref();
  }

  render() {
    return html`
      <div class="container pt-5 d-flex flex-column justify-content align-items-center gap-5">
        <form id="${this.formRef.id}" class="d-flex flex-column justify-content align-items-center gap-1">
          <x-input id="${this.inputRef1.id}" type="email" text="Email" placeholder="ab123@gmail.com" />
          <x-input id="${this.inputRef2.id}" type="password" text="Password" placeholder="123456" />
          <button class="btn btn-primary w-100 mt-3" type="submit">Submit</button>
        </form>

        <div class="d-flex flex-column gap-3 align-items-center justify-content-center">
          <custom-link href="/" text="Go to main page" />
          <custom-link href="/two" text="Go to page two" />
        </div>
      </div>
    `;
  }

  hydrate() {
    this.addEventListenerToElement(this.formRef.element, "submit", (event) => {
      event.preventDefault();
      console.log(this.inputRef1.element.value);
      console.log(this.inputRef2.element.value);
    });
  }
}
