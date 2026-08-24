const { cmd } = require('../arslan');
const fetch = require('node-fetch');

cmd({
    pattern: "phlogo",
    alias: ["pornhub", "ph"],
    desc: "*ɢéɴéʀᴇ ᴜɴ ʟᴏɢᴏ ᴘᴏʀɴʜᴜʙ ᴀᴠᴇᴄ ᴅᴇᴜx ᴛᴇxᴛᴇs*",
    react: "👨🏻‍🎨",
    category: "info",
    filename: __filename,
}, 
async (conn, mek, m, {
    args, reply
}) => {
    try {
        const text = args.join(" ");
        if (!text || !text.includes('|')) {
            return reply(`*❌ Format invalide !*\n➤ Exemple : \`.phlogo sidd | prime\``);
        }

        const [text1, text2] = text.split('|').map(t => t.trim());
        if (!text1 || !text2) return reply("*❌ Texte manquant. Donne deux textes séparés par `|`*");

        const apiUrl = `https://apikey.sazxofficial.web.id/api/imagecreator/pornhub?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || !json.result) {
            return reply("*⚠️ L'API semble être hors ligne ou ne répond pas.*");
        }

        await conn.sendMessage(m.chat, {
            image: { url: json.result },
            caption: `╭━━〔𝐍agi-𝐌d〕━⬣\n┃❍ *✅ʟᴏɢᴏ ᴄʀᴇ́ᴇ́ ᴀᴠᴇᴄ sᴜᴄᴄᴇ̀s !*\n┃❍ *ᴛᴇxᴛᴇ 1:* ${text1}\n┃❍ *ᴛᴇxᴛᴇ 2:* ${text2}\n╰━━━━━━━━━━━━━━━⬣\n> *𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium*`,
            contextInfo: {
                externalAdReply: {
                    title: "𝐏rince 𝐏remium ʟᴏɢᴏ ɢᴇɴᴇʀᴀᴛᴏʀ",
                    body: "𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium",
                    thumbnailUrl: json.result,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: json.result
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.error("Erreur phlogo :", e);
        reply("*⚠️ Une erreur est survenue lors de la génération du logo.*");
    }
});
