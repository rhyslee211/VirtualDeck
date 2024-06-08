
const macroButtonTemplate = document.createElement('template');

const macroArea = document.getElementById('macro-area');

const contentHeader = document.getElementById('content-header');

macroButtonTemplate.innerHTML = `

    <link rel="stylesheet" href="macroButton.css">

    <div class="macroButton-container">
        <button class="macroButton"></button>
    </div>

`;

class macroButton extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(macroButtonTemplate.content.cloneNode(true));

        // Variables to store mouse position during dragging
        this.offsetX = 0;
        this.offsetY = 0;

        this.macroName = "";
        this.macroKeys = [];
        this.macroText = "";
        this.macroCommand = "";

        this.isDragging = false;

        // Get the container element
        this.container = this.shadowRoot.querySelector('.macroButton-container');

        // Function to handle mouse down event
        const dragMouseDown = (event) => {
            // Record the initial mouse cursor position
            this.offsetX = event.clientX - this.container.offsetLeft;
            this.offsetY = event.clientY - this.container.offsetTop;

            // Register the mousemove and mouseup events
            document.addEventListener('mousemove', this.dragMouseMove);
            document.addEventListener('mouseup', this.dragMouseUp);

            this.container.style.zIndex = 1000;

            console.log(macroArea.offsetWidth, macroArea.offsetHeight)
        };

        // Function to handle mouse move event
        this.dragMouseMove = (event) => {

            this.isDragging = true;
            // Calculate the new position of the container
            let newPosX = event.clientX - this.offsetX;
            let newPosY = event.clientY - this.offsetY;
        
            if (newPosX < 0) newPosX = 0;
            if (newPosY < 0) newPosY = 0;
            
            const containerWidth = this.container.offsetWidth;
            const containerHeight = this.container.offsetHeight;
        
            if (newPosX + containerWidth > macroArea.offsetWidth) {
                newPosX = macroArea.offsetWidth - containerWidth;
            }
            if (newPosY + containerHeight > macroArea.offsetHeight) {
                newPosY = (macroArea.offsetHeight) - containerHeight;
            }
        
            // Set the new position
            this.container.style.left = newPosX + 'px';
            this.container.style.top = newPosY + 'px';

            
        };

        

        // Function to handle mouse up event
        this.dragMouseUp = () => {

            if (this.isDragging) {
                this.isDragging = false;
                
            }
            else {
                // If the button was not dragged, execute the command
                console.log(this.macroCommand);

                runCommand(this.macroCommand);

            }

            // Remove the event listeners for mousemove and mouseup
            document.removeEventListener('mousemove', this.dragMouseMove);
            document.removeEventListener('mouseup', this.dragMouseUp);

            this.container.style.zIndex = 0;
        };

        // Add event listener for mousedown event
        this.container.addEventListener('mousedown', dragMouseDown);

        function runCommand(command) {
            console.log(command);
            fetch('http://localhost:3000/mute-mic')
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    connectedCallback() {
        
    }
}

window.customElements.define('macro-button', macroButton);
