const { Client, GatewayIntentBits, Partials} = require('discord.js');
const { TOKEN } = require('./JSON/config.json');
const { readdirSync } = require('node:fs');

// طريقة الاوبجكت اخذتها من الرسالة هاذي
// https://discord.com/channels/898695298954702869/965711147577794610/1137474444462395503
const client = new Client({
    intents: [
        Object.keys(GatewayIntentBits)
    ],
    partials: [
      Object.keys(Partials)
    ]
});

readdirSync('./handlers').forEach(handler => {
    require(`./handlers/${handler}`)(client);
});




client.login(TOKEN);


