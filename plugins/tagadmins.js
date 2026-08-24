const { cmd } = require('../arslan');
const config = require('../config');

cmd({
    pattern: "tagadmins",
    react: "🎋",
    alias: ["gc_tagadmins"],
    desc: "Mentionner tous les admins du groupe",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, q, groupMetadata }) => {
    try {
        if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

        let groupInfo = groupMetadata || await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐞𝐬 𝐢𝐧𝐟𝐨𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.");

        const groupName = groupInfo.subject || "𝐆𝐫𝐨𝐮𝐩𝐞 𝐢𝐧𝐜𝐨𝐧𝐧𝐮";
        const admins = groupInfo.participants.filter(p => p.admin !== null).map(p => p.id);
        if (admins.length === 0) return reply("❌ 𝐀𝐮𝐜𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐭𝐫𝐨𝐮𝐯𝐞́ 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞.");

        const message = q || "𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 𝐚𝐝𝐦𝐢𝐧𝐬";

        let teks = `╭─「 *\`𝐌𝐄𝐍𝐓𝐈𝐎𝐍 𝐀𝐃𝐌𝐈𝐍𝐒\`* 」\n│▢ 𝐀𝐝𝐦𝐢𝐧𝐬 : *${admins.length}*\n│▢ 𝐌𝐞𝐬𝐬𝐚𝐠𝐞: *${message}*\n`;
        for (const admin of admins) {
            teks += `│ • @${admin.split('@')[0]}\n`;
        }
        teks += "╰────────────────❍\n> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium";

        await conn.sendMessage(from, {
            image: { url: config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png' },
            caption: teks,
            mentions: admins
        }, { quoted: mek });

    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐭𝐚𝐠𝐚𝐝𝐦𝐢𝐧𝐬 :", e);
        reply(`❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${e.message}`);
    }
});
