const { cmd } = require('../arslan');

cmd({
    pattern: "vcard",
    react: "📲",
    desc: "Créer une carte de contact (vCard) depuis un message cité",
    category: "tools",
    filename: __filename,
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args || args.length === 0) {
            return reply("❌ *𝐅𝐨𝐫𝐦𝐚𝐭 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞!*\n\n➤ 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧: `.vcard <𝐍𝐨𝐦>`\n➤ 𝐄𝐱𝐞𝐦𝐩𝐥𝐞: `.vcard Doma`");
        }

        const quotedParticipant = mek.message?.extendedTextMessage?.contextInfo?.participant;
        if (!quotedParticipant) {
            return reply("❌ *𝐑é𝐩𝐨𝐧𝐬𝐞 𝐦𝐚𝐧𝐪𝐮𝐚𝐧𝐭𝐞!*\n\n➤ 𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝'𝐮𝐧 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐩𝐨𝐮𝐫 𝐜𝐫é𝐞𝐫 𝐬𝐨𝐧 𝐜𝐨𝐧𝐭𝐚𝐜𝐭.");
        }

        const cleanNumber = quotedParticipant.split('@')[0];
        const contactName = args.join(" ");

        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL;waid=${cleanNumber}:${cleanNumber}\nEND:VCARD`;

        await conn.sendMessage(from, {
            contacts: { displayName: contactName, contacts: [{ vcard }] }
        }, { quoted: mek });
    } catch (error) {
        reply("❌ *𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞!*\n\n🔄 𝐑é𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
    }
});
