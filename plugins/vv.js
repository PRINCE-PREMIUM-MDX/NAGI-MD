const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { cmd } = require('../arslan');

async function downloadMedia(msgContent, type) {
    const stream = await downloadContentFromMessage(msgContent, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
}

cmd({
    pattern: "vv",
    alias: ["sendme", "viewonce", "view", "open"],
    react: '👀',
    desc: "Propriétaire uniquement - Renvoie le média vue-unique cité",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner) {
            return reply("*_📛 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐫é𝐬𝐞𝐫𝐯é𝐞 𝐚𝐮 𝐩𝐫𝐨𝐩𝐫𝐢é𝐭𝐚𝐢𝐫𝐞_*");
        }

        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) {
            return reply("*_👀 𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐥𝐞 𝐬𝐚𝐮𝐯𝐞𝐠𝐚𝐫𝐝𝐞𝐫!_*");
        }

        let type, content;
        if (quoted.imageMessage) { type = 'image'; content = quoted.imageMessage; }
        else if (quoted.videoMessage) { type = 'video'; content = quoted.videoMessage; }
        else if (quoted.audioMessage) { type = 'audio'; content = quoted.audioMessage; }
        else if (quoted.stickerMessage) { type = 'sticker'; content = quoted.stickerMessage; }

        let forwardData = {};

        if (type === 'image') {
            const buffer = await downloadMedia(content, 'image');
            forwardData = { image: buffer, caption: content.caption || '', mimetype: content.mimetype || 'image/jpeg' };
        } else if (type === 'video') {
            const buffer = await downloadMedia(content, 'video');
            forwardData = { video: buffer, caption: content.caption || '', mimetype: content.mimetype || 'video/mp4' };
        } else if (type === 'audio') {
            const buffer = await downloadMedia(content, 'audio');
            forwardData = { audio: buffer, mimetype: 'audio/mp4', ptt: content.ptt || false };
        } else if (type === 'sticker') {
            const buffer = await downloadMedia(content, 'sticker');
            forwardData = { sticker: buffer };
        } else if (quoted.conversation || quoted.extendedTextMessage?.text) {
            forwardData = { text: quoted.conversation || quoted.extendedTextMessage.text };
        } else {
            return reply("❌ 𝐓𝐲𝐩𝐞 𝐝𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐧𝐨𝐧 𝐬𝐮𝐩𝐩𝐨𝐫𝐭é 𝐩𝐨𝐮𝐫 𝐜𝐞 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫𝐭.");
        }

        await conn.sendMessage(from, forwardData, { quoted: mek });
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐯𝐯 :", error);
        reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: " + error.message);
    }
});
