const { cmd } = require('../arslan');

function parseTimer(args) {
    if (args[1] === 'second') return args[0] * 1000;
    if (args[1] === 'minute') return args[0] * 60000;
    if (args[1] === 'hour') return args[0] * 3600000;
    if (args[1] === 'day') return args[0] * 86400000;
    return null;
}

cmd({
    pattern: "opentime",
    react: "🔖",
    desc: "Ouvrir le groupe après un délai",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        if (!isAdmins) return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐜𝐢.");

        const timer = parseTimer(args);
        if (!timer) return reply('*𝐂𝐡𝐨𝐢𝐬𝐢𝐬𝐬𝐞𝐳:*\nsecond\nminute\nhour\nday\n\n*𝐄𝐱𝐞𝐦𝐩𝐥𝐞*\n10 second');

        reply(`⏳ 𝐎𝐮𝐯𝐞𝐫𝐭𝐮𝐫𝐞 𝐝𝐚𝐧𝐬 ${q}`);
        setTimeout(async () => {
            await conn.groupSettingUpdate(from, 'not_announcement');
            reply(`🔓 𝐋𝐄 𝐆𝐑𝐎𝐔𝐏𝐄 𝐄𝐒𝐓 𝐌𝐀𝐈𝐍𝐓𝐄𝐍𝐀𝐍𝐓 𝐎𝐔𝐕𝐄𝐑𝐓, 𝐥𝐞𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐞́𝐜𝐫𝐢𝐫𝐞.`);
        }, timer);
    } catch (e) {
        reply('*❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞!*');
        console.error(e);
    }
});

cmd({
    pattern: "closetime",
    react: "🔖",
    desc: "Fermer le groupe après un délai",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        if (!isAdmins) return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐜𝐢.");

        const timer = parseTimer(args);
        if (!timer) return reply('*𝐂𝐡𝐨𝐢𝐬𝐢𝐬𝐬𝐞𝐳:*\nsecond\nminute\nhour\nday\n\n*𝐄𝐱𝐞𝐦𝐩𝐥𝐞*\n10 second');

        reply(`⏳ 𝐅𝐞𝐫𝐦𝐞𝐭𝐮𝐫𝐞 𝐝𝐚𝐧𝐬 ${q}`);
        setTimeout(async () => {
            await conn.groupSettingUpdate(from, 'announcement');
            reply(`🔐 𝐋𝐄 𝐆𝐑𝐎𝐔𝐏𝐄 𝐄𝐒𝐓 𝐌𝐀𝐈𝐍𝐓𝐄𝐍𝐀𝐍𝐓 𝐅𝐄𝐑𝐌𝐄́, 𝐬𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 é𝐜𝐫𝐢𝐫𝐞.`);
        }, timer);
    } catch (e) {
        reply('*❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞!*');
        console.error(e);
    }
});
