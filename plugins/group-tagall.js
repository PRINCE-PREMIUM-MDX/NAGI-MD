const { cmd } = require('../arslan');
const config = require('../config');

cmd({
    pattern: "tagallmembers",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "Mentionner tous les membres du groupe",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, isAdmins, isCreator, isOwner, q, groupMetadata }) => {
    try {
        if (!isGroup) {
            conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        }
        if (!isAdmins && !isCreator && !isOwner) {
            conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐨𝐮 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐜𝐢.");
        }

        let groupInfo = groupMetadata || await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐞𝐬 𝐢𝐧𝐟𝐨𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.");

        const groupName = groupInfo.subject || "𝐆𝐫𝐨𝐮𝐩𝐞 𝐢𝐧𝐜𝐨𝐧𝐧𝐮";
        const list = groupInfo.participants || participants;
        const totalMembers = list ? list.length : 0;
        if (totalMembers === 0) return reply("❌ 𝐀𝐮𝐜𝐮𝐧 𝐦𝐞𝐦𝐛𝐫𝐞 𝐭𝐫𝐨𝐮𝐯𝐞́ 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞.");

        const message = q || "𝐁𝐨𝐧𝐣𝐨𝐮𝐫 𝐚̀ 𝐭𝐨𝐮𝐬";

        let teks = `╭─「 *\`𝐌𝐄𝐍𝐓𝐈𝐎𝐍 𝐆𝐄́𝐍𝐄́𝐑𝐀𝐋𝐄\`* 」\n│☉ 𝐆𝐫𝐨𝐮𝐩𝐞 : *${groupName}*\n│☉ 𝐌𝐞𝐦𝐛𝐫𝐞𝐬 : *${totalMembers}*\n│☉ 𝐌𝐞𝐬𝐬𝐚𝐠𝐞: *${message}*\n`;
        for (const mem of list) {
            if (!mem.id) continue;
            teks += `│❉ @${mem.id.split('@')[0]}\n`;
        }
        teks += "╰────────────────❍";

        await conn.sendMessage(from, {
            image: { url: config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png' },
            caption: teks,
            mentions: list.map(a => a.id)
        }, { quoted: mek });

    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐭𝐚𝐠𝐚𝐥𝐥𝐦𝐞𝐦𝐛𝐞𝐫𝐬 :", e);
        reply(`❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${e.message}`);
    }
});
