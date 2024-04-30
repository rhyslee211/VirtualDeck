
const macroButtonTemplate = document.createElement('template');

macroButtonTemplate.innerHTML = `

    <link rel="stylesheet" href="macroButton.css">

    <div class="macroButton-container">
        <button class="macroButton">Macro Button</button>
    </div>

`;

class macroButton extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(macroButtonTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        
    }
}

window.customElements.define('macro-button', macroButton);
