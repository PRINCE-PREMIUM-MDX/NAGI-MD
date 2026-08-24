const { cmd } = require('../arslan')
const yts = require('yt-search')

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    react: "☺️",
    desc: "Search videos on YouTube",
    category: "search",
    use: ".yts <video name>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "*🔍 𝐕𝐎𝐔𝐒 𝐕𝐎𝐔𝐋𝐄𝐙 𝐑𝐄𝐂𝐇𝐄𝐑𝐂𝐇𝐄𝐑 𝐃𝐄𝐒 𝐕𝐈𝐃𝐄́𝐎𝐒 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 🥺*\n\n" +
                "*𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧:*\n.yts 𝐍𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨\n\n" +
                "*𝐄𝐱𝐞𝐦𝐩𝐥𝐞:*\n.yts Tajdar e Haram"
            )
        }

        const search = await yts(q)
        const videos = search.videos.slice(0, 10) // top 10 results

        if (videos.length === 0) {
            return reply("*❌ 𝐀𝐔𝐂𝐔𝐍𝐄 𝐕𝐈𝐃𝐄́𝐎 𝐓𝐑𝐎𝐔𝐕𝐄́𝐄 🥺*")
        }

        let text = "*📺 𝐑𝐄́𝐒𝐔𝐋𝐓𝐀𝐓𝐒 𝐃𝐄 𝐑𝐄𝐂𝐇𝐄𝐑𝐂𝐇𝐄 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 📺*\n\n"

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i]
            text +=
`*${i + 1}. ${v.title}*
⏱️ ${v.timestamp}
👁️ ${v.views} 𝐯𝐮𝐞𝐬
🔗 ${v.url}

`
        }

        text += "*👑 YXZ MINI BOT WHATSAPP BOT 👑*"

        await conn.sendMessage(
            from,
            { text },
            { quoted: mek }
        )

    } catch (e) {
        console.log("𝐄𝐑𝐑𝐄𝐔𝐑 𝐘𝐓𝐒 :", e)
        reply("*❌ 𝐄𝐑𝐑𝐄𝐔𝐑 𝐋𝐎𝐑𝐒 𝐃𝐄 𝐋𝐀 𝐑𝐄𝐂𝐇𝐄𝐑𝐂𝐇𝐄 🥺*")
    }
})
