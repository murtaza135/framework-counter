import { createRouter, html } from 'framework';

export const router = createRouter({
  root: document.querySelector("#root"),
  routes: [
    { path: "/", html: html`<main-page />` },
    { path: "/two", html: html`<page-two />` },
    { path: "/form", html: html`<form-page />` }
  ]
});