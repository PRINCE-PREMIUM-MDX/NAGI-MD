const { cmd } = require('../arslan');
const config = require('../config');
const os = require('os');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["pong", "speed", "lag"],
    desc: "Check bot response speed and status",
    category: "info",
    react: "🏓",
    filename: __filename
}, async (conn, mek, m, { from, reply, isOwner }) => {
    try {
        const start = Date.now();
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        const end = Date.now();
        const pingTime = end - start;

        const botName = config.BOT_NAME || '𝐍agi-𝐌d';
        const botNumber = conn.user.id.split(':')[0];
        const ownerNumber = config.OWNER_NUMBER || '243860885022';

        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
        const cpuUsage = os.loadavg()[0].toFixed(1);
        const uptime = runtime(process.uptime());

        let statusEmoji = "🟢", statusText = "𝐄𝐗𝐂𝐄𝐋𝐋𝐄𝐍𝐓";
        if (pingTime > 500) { statusEmoji = "🟡"; statusText = "𝐋𝐄𝐍𝐓"; }
        else if (pingTime > 200) { statusEmoji = "🟠"; statusText = "𝐁𝐎𝐍"; }
        else { statusEmoji = "🟢"; statusText = "𝐑𝐀𝐏𝐈𝐃𝐄"; }

        const message = `
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ ${botName} ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ 🏓 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞:* ${pingTime}ms ${statusEmoji}
*│❀ 📊 𝐒𝐭𝐚𝐭𝐮𝐬:* ${statusText}
*│❀ 🤖 𝐁𝐨𝐭:* ${botName}
*│❀ 👤 𝐎𝐰𝐧𝐞𝐫:* ${ownerNumber}
*│❀ 🔢 𝐍𝐮𝐦𝐛𝐞𝐫:* ${botNumber}
*│❀ 💾 𝐑𝐀𝐌:* ${usedMemory}MB / ${totalMemory}GB
*│❀ 🖥️ 𝐂𝐏𝐔:* ${cpuUsage}%
*│❀ ⚙️ 𝐒𝐭𝐚𝐭𝐮𝐬:* 🟢 𝐄𝐍 𝐋𝐈𝐆𝐍𝐄
*│❀ ⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞:* ${uptime}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ${config.BOT_FOOTER || '© 𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium'} ✅`;

        await reply(message);

        if (pingTime < 200) await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
        else if (pingTime < 500) await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
        else await conn.sendMessage(from, { react: { text: "🐌", key: mek.key } });

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐢𝐧𝐠 :", error);
        reply(`
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ ${config.BOT_NAME || '𝐍agi-𝐌d'} ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ ❌ 𝐄𝐫𝐫𝐨𝐫:* ${error.message}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ${config.BOT_FOOTER || '© 𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium'} ❌`);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
});
