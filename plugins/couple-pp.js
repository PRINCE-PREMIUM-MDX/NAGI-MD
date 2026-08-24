const { cmd } = require('../arslan');

const coupleImages = [
    { male: 'https://files.catbox.moe/cak9j9.jpg', female: 'https://files.catbox.moe/58gaj4.jpg' },
    { male: 'https://files.catbox.moe/mhhj6u.jpg', female: 'https://files.catbox.moe/j1f3bp.jpg' },
    { male: 'https://files.catbox.moe/ksoo87.jpg', female: 'https://files.catbox.moe/e6tjo9.jpg' },
    { male: 'https://files.catbox.moe/za4r2m.jpg', female: 'https://files.catbox.moe/bq5gsg.jpg' },
    { male: 'https://files.catbox.moe/qkz4tf.jpg', female: 'https://files.catbox.moe/vjzafq.jpg' },
    { male: 'https://files.catbox.moe/kqzsfc.jpg', female: 'https://files.catbox.moe/64kxyi.jpg' },
    { male: 'https://files.catbox.moe/jo7193.jpg', female: 'https://files.catbox.moe/x7snju.jpg' },
    { male: 'https://files.catbox.moe/0s8f4k.jpg', female: 'https://files.catbox.moe/xlgep0.jpg' },
    { male: 'https://files.catbox.moe/iaxx2c.jpg', female: 'https://files.catbox.moe/cgkcmj.jpg' },
    { male: 'https://files.catbox.moe/3z1y8i.jpg', female: 'https://files.catbox.moe/0wo9j9.jpg' }
];

cmd({
    pattern: "couplepp",
    alias: ["couple", "cpp"],
    react: '💑',
    desc: "Obtenir des images de couple (photo de profil duo)",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        reply("*💑 𝐑é𝐜𝐮𝐩é𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐞𝐬 𝐢𝐦𝐚𝐠𝐞𝐬 𝐝𝐞 𝐜𝐨𝐮𝐩𝐥𝐞...*");

        const { male, female } = coupleImages[Math.floor(Math.random() * coupleImages.length)];

        if (male) {
            await conn.sendMessage(from, {
                image: { url: male },
                caption: "*👨 𝐈𝐦𝐚𝐠𝐞 𝐝𝐞 𝐩𝐫𝐨𝐟𝐢𝐥 𝐦𝐚𝐬𝐜𝐮𝐥𝐢𝐧*\n\n> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium"
            }, { quoted: mek });
        }
        if (female) {
            await conn.sendMessage(from, {
                image: { url: female },
                caption: "*👩 𝐈𝐦𝐚𝐠𝐞 𝐝𝐞 𝐩𝐫𝐨𝐟𝐢𝐥 𝐟é𝐦𝐢𝐧𝐢𝐧*\n\n> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium"
            }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply("*❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞*");
    }
});
