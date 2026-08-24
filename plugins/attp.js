const { cmd } = require('../arslan')
const { fetchGif, gifToSticker } = require('../lib/sticker-utils')

cmd({
    pattern: "attp",
    alias: ["attptext", "textsticker", "namesticker", "stickername", "at", "att", "atp"],
    react: "✨",
    desc: "Convert text into animated sticker",
    category: "sticker",
    use: ".attp <text>",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(
                "*🥺 𝐕𝐄𝐔𝐈𝐋𝐋𝐄𝐙 𝐄𝐍𝐓𝐑𝐄𝐑 𝐔𝐍 𝐓𝐄𝐗𝐓𝐄 𝐏𝐎𝐔𝐑 𝐋𝐄 𝐒𝐓𝐈𝐂𝐊𝐄𝐑*\n\n" +
                "*𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧:* `.attp 𝐕𝐎𝐓𝐑𝐄 𝐓𝐄𝐗𝐓𝐄`\n\n" +
                "*𝐄𝐱𝐞𝐦𝐩𝐥𝐞:*\n.attp Bilal"
            )
        }

        reply("*✨ 𝐂𝐑𝐄́𝐀𝐓𝐈𝐎𝐍 𝐃𝐔 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐄𝐍 𝐂𝐎𝐔𝐑𝐒*\n*𝐕𝐄𝐔𝐈𝐋𝐋𝐄𝐙 𝐏𝐀𝐓𝐈𝐄𝐍𝐓𝐄𝐑...☺️*")

        const text = encodeURIComponent(args.join(" "))
        const gifBuffer = await fetchGif(
            `https://api-fix.onrender.com/api/maker/attp?text=${text}`
        )

        const sticker = await gifToSticker(gifBuffer)

        await conn.sendMessage(
            m.chat,
            { sticker },
            { quoted: mek }
        )

    } catch (e) {
        console.log("ATTP ERROR:", e)
        reply("*❌ 𝐄𝐑𝐑𝐄𝐔𝐑 𝐋𝐎𝐑𝐒 𝐃𝐄 𝐋𝐀 𝐂𝐑𝐄́𝐀𝐓𝐈𝐎𝐍 𝐃𝐔 𝐒𝐓𝐈𝐂𝐊𝐄𝐑 🥺*")
    }
})
