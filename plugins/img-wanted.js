const axios = require('axios');
const FormData = require('form-data');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { cmd } = require('../arslan');

async function downloadMedia(msgContent, type) {
    const stream = await downloadContentFromMessage(msgContent, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
}

cmd({
    pattern: "wanted",
    alias: ["wantededit"],
    react: '📸',
    desc: "Créer une affiche 'wanted' à partir d'une image",
    category: "img_edit",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imgMsg = quoted?.imageMessage || mek.message?.imageMessage;

        if (!imgMsg) {
            return reply("*𝐑é𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧𝐞 𝐢𝐦𝐚𝐠𝐞 (𝐉𝐏𝐄𝐆/𝐏𝐍𝐆)*");
        }

        const buffer = await downloadMedia(imgMsg, 'image');

        const form = new FormData();
        form.append('fileToUpload', buffer, 'image.jpg');
        form.append('reqtype', 'fileupload');

        const uploadResponse = await axios.post("https://files.catbox.moe/lhfop4.png", form, { headers: form.getHeaders() });
        const imageUrl = uploadResponse.data;
        if (!imageUrl) throw new Error("𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐥'𝐮𝐩𝐥𝐨𝐚𝐝 𝐝𝐞 𝐥'𝐢𝐦𝐚𝐠𝐞");

        const apiUrl = `https://api.popcat.xyz/v2/wanted?image=${encodeURIComponent(imageUrl)}`;
        const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
        if (!response || !response.data) {
            return reply("❌ 𝐋'𝐀𝐏𝐈 𝐧'𝐚 𝐩𝐚𝐬 𝐫𝐞𝐧𝐯𝐨𝐲𝐞́ 𝐝'𝐢𝐦𝐚𝐠𝐞 𝐯𝐚𝐥𝐢𝐝𝐞. 𝐑é𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
        }

        const imageBuffer = Buffer.from(response.data, "binary");
        await conn.sendMessage(from, {
            image: imageBuffer,
            caption: `> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium`
        }, { quoted: mek });

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐰𝐚𝐧𝐭𝐞𝐝 :", error);
        reply(`❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${error.message || "𝐄𝐫𝐫𝐞𝐮𝐫 𝐢𝐧𝐜𝐨𝐧𝐧𝐮𝐞"}`);
    }
});
