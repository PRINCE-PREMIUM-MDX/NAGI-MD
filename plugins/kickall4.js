const { cmd } = require('../arslan');

cmd({
    pattern: "kickallfast",
    alias: ["kickall2", "kickrush"],
    desc: "Retirer tous les membres non-admins rapidement",
    react: "💣",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, senderNumber, groupMetadata, groupAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("*📛 𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐅𝐎𝐍𝐂𝐓𝐈𝐎𝐍𝐍𝐄 𝐔𝐍𝐈𝐐𝐔𝐄𝐌𝐄𝐍𝐓 𝐃𝐀𝐍𝐒 𝐋𝐄𝐒 𝐆𝐑𝐎𝐔𝐏𝐄𝐒*");
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply("*⛔ 𝐒𝐄𝐔𝐋 𝐋𝐄 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 𝐃𝐔 𝐁𝐎𝐓 𝐏𝐄𝐔𝐓 𝐔𝐓𝐈𝐋𝐈𝐒𝐄𝐑 𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄*");
        if (!isBotAdmins) return reply("*🤖 𝐉𝐄 𝐃𝐎𝐈𝐒 𝐄̂𝐓𝐑𝐄 𝐀𝐃𝐌𝐈𝐍 𝐏𝐎𝐔𝐑 𝐄𝐗𝐄́𝐂𝐔𝐓𝐄𝐑 𝐂𝐄𝐂𝐈*");

        const allParticipants = groupMetadata.participants;
        const botJid = conn.user.id;
        const nonAdmins = allParticipants.filter(p => !groupAdmins.includes(p.id) && p.id !== botJid);

        if (nonAdmins.length === 0) return reply("*ℹ️ 𝐀𝐔𝐂𝐔𝐍 𝐌𝐄𝐌𝐁𝐑𝐄 𝐀̀ 𝐑𝐄𝐓𝐈𝐑𝐄𝐑*");

        const idsToKick = nonAdmins.map(p => p.id);
        await conn.groupParticipantsUpdate(from, idsToKick, "remove");

        reply(`*✅ ${idsToKick.length} 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 ${groupMetadata.subject}*`);
    } catch (err) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐤𝐢𝐜𝐤𝐚𝐥𝐥𝐟𝐚𝐬𝐭 :", err);
        reply("*⚠️ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳*");
    }
});
