const { cmd, commands } = require('../arslan');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "info",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const totalCmds = commands.length;
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const status = `
        *𝐉𝐄 𝐒𝐔𝐈𝐒 𝐄𝐍 𝐋𝐈𝐆𝐍𝐄 𝐌𝐀𝐈𝐍𝐓𝐄𝐍𝐀𝐍𝐓 🤗♥️*
*┏────〘 𝐈𝐍𝐅𝐎 〙───⊷*
*┃👑 𝐌𝐎𝐃𝐄 :❯ ${config.MODE || 'private'}*
*┃👑 𝐔𝐓𝐈𝐋𝐈𝐒𝐀𝐓𝐄𝐔𝐑 :❯ ${config.OWNER_NAME || 'NAGI-MD'}*
*┃👑 𝐏𝐑𝐄́𝐅𝐈𝐗𝐄 :❯ ❮ ${config.PREFIX || '.'} ❯*
*┃👑 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 :❯ 1.0.0*
*┃👑 𝐓𝐎𝐓𝐀𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 :❯ ❮ ${totalCmds} ❯*
*┃👑 𝐓𝐄𝐌𝐏𝐒 𝐃𝐄 𝐅𝐎𝐍𝐂𝐓𝐈𝐎𝐍𝐍𝐄𝐌𝐄𝐍𝐓 :❯ ${uptime()}*
*┗──────────────⊷*
*👑 𝐁𝐎𝐓 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 NAGI-MD 👑*`;

        await conn.sendMessage(from, { 
            text: status,
            contextInfo: {
                mentionedJid: [sender],   // ✅ FIXED
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐚𝐥𝐢𝐯𝐞 :", e);
        reply(`𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${e.message}`);
    }
});
