const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { cmd } = require('../arslan');

async function downloadMedia(msgContent, type) {
    const stream = await downloadContentFromMessage(msgContent, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
}

cmd({
    pattern: "tovv",
    alias: ["toviewonce"],
    react: '📥',
    desc: "Propriétaire uniquement - Transforme un média cité en vue unique",
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
            return reply("*_👀 𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞́𝐝𝐢𝐚 𝐩𝐨𝐮𝐫 𝐥𝐞 𝐭𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐞𝐫 𝐞𝐧 𝐯𝐮𝐞 𝐮𝐧𝐢𝐪𝐮𝐞_*");
        }

        let type, content, mimetype, caption;
        if (quoted.imageMessage) {
            type = 'image'; content = quoted.imageMessage;
            mimetype = content.mimetype || 'image/jpeg'; caption = content.caption || '';
        } else if (quoted.videoMessage) {
            type = 'video'; content = quoted.videoMessage;
            mimetype = content.mimetype || 'video/mp4'; caption = content.caption || '';
        } else if (quoted.audioMessage) {
            type = 'audio'; content = quoted.audioMessage;
            mimetype = 'audio/mp4';
        } else {
            return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐢𝐦𝐚𝐠𝐞, 𝐯𝐢𝐝𝐞́𝐨 𝐞𝐭 𝐚𝐮𝐝𝐢𝐨 𝐬𝐨𝐧𝐭 𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐞́𝐬.");
        }

        const buffer = await downloadMedia(content, type);
        const forwardData = { [type]: buffer, mimetype, viewOnce: true };
        if (caption !== undefined) forwardData.caption = caption;
        if (type === 'audio') forwardData.ptt = content.ptt || false;

        await conn.sendMessage(from, forwardData, { quoted: mek });
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐭𝐨𝐯𝐯 :", error);
        reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: " + error.message);
    }
});
