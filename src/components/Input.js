import { BaseComponent, html } from 'framework';

export class Input extends BaseComponent {
  constructor() {
    super();
    this.inputRef = this.getRef();
    this.text = this.attr("text") ?? "";
    this.type = this.attr("type") ?? "text";
    this.placeholder = this.attr("placeholder") ?? "";
  }

  render() {
    return html`
      <div class="mb-3">
        <label for="${this.inputRef.id}" class="form-label">${this.text}</label>
        <input type="${this.type}" class="form-control" id="${this.inputRef.id}" placeholder="${this.placeholder}">
      </div>
    `;
  }
}
