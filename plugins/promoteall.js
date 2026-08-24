const { cmd } = require('../arslan');
const config = require('../config');

cmd({
    pattern: "promoteall",
    desc: "Promouvoir tous les membres du groupe en admin",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, sender, isAdmins, isOwner, reply }) => {
    try {
        if (!isGroup) return reply("🚫 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬");

        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        const botAdmin = participants.find(p => p.id === botId)?.admin;

        if (!botAdmin) return reply("🚫 𝐋𝐄 𝐁𝐎𝐓 𝐃𝐎𝐈𝐓 𝐄̂𝐓𝐑𝐄 𝐀𝐃𝐌𝐈𝐍 𝐏𝐎𝐔𝐑 𝐄𝐗𝐄́𝐂𝐔𝐓𝐄𝐑 𝐂𝐄𝐂𝐈");
        if (!isAdmins && !isOwner)
            return reply("🚫 𝐒𝐄𝐔𝐋𝐒 𝐋𝐄𝐒 𝐀𝐃𝐌𝐈𝐍𝐒 𝐎𝐔 𝐋𝐄 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 𝐏𝐄𝐔𝐕𝐄𝐍𝐓 𝐔𝐓𝐈𝐋𝐈𝐒𝐄𝐑 𝐂𝐄𝐂𝐈");

        const toPromote = participants
            .filter(p => !p.admin)
            .map(p => p.id)
            .filter(id => id !== botId);

        if (toPromote.length === 0) return reply("✅ 𝐀𝐮𝐜𝐮𝐧 𝐦𝐞𝐦𝐛𝐫𝐞 𝐚̀ 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐨𝐢𝐫");

        await conn.groupParticipantsUpdate(from, toPromote, 'promote');
        const mentions = toPromote.map(u => `@${u.split('@')[0]}`).join(' ');
        await conn.sendMessage(from, { text: `*𝐋𝐄𝐒 𝐌𝐄𝐌𝐁𝐑𝐄𝐒 𝐒𝐔𝐈𝐕𝐀𝐍𝐓𝐒 𝐎𝐍𝐓 𝐄́𝐓𝐄́ 𝐏𝐑𝐎𝐌𝐔𝐒 𝐀𝐃𝐌𝐈𝐍:*\n${mentions}`, mentions: toPromote }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐥𝐨𝐫𝐬 𝐝𝐮 𝐩𝐫𝐨𝐦𝐨𝐭𝐞𝐚𝐥𝐥.");
    }
});
