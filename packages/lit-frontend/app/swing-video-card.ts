import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("swing-video-card")
class SwingVideoCardElement extends LitElement {
    @property({ reflect: true, type: Boolean })
    open: boolean = false;

    render() {
        return html`
      <span class="swing-video-box">
            <slot name="club"></slot>
            <slot name="date"></slot>
            <slot name="swing-video"></slot>
            <h4>Feedback</h4>
            <slot name="feedback-text"></slot>
        </span>
    `;
    }

    static styles = css`
    :host{
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
    }
    .swing-video-box{
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

    ::slotted(img[slot="swing-video"]){
        height: 200px;
    }

    slot[name="feedback-text"]{
        white-space: normal;
    }

   
  `;
}