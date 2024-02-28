import { html } from "lit";
import { customElement }
from "lit/decorators.js";
// MVU app
import * as App from "../app";
import routes from "../routes";
import update from "../update";
// components
import "../components/auth-required";
import "../components/vaadin-router";



@customElement("caddycoaches-app")
export class CaddyCoachesAppElement extends App.Main {
    constructor() { super(update); }

    render() {
        return html`
        <auth-required>
        <caddycoaches-header></caddycoaches-header>
        <vaadin-router .routes=${routes}> </vaadin-router>
        </auth-required>
        `;
        }
}
