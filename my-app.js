/**
 * LitElement Router
 *
 * https://github.com/hamedasemi/lit-element-router
 * https://www.npmjs.com/package/lit-element-router
 */

import {} from "@webcomponents/webcomponentsjs/webcomponents-loader.js";

import { LitElement, html } from "lit-element";
import { router, outlet, navigator } from "lit-element-router";

@router @navigator @outlet 
class App extends LitElement {
  static get properties() {
    return {
      params: { type: Object },
      query: { type: Object },
      data: { type: Object }
    };
  }

  static get routes() {
    return [
      {
        name: "home",
        pattern: "",
        data: { title: "Home" }
      },
      {
        name: "info",
        pattern: "info"
      },
      {
        name: "user",
        pattern: "user/:id"
      },
      {
        name: "not-found",
        pattern: "*"
      }
    ];
  }

  constructor() {
    super();
    this.params = {};
    this.query = {};
    this.data = {};
  }

  router(route, params, query, data) {
    this.activeRoute = route;
    this.params = params;
    this.query = query;
    this.data = data;
    console.log(route, params, query, data);
  }

  render() {
    return html`
      <a href="/" @click="${this.linkClick}">Home</a>
      <a href="/info" @click="${this.linkClick}">Info</a>
      <a href="/info?data=12345" @click="${this.linkClick}">Info?data=12345</a>
      <a href="/user/14" @click="${this.linkClick}">user/14</a>

      <h1 route="home">Home</h1>
      <h1 route="info">Info ${this.query.data}</h1>
      <h1 route="user">User ${this.params.id}</h1>
      <h1 route="not-found">Not Found</h1>
    `;
  }

  linkClick(event) {
    event.preventDefault();
    this.navigate(event.target.href);
  }
}

customElements.define("my-app", App);
