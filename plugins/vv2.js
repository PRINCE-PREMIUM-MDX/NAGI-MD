const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { cmd } = require('../arslan');

async function downloadMedia(msgContent, type) {
    const stream = await downloadContentFromMessage(msgContent, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
}

cmd({
    pattern: "vv2",
    desc: "Propriétaire uniquement - Renvoie le média vue-unique cité (alternative)",
    category: "owner",
    react: "👀",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner) return; // Silencieux si pas propriétaire

        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) {
            return reply("*🔮 𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐯𝐮𝐞 𝐮𝐧𝐢𝐪𝐮𝐞!*");
        }

        let type, content;
        if (quoted.imageMessage) { type = 'image'; content = quoted.imageMessage; }
        else if (quoted.videoMessage) { type = 'video'; content = quoted.videoMessage; }
        else if (quoted.audioMessage) { type = 'audio'; content = quoted.audioMessage; }
        else {
            return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐢𝐦𝐚𝐠𝐞, 𝐯𝐢𝐝𝐞́𝐨 𝐞𝐭 𝐚𝐮𝐝𝐢𝐨 𝐬𝐨𝐧𝐭 𝐬𝐮𝐩𝐩𝐨𝐫𝐭é𝐬.");
        }

        const buffer = await downloadMedia(content, type);
        let messageContent = {};

        if (type === 'image') {
            messageContent = { image: buffer, caption: content.caption || '', mimetype: content.mimetype || 'image/jpeg' };
        } else if (type === 'video') {
            messageContent = { video: buffer, caption: content.caption || '', mimetype: content.mimetype || 'video/mp4' };
        } else if (type === 'audio') {
            messageContent = { audio: buffer, mimetype: 'audio/mp4', ptt: content.ptt || false };
        }

        await conn.sendMessage(from, messageContent, { quoted: mek });
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐯𝐯𝟐 :", error);
        reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐥𝐨𝐫𝐬 𝐝𝐞 𝐥𝐚 𝐫é𝐜𝐮𝐩é𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞:\n" + error.message);
    }
});
