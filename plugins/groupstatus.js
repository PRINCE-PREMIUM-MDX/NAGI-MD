const { cmd } = require("../arslan");

cmd({
    pattern: "groupstatus",
    alias: ["gstatus", "poststatus", "statuspost"],
    desc: "Post text or media to WhatsApp Status",
    category: "group",
    react: "📡",
    filename: __filename
},
async (conn, mek, m, { body, reply, pushname }) => {
    try {

        const caption = body.split(" ").slice(1).join(" ");

        // TEXT STATUS
        if (!m.quoted && caption) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    text:
`╭━━〔 𝐍agi-𝐌d 〕━━⬣
┃ 👤 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 : ${pushname}
┃ ⏰ 𝐇𝐞𝐮𝐫𝐞 : ${new Date().toLocaleString()}
┃
┃ 💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞:
┃ ${caption}
╰━━━━━━━━━━━━━━━━⬣`
                }
            );

            return reply("✅ 𝐒𝐭𝐚𝐭𝐮𝐭 𝐭𝐞𝐱𝐭𝐞 𝐩𝐮𝐛𝐥𝐢𝐞́ 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.");
        }

        if (!m.quoted) {
            return reply(
                "❌ 𝐑𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧𝐞 𝐢𝐦𝐚𝐠𝐞, 𝐯𝐢𝐝𝐞́𝐨, 𝐚𝐮𝐝𝐢𝐨 𝐨𝐮 𝐬𝐭𝐢𝐜𝐤𝐞𝐫.\n\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞:\n.groupstatus 𝐁𝐨𝐧𝐣𝐨𝐮𝐫"
            );
        }

        const quoted = m.quoted;
        const media = await quoted.download();

        // IMAGE
        if (quoted.imageMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    image: media,
                    caption:
`📸 𝐍agi-𝐌d

👤 𝐏𝐮𝐛𝐥𝐢𝐞́ 𝐩𝐚𝐫: ${pushname}
🕒 ${new Date().toLocaleString()}

${caption || "𝐒𝐚𝐧𝐬 𝐥𝐞́𝐠𝐞𝐧𝐝𝐞"}`
                }
            );

            return reply("✅ 𝐒𝐭𝐚𝐭𝐮𝐭 𝐢𝐦𝐚𝐠𝐞 𝐩𝐮𝐛𝐥𝐢𝐞́.");
        }

        // VIDEO
        if (quoted.videoMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    video: media,
                    caption:
`🎥 𝐍agi-𝐌d

👤 𝐏𝐮𝐛𝐥𝐢𝐞́ 𝐩𝐚𝐫: ${pushname}
🕒 ${new Date().toLocaleString()}

${caption || "𝐒𝐚𝐧𝐬 𝐥𝐞́𝐠𝐞𝐧𝐝𝐞"}`
                }
            );

            return reply("✅ 𝐒𝐭𝐚𝐭𝐮𝐭 𝐯𝐢𝐝𝐞́𝐨 𝐩𝐮𝐛𝐥𝐢𝐞́.");
        }

        // AUDIO
        if (quoted.audioMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    audio: media,
                    mimetype: "audio/mp4",
                    ptt: false
                }
            );

            return reply("✅ 𝐒𝐭𝐚𝐭𝐮𝐭 𝐚𝐮𝐝𝐢𝐨 𝐩𝐮𝐛𝐥𝐢𝐞́.");
        }

        // STICKER
        if (quoted.stickerMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    sticker: media
                }
            );

            return reply("✅ 𝐒𝐭𝐚𝐭𝐮𝐭 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐩𝐮𝐛𝐥𝐢𝐞́.");
        }

        return reply("❌ 𝐓𝐲𝐩𝐞 𝐝𝐞 𝐦𝐞́𝐝𝐢𝐚 𝐧𝐨𝐧 𝐬𝐮𝐩𝐩𝐨𝐫𝐭𝐞́.");

    } catch (err) {
        console.log("GROUPSTATUS ERROR:", err);

        return reply(
`❌ 𝐄𝐑𝐑𝐄𝐔𝐑 𝐒𝐓𝐀𝐓𝐔𝐓 NAGI-MD

${err.message}`
        );
    }
});
