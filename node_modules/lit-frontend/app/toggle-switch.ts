import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("toggle-switch")
export class ToggleSwitchElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  on: boolean = false;

  render() {
    return html`<label>
      <slot>Label</slot>
      <span class="slider">
        <input type="checkbox" @change=${this._handleChange} />
      </span>
    </label>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: 3px;
      line-height: 2em;
    }
    .slider {
      display: inline-block;
      border: 1px solid black;
      border-radius: 0.75em;
      background-color: white;
      height: 1.3em;
      width: 2.75em;
      position: relative;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    .slider:has(input:checked) {
      background-color: black;

    }
    input {
      appearance: none;
      background-color: black;
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      vertical-align: center;
      position: absolute;
      left: 0;
      transition: left 0.3s, background-color 0.3s;
      
      cursor: pointer;
    }
    input:checked {
      left: 1.5em;
      background-color: white;
      transition: left 0.3s, background-color 0.3s;
    }
  `;

  _handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;;
    this.on = target?.checked;
    const background = document.querySelector('.background-image') as HTMLElement;
    const h1 = document.querySelector('h1') as HTMLElement;


    if (this.on) {
      background.style.filter = 'invert(1)';
      h1.style.filter = 'invert(1)';
      
    } else {
      background.style.filter = 'invert(0)';
      h1.style.filter = 'invert(0)';
      
    }
  }

  
}