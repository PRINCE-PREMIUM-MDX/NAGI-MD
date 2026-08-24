const { cmd } = require('../arslan');
const config = require('../config');

cmd({
    pattern: "getpp",
    alias: ["xpp"],
    desc: "Récupérer la photo de profil d'un utilisateur",
    category: "tools",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, isGroup }) => {
    try {
        const quotedParticipant = mek.message?.extendedTextMessage?.contextInfo?.participant;
        const quotedMsg = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        let targetJid;

        if (isGroup) {
            if (quotedParticipant && quotedMsg) {
                targetJid = quotedParticipant;
            } else {
                return reply("❌ 𝐑𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞 𝐪𝐮𝐞𝐥𝐪𝐮'𝐮𝐧 𝐩𝐨𝐮𝐫 𝐨𝐛𝐭𝐞𝐧𝐢𝐫 𝐬𝐚 𝐩𝐡𝐨𝐭𝐨 𝐝𝐞 𝐩𝐫𝐨𝐟𝐢𝐥.");
            }
        } else {
            targetJid = sender;
        }

        let imageUrl;
        try {
            imageUrl = await conn.profilePictureUrl(targetJid, 'image');
        } catch {
            imageUrl = config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png';
        }

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `✅ 𝐏𝐡𝐨𝐭𝐨 𝐝𝐞 𝐩𝐫𝐨𝐟𝐢𝐥 𝐝𝐞 @${targetJid.split('@')[0]}`,
            mentions: [targetJid]
        }, { quoted: mek });

    } catch (err) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐠𝐞𝐭𝐩𝐩 :", err);
        reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐚 𝐩𝐡𝐨𝐭𝐨 𝐝𝐞 𝐩𝐫𝐨𝐟𝐢𝐥.");
    }
});
