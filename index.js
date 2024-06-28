//const { ipcRenderer } = require('electron');

document.getElementById('add-macro-button').addEventListener('click', () => {

    document.getElementById('add-macro-form').style.display = 'block';
    
    document.addEventListener('keydown', onEnterKeyPress);

});

document.getElementById('add-macro-cancel').addEventListener('click', () => {

    document.getElementById('add-macro-form').style.display = 'none';
    
    document.removeEventListener('keydown', onEnterKeyPress);

});

document.getElementById('add-macro-submit').addEventListener('click', () => {

    submitForm();

});

document.getElementById('macro-command-type-select').addEventListener('change', function() {

    const selectedOption = document.getElementById('macro-command-type-select').options[document.getElementById('macro-command-type-select').selectedIndex].value;

    console.log(selectedOption);

    let templates = document.getElementsByClassName("macro-command-type-template")

    console.log(templates);
    
    Array.prototype.forEach.call(templates, element => {
        console.log(element.classList);
        element.classList.remove('visible');
        element.classList.add('hidden');
        console.log(element.classList);
    });

    if(selectedOption === 'startStream') {
        document.getElementById('startStream-template').classList.remove('hidden');
        document.getElementById('startStream-template').classList.add('visible');
    }
    if(selectedOption === 'stopStream') {
        document.getElementById('stopStream-template').classList.remove('hidden');
        document.getElementById('stopStream-template').classList.add('visible');
    }
    if(selectedOption === 'startRecording') {
        document.getElementById('startRecording-template').classList.remove('hidden');
        document.getElementById('startRecording-template').classList.add('visible');
    }
    if(selectedOption === 'stopRecording') {
        document.getElementById('stopRecording-template').classList.remove('hidden');
        document.getElementById('stopRecording-template').classList.add('visible');
    }
    if(selectedOption === 'muteMic') {
        document.getElementById('muteMic-template').classList.remove('hidden');
        document.getElementById('muteMic-template').classList.add('visible');
    }
    if(selectedOption === 'unmuteMic') {
        document.getElementById('unmuteMic-template').classList.remove('hidden');
        document.getElementById('unmuteMic-template').classList.add('visible');
    }

});

function onEnterKeyPress(event) {
    // Check if the "Enter" key was pressed
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Enter key pressed');
        submitForm();
    }
}

function submitForm(){
    document.getElementById('add-macro-form').style.display = 'none';

    let macroName = document.getElementById('macro-name').value;
    let macroKeys = document.getElementById('macro-keys').value;
    let macroText = document.getElementById('macro-text').value;
    let macroCommand = document.getElementById('macro-command').value;

    let macro = document.getElementById('macro-list').appendChild(document.createElement('macro-button'));

    macro.macroName = macroName;
    macro.macroKeys = macroKeys;
    macro.macroText = macroText;
    macro.macroCommand = macroCommand;

    console.log(macro);

    macro.shadowRoot.querySelector('.macroButton').innerText = macroText;

    document.removeEventListener('keydown', onEnterKeyPress);

}


