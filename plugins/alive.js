const { cmd } = require('../arslan');
const config = require('../config');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["botalive", "alivecheck", "statusbot"],
    desc: "Check bot alive status and response details",
    category: "info",
    react: "💚",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const start = Date.now();
        await conn.sendMessage(from, { react: { text: "⚡", key: mek.key } });
        const end = Date.now();
        const pingTime = end - start;

        const botName = config.BOT_NAME || '𝐍agi-𝐌d';
        const botNumber = conn.user.id.split(':')[0];
        const ownerNumber = config.OWNER_NUMBER || '243860885022';
        const liveMsg = config.LIVE_MSG || '𝐉𝐄 𝐒𝐔𝐈𝐒 𝐀𝐂𝐓𝐈𝐅 𝐄𝐓 𝐄𝐍 𝐋𝐈𝐆𝐍𝐄';
        const aliveImage = config.ALIVE_IMG || config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png';

        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
        const cpuUsage = os.loadavg()[0].toFixed(1);
        const uptime = runtime(process.uptime());

        let statusEmoji = "🟢", statusText = "𝐑𝐀𝐏𝐈𝐃𝐄";
        if (pingTime > 500) {
            statusEmoji = "🟡";
            statusText = "𝐋𝐄𝐍𝐓";
        } else if (pingTime > 200) {
            statusEmoji = "🟠";
            statusText = "𝐁𝐎𝐍";
        }

        const message = `
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│   𝐯 ⊰ ${botName} ⊱*
*│*
*│❀ 💚 𝐀𝐥𝐢𝐯𝐞:* ${liveMsg} ${statusEmoji}
*│❀ 🏓 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞:* ${pingTime}ms
*│❀ 📊 𝐒𝐭𝐚𝐭𝐮𝐬:* ${statusText}
*│❀ 🤖 𝐁𝐨𝐭:* ${botName}
*│❀ 👤 𝐎𝐰𝐧𝐞𝐫:* ${ownerNumber}
*│❀ 🔢 𝐍𝐮𝐦𝐛𝐞𝐫:* ${botNumber}
*│❀ 💾 𝐑𝐀𝐌:* ${usedMemory}MB / ${totalMemory}GB
*│❀ 🖥️ 𝐂𝐏𝐔:* ${cpuUsage}%
*│❀ ⚙️ 𝐌𝐨𝐝𝐞:* 🟢 𝐄𝐍 𝐋𝐈𝐆𝐍𝐄
*│❀ ⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞:* ${uptime}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ${config.BOT_FOOTER || '© 𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium'} ✅`;

        const imageSource = /^https?:\/\//i.test(aliveImage)
            ? { url: aliveImage }
            : fs.existsSync(path.resolve(aliveImage))
                ? fs.readFileSync(path.resolve(aliveImage))
                : { url: config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png' };

        try {
            await conn.sendMessage(from, {
                image: imageSource,
                caption: message
            }, { quoted: mek });
        } catch (mediaError) {
            console.error('𝐄́𝐜𝐡𝐞𝐜 𝐞𝐧𝐯𝐨𝐢 𝐢𝐦𝐚𝐠𝐞 𝐚𝐥𝐢𝐯𝐞, 𝐭𝐞𝐱𝐭𝐞 𝐮𝐭𝐢𝐥𝐢𝐬𝐞́ :', mediaError);
            await reply(message);
        }

        if (pingTime < 200) {
            await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
        } else if (pingTime < 500) {
            await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
        } else {
            await conn.sendMessage(from, { react: { text: "🐌", key: mek.key } });
        }

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐚𝐥𝐢𝐯𝐞 :", error);
        await reply(`
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│     ⊰ ${config.BOT_NAME || '𝐍agi-𝐌d'} ⊱*
*│
*│❀ ❌ 𝐄𝐫𝐫𝐨𝐫:* ${error.message}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ${config.BOT_FOOTER || '© 𝐌ade 𝐈n 𝐁y 𝐒idd 𝐏rince 𝐏remium'} ❌`);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
});
