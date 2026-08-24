const { cmd } = require('../arslan');

cmd({
    pattern: "getimage",
    desc: "Envoyer une image depuis une URL",
    category: "fun",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        if (!args[0]) {
            return reply("*_❌ 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐟𝐨𝐮𝐫𝐧𝐢𝐫 𝐮𝐧𝐞 𝐔𝐑𝐋 𝐝'𝐢𝐦𝐚𝐠𝐞!_*");
        }
        const url = args[0];
        await conn.sendMessage(from, {
            image: { url },
            caption: "*_𝐕𝐨𝐢𝐜𝐢 𝐯𝐨𝐭𝐫𝐞 𝐢𝐦𝐚𝐠𝐞!_*",
            mimetype: 'image/png'
        }, { quoted: mek });
    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐬𝐞𝐧𝐝𝐢𝐦𝐚𝐠𝐞 :", e);
        reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: " + e.message);
    }
});
