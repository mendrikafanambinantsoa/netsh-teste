const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/wifi-profiles', (req, res) => {
  exec('netsh wlan show profiles', (err, stdout) => {
    if (err) return res.status(500).send(err.message);

    const matches = stdout.match(/All User Profile\s*:\s(.*)/g);
    const profiles = matches ? matches.map(m => m.split(':')[1].trim()) : [];

    res.json(profiles);
  });
});

app.get('/wifi-details/:profile', (req, res) => {
  const profile = req.params.profile;
  exec(`netsh wlan show profile "${profile}" key=clear`, (err, stdout) => {
    if (err) return res.status(500).send(err.message);
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${3000}`);
});
