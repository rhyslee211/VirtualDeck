//const { ipcRenderer } = require('electron');

document.getElementById('add-macro-button').addEventListener('click', () => {

    clearPopup();

    document.getElementById('add-macro-form').style.display = 'block';
    
    document.addEventListener('keydown', onEnterKeyPress);

});

document.getElementById('add-macro-cancel').addEventListener('click', () => {
    
    document.getElementById('add-macro-form').style.display = 'none';

    document.removeEventListener('keydown', onEnterKeyPress);

});

document.getElementById('add-macro-submit').addEventListener('click', () => {

    document.getElementById('add-macro-form').style.display = 'none';

    submitForm();

});

document.getElementById('macro-command-type-select').addEventListener('change', function() {

    const selectedOption = document.getElementById('macro-command-type-select').options[document.getElementById('macro-command-type-select').selectedIndex].value;

    console.log(selectedOption);

    let template = document.getElementById("macro-form-template")

    //console.log(template);

    template.classList.remove('visible');
    template.classList.add('hidden');


    if(selectedOption !== "") {
        document.getElementById('macro-form-template').classList.remove('hidden');
        document.getElementById('macro-form-template').classList.add('visible');
    }

    if(selectedOption === 'muteMic' || selectedOption === 'unmuteMic') {
        let micInputs = document.getElementsByClassName("mic-input");

        Array.prototype.forEach.call(micInputs, element => {
            console.log(element.classList);
            element.classList.remove('hidden');
            element.classList.add('visible');
            console.log(element.classList);
        });
    }
    else {
        let micInputs = document.getElementsByClassName("mic-input");

        Array.prototype.forEach.call(micInputs, element => {
            console.log(element.classList);
            element.classList.remove('visible');
            element.classList.add('hidden');
            console.log(element.classList);
        });
    
    }

});

function clearPopup() {

    let template = document.getElementById("macro-form-template")

    //console.log(template);

    template.classList.remove('visible');
    template.classList.add('hidden');
    
    document.getElementById('macro-command-type-select').selectedIndex = 0;

    document.getElementById('macro-form-template').querySelectorAll('input').forEach(input => {
        input.value = '';
    });

}

function onEnterKeyPress(event) {
    // Check if the "Enter" key was pressed
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Enter key pressed');
        submitForm();
    }
}

function submitForm(){

    let macroName = document.getElementById('macro-name').value;
    let macroKeys = document.getElementById('macro-keys').value;
    let macroText = document.getElementById('macro-text').value;
    let macroCommand = document.getElementById('macro-command-type-select').options[document.getElementById('macro-command-type-select').selectedIndex].value;

    let macro = document.getElementById('macro-list').appendChild(document.createElement('macro-button'));

    macro.macroName = macroName;
    macro.macroKeys = macroKeys;
    macro.macroText = macroText;
    macro.macroCommand = macroCommand;

    console.log(macro);

    macro.shadowRoot.querySelector('.macroButton').innerText = macroText;

    document.removeEventListener('keydown', onEnterKeyPress);

}


