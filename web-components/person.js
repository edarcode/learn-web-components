export class Person extends HTMLElement {
  #root;
  #name;
  #age;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "closed" });
  }

  attributeChangedCallback(nameAtt, _, currentAtt) {
    if (nameAtt === "name") this.#name = currentAtt;
    if (nameAtt === "age") this.#age = currentAtt;
    this.setAttribute("id", "edarcode");
  }
  static get observedAttributes() {
    return ["name", "age"];
  }

  connectedCallback() {
    const template = this.#render({ name: this.#name, age: this.#age });
    this.#root.innerHTML = template;
  }

  #render({ name, age }) {
    if (!name || !age) throw TypeError("required name and age");
    return `
    <article>
        <h2>${name}</h2>
        <span>${age}</span>
      </article>
    `;
  }
}
