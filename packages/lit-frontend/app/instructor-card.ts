import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("instructor-card")
class InstructorCardElement extends LitElement {
    @property({ reflect: true, type: Boolean })
    open: boolean = false;

    render() {
        return html`
      <span class="instructor-box">
            <p class="instructor-name">
                <slot name="instructor-name"></slot>
                <slot name="instructor-image"></slot>
            </p>
            <dl>
                <slot name="years-pro"></slot>
                <slot name="years-instructing"></slot>
                <slot name="handicap"></slot>
                <svg class="icon-star">
                    <use href="/icons/icons.svg#icon-star" />
                </svg>
                <svg class="icon-star">
                    <use href="/icons/icons.svg#icon-star" />
                </svg>
                <svg class="icon-star">
                    <use href="/icons/icons.svg#icon-star" />
                </svg>
                <svg class="icon-star">
                    <use href="/icons/icons.svg#icon-star" />
                </svg>
                <svg class="icon-star">
                    <use href="/icons/icons.svg#icon-star" />
                </svg>
            </dl>
            <slot name="price"></slot>
            <a class="request">Request</a>
        </span>
    `;
    }

    static styles = css`
    :host{
        display: flex;
         flex-grow: 1;
    }
    .instructor-box{
        margin: 20px;
        padding: 20px;
        width: 230px;
        background-color: white;
        border-radius: 8px;
        display: inline;
        text-align: justify;
        margin-right: 50px;
        margin-left: 40px;
        white-space: nowrap;
        box-shadow: var(--box-shadow-button);
}

    .instructor-name{
        font-size: 20px;
        text-decoration: underline;
        padding-bottom: 10px;
        margin: 0px;
        display: flex;
        align-items: center;
}

    svg.icon-star{
        display: inline;
        height: 1.5em;
        width: 1.5em;
        vertical-align: top;
        fill: currentColor;
        margin-left: -1px;
        margin-right: -4px;
        margin-top: 3px;
        right: auto;
    }

    svg.icon-black-star{
        display: inline;
        height: 2.5em;
        width: 2.5em;
        vertical-align: top;
        fill: currentColor;
        margin-left: -10px;
        margin-right: -10px;
        right: auto;
    }

    slot[name="price"] {
        display: inline-block;
        padding-right: 10px;
        margin: 0px;
        color: var(--color-grey);
    }


    .request {
        margin: 0px;
        right: 0px;
        text-decoration: none;
        color:white;
        background-color: var(--color-grey);
        padding: 3px 5px;
        border-radius: 5px;
}
  `;
}