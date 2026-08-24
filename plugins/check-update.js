const os = require('os');
const path = require('path');
const { cmd, commands } = require('../arslan');
const config = require('../config');

cmd({
    pattern: 'version',
    alias: ["cupdate", "checkupdate"],
    react: '🚀',
    desc: "Vérifier la version et les infos système du bot",
    category: 'info',
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const pluginPath = path.join(__dirname, '../plugins');
        const fs = require('fs');
        const pluginCount = fs.readdirSync(pluginPath).filter(f => f.endsWith('.js')).length;
        const totalCommands = commands.length;

        const uptimeSec = process.uptime();
        const h = Math.floor(uptimeSec / 3600);
        const mi = Math.floor((uptimeSec % 3600) / 60);
        const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
        const hostName = os.hostname();

        const statusMessage = `╭──❍ *🚀 𝐕𝐄́𝐑𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍* ❍
│🌟 *𝐒𝐚𝐥𝐮𝐭: ${pushname}!*
│📌 *𝐍𝐨𝐦 𝐝𝐮 𝐛𝐨𝐭: 𝐍agi-𝐌d*
│📂 *𝐏𝐥𝐮𝐠𝐢𝐧𝐬: ${pluginCount}*
│🔢 *𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬: ${totalCommands}*
╰────────────────❍
╭──❍ *💾 𝐈𝐍𝐅𝐎 𝐒𝐘𝐒𝐓𝐄̀𝐌𝐄* ❍
│📟 *𝐑𝐀𝐌 𝐮𝐭𝐢𝐥𝐢𝐬𝐞́𝐞: ${ramUsage}𝐌𝐁*
│📟 *𝐑𝐀𝐌 𝐭𝐨𝐭𝐚𝐥𝐞: ${totalRam}𝐌𝐁*
│⚙️ *𝐇𝐨̂𝐭𝐞: ${hostName}*
│⏳ *𝐓𝐞𝐦𝐩𝐬 𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞𝐦𝐞𝐧𝐭: ${h}h ${mi}m*
╰────────────────❍
> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium`;

        await conn.sendMessage(from, {
            image: { url: config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png' },
            caption: statusMessage
        }, { quoted: mek });

    } catch (error) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐯𝐞𝐫𝐬𝐢𝐨𝐧 :', error.message);
        reply('❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞.');
    }
});
