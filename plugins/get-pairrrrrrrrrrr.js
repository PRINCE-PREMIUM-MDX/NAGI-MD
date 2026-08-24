const { cmd, commands } = require('../arslan');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpaijsksnsr", "pairing", "clonebnsjdndnznot"],
    react: "✅",
    desc: "Get pairing code for Nagi-Md bot",
    category: "download",
    use: ".pair 92323***",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // Extract phone number from command
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // Validate phone number format
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ 𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧 𝐧𝐮𝐦𝐞́𝐫𝐨 𝐯𝐚𝐥𝐢𝐝𝐞 𝐬𝐚𝐧𝐬 `+`\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞: `.pair 92323***`");
        }

        // Make API request to get pairing code
        const response = await axios.get(`https://arslan-mini-bot-e4ec84c138eb.herokuapp.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐮 𝐜𝐨𝐝𝐞. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
        }

        const pairingCode = response.data.code;
        const doneMessage = "> *𝐀𝐏𝐏𝐀𝐈𝐑𝐈𝐀𝐆𝐄 𝐓𝐄𝐑𝐌𝐈𝐍𝐄́*";

        // Send initial message with formatting
        await reply(`${doneMessage}\n\n*𝐕𝐨𝐭𝐫𝐞 𝐜𝐨𝐝𝐞 𝐝'𝐚𝐩𝐩𝐚𝐢𝐫𝐢𝐚𝐠𝐞 𝐞𝐬𝐭:* ${pairingCode}`);

        // Optional 2-second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send clean code again
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐚𝐢𝐫 :", error);
        await reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
    }
});

cmd({
    pattern: "pair2",
    alias: ["getpair2", "reqpair", "clonebot2"],
    react: "📉",
    desc: "Get pairing code for Nagi-Md bot",
    category: "download",
    use: ".pair 92323XXX",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // Check if in group
        if (isGroup) {
            return await reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐞𝐧 𝐩𝐫𝐢𝐯𝐞́. 𝐄́𝐜𝐫𝐢𝐯𝐞𝐳-𝐦𝐨𝐢 𝐝𝐢𝐫𝐞𝐜𝐭𝐞𝐦𝐞𝐧𝐭.");
        }

        // Show processing reaction
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Extract phone number
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // Validate phone number
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ 𝐅𝐨𝐫𝐦𝐚𝐭 𝐝𝐞 𝐧𝐮𝐦𝐞́𝐫𝐨 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞!\n\n𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: `.pair 92323000000000`\n(𝐬𝐚𝐧𝐬 𝐥𝐞 𝐬𝐢𝐠𝐧𝐞 +)");
        }

        // Get pairing code from API
        const response = await axios.get(`https://arslan-mini-bot-e4ec84c138eb.herokuapp.com/code?number=${encodeURIComponent(phoneNumber)}`);
        
        if (!response.data?.code) {
            return await reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐮 𝐜𝐨𝐝𝐞. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
        }

        const pairingCode = response.data.code;
        
        // Send image with caption
        const sentMessage = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/lhfop4.png" },
            caption: `- *⍴ᥲіrіᥒg ᥴ᥆ძᥱ*\n\n 𝐔𝐧𝐞 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐚 𝐞́𝐭𝐞́ 𝐞𝐧𝐯𝐨𝐲𝐞́𝐞 𝐬𝐮𝐫 𝐯𝐨𝐭𝐫𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩. 𝐕𝐞́𝐫𝐢𝐟𝐢𝐞𝐳 𝐯𝐨𝐭𝐫𝐞 𝐭𝐞́𝐥𝐞́𝐩𝐡𝐨𝐧𝐞 𝐞𝐭 𝐜𝐨𝐩𝐢𝐞𝐳 𝐜𝐞 𝐜𝐨𝐝𝐞 𝐩𝐨𝐮𝐫 𝐨𝐛𝐭𝐞𝐧𝐢𝐫 𝐯𝐨𝐭𝐫𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧 𝐢𝐝.\n\n*🔢 𝐂𝐨𝐝𝐞 𝐝'𝐚𝐩𝐩𝐚𝐢𝐫𝐢𝐚𝐠𝐞*: *${pairingCode}*\n\n> *𝐂𝐨𝐩𝐢𝐞𝐳-𝐥𝐞 𝐜𝐢-𝐝𝐞𝐬𝐬𝐨𝐮𝐬 👇🏻*`
        }, { quoted: m });

        // Send clean code separately
        await reply(pairingCode);
        
        // Add ✅ reaction to the clean code message
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐚𝐢𝐫 :", error);
        await reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
    }
});
