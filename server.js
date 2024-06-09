// server.js
const express = require('express');
const {default: OBSWebSocket} = require('obs-websocket-js');
//const OBSWebSocket = require('obs-websocket-js').default;
const path = require('path');

const app = express();
const port = 3000;

const obs = new OBSWebSocket();
const OBS_WEBSOCKET_ADDRESS = 'ws://localhost:4455';
const OBS_WEBSOCKET_PASSWORD = 'your_password';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/mute-mic', async (req, res) => {
  try {
    //const { inputName, inputMuted } = await obs.call('ToggleInputMute', { inputName: 'Mic/Aux' });
    await obs.call('ToggleInputMute', {inputName: 'Audio Input Capture 2', inputMuted: 'toggle'});
    console.log('Mic muted');
    res.status(200).send('Mic muted');
  } catch (error) {
    res.status(500).send('Failed to mute/unmute microphone');
    console.log(error);
    //const sources = await obs.call('GetSourceList');
    //console.log(sources.sources.filter(source => source.typeId === 'input' && source.type === 'wasapi_input_capture'));
  }
});

app.get('/start-stream', async (req, res) => {
  try {
    await obs.send('StartStreaming');
    res.send('Stream started');
  } catch (error) {
    res.status(500).send('Failed to start stream');
  }
});

obs.connect(OBS_WEBSOCKET_ADDRESS, OBS_WEBSOCKET_PASSWORD)
  .then(() => {
    console.log('Connected to OBS WebSocket');
  })
  .catch(err => {
    console.error('Failed to connect to OBS WebSocket:', err);
  });

  obs.on('ConnectionOpened', () => {
    console.log('Connection Opened');
  });
  
  obs.on('Identified', () => {
    console.log('Identified, good to go!')
  
    // Send some requests.
    obs.call('GetSceneList').then((data) => {
      console.log('Scenes:', data);
    });
  });
  
  obs.on('SwitchScenes', data => {
    console.log('SwitchScenes', data);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
