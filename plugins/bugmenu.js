const { cmd } = require('../arslan');
const config = require('../config');

cmd({
    pattern: "bugmenu",
    alias: ["bughelp", "buglist"],
    react: "🧪",
    desc: "Affiche le menu des tests BUG",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {

        const bugMenu = `╭──────────────◇
│ ✧ 🧪 *𝐍agi-𝐌d — 𝐁𝐔𝐆 𝐌𝐄𝐍𝐔*
╰──────────────◇

╭─「 *𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒* 」
│
│ 🤖 *.bug android 509xxxxxxx*
│ 🍎 *.bug ios 509xxxxxxx*
│ ⬜ *.bug blank 509xxxxxxx*
│ 💬 *.bug blanking 509xxxxxxx*
│ 📨 *.bug invite 509xxxxxxx*
│ 🍎 *.bug inviteios 509xxxxxxx*
│ 📢 *.bug channel 509xxxxxxx*
│ 💥 *.bug all 509xxxxxxx*
│
╰──────────────◇

╭─「 *𝐀𝐕𝐄𝐂 𝐔𝐍 𝐆𝐑𝐎𝐔𝐏𝐄* 」
│
│ Exemple :
│ *.bug all https://chat.whatsapp.com/xxx*
│
╰──────────────◇

╭─「 *𝐄𝐗𝐄𝐌𝐏𝐋𝐄* 」
│
│ 📱 *.bug ios 50912345678*
│ 🤖 *.bug android 50912345678*
│ 💥 *.bug all 50912345678*
│
╰──────────────◇

> 🛡️ *Mode : TEST SÉCURISÉ*
> 📌 *Utilisez uniquement sur une cible autorisée.*
> *𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium*`;

        await conn.sendMessage(
            from,
            {
                image: {
                    url: config.IMAGE_PATH || 'https://files.catbox.moe/lhfop4.png'
                },
                caption: bugMenu,
                footer: '🧪 NAGI-MD • BUG TEST MENU'
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('[BUGMENU ERROR]', e);
        reply(`❌ 𝐄𝐫𝐫𝐞𝐮𝐫 : ${e.message}`);
    }
});