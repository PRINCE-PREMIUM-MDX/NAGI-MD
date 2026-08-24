const { cmd } = require('../arslan');
const config = require('../config');

cmd({
    pattern: "bot",
    alias: ["about"],
    react: "🤖",
    desc: "Informations sur le bot",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const mi = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);

        const about = `╭─「 *\`𝐁𝐎𝐓 𝐄𝐍 𝐋𝐈𝐆𝐍𝐄\`* 」
│꙳ *𝐍𝐨𝐦 𝐝𝐮 𝐛𝐨𝐭* ↔ 𝐍ᴀɢɪ-𝐌ᴅ
│꙳ *𝐒𝐭𝐚𝐭𝐮𝐭* ↔ 𝐄𝐧 𝐥𝐢𝐠𝐧𝐞
│꙳ *𝐓𝐞𝐦𝐩𝐬 𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞𝐦𝐞𝐧𝐭* ↔ ${h}h ${mi}m ${s}s
│꙳ *𝐀𝐩𝐩𝐚𝐫𝐞𝐢𝐥* ↔ 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭
╰────────────────❍
> *𝐌ade 𝐈n 𝐁y 𝐏ʀɪɴᴄᴇ 𝐏ʀᴇᴍɪᴜᴍ*`;

        await conn.sendMessage(from, {
            image: { url: config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png' },
            caption: about
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ 𝐄𝐫𝐫𝐞𝐮𝐫: ${e.message}`);
    }
});
                                 
