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

    const selectedOption = document.getElementById('macro-command-type-select').options[selectElement.selectedIndex].text;

    console.log(selectedOption);

    if(selectedOption === 'startStream') {
        document.getElementById('startStream-template').remove('hidden-template');
        document.getElementById('startStream-template').remove('add-template');
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


