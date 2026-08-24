const { cmd } = require('../arslan');
const fetch = require('node-fetch');

cmd({
    pattern: 'gitclone',
    alias: ["git"],
    desc: "Télécharger un dépôt GitHub en fichier zip",
    react: '📦',
    category: "downloader",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args[0]) {
        return reply("❌ 𝐎𝐮̀ 𝐞𝐬𝐭 𝐥𝐞 𝐥𝐢𝐞𝐧 𝐆𝐢𝐭𝐇𝐮𝐛?\n\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞:\n.gitclone https://github.com/username/repository");
    }
    if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) {
        return reply("⚠️ 𝐋𝐢𝐞𝐧 𝐆𝐢𝐭𝐇𝐮𝐛 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
    }

    try {
        const regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
        const match = args[0].match(regex);
        if (!match) throw new Error("𝐔𝐑𝐋 𝐆𝐢𝐭𝐇𝐮𝐛 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");

        const [, username, repo] = match;
        const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;

        const response = await fetch(zipUrl, { method: "HEAD" });
        if (!response.ok) throw new Error("*𝐃𝐞́𝐩𝐨̂𝐭 𝐢𝐧𝐭𝐫𝐨𝐮𝐯𝐚𝐛𝐥𝐞*");

        const contentDisposition = response.headers.get("content-disposition");
        const fileName = contentDisposition ? contentDisposition.match(/filename=(.*)/)[1] : `${repo}.zip`;

        reply(`📥 *𝐓𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭 𝐝𝐮 𝐝𝐞́𝐩𝐨̂𝐭...*\n\n*𝐃𝐞́𝐩𝐨̂𝐭:* ${username}/${repo}\n*𝐅𝐢𝐜𝐡𝐢𝐞𝐫:* ${fileName}\n\n> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium`);

        await conn.sendMessage(from, {
            document: { url: zipUrl },
            fileName: fileName,
            mimetype: 'application/zip'
        }, { quoted: mek });

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐠𝐢𝐭𝐜𝐥𝐨𝐧𝐞 :", error);
        reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐮 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
    }
});
