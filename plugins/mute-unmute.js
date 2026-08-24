const { cmd } = require('../arslan');
const { nagie-md } = require('../lib/style');

// ════════════════════════════════════════════════════════════
// 📁 MUTE - Répondez à un message avec .mute <nombre>
// Chaque message envoyé par la personne mise en sourdine est supprimé.
// Après <nombre> messages supprimés, elle est expulsée du groupe.
// ════════════════════════════════════════════════════════════
const mutedUsers = new Map(); // "groupJid:userJid" -> { limit, count }

cmd({
    pattern: "mute",
    desc: "Mettre en sourdine un membre (répondre à son message + nombre de messages toléré)",
    category: "group",
    react: "🔇",
    use: ".mute <nombre> (en répondant à un message)",
    filename: __filename
},
async (conn, mek, m, { from, args, isGroup, isOwner, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply(nagi-md('MUTE', '𝐆𝐫𝐨𝐮𝐩𝐞𝐬 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isOwner && !isAdmins) return reply(nagie-md('MUTE', '𝐀𝐝𝐦𝐢𝐧/𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isBotAdmins) return reply(nagi-md('MUTE', '𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧', '❌'));

        const target = mek.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target) return reply(nagi-md('MUTE', '𝐑𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 𝐚̀ 𝐦𝐞𝐭𝐭𝐫𝐞 𝐞𝐧 𝐬𝐨𝐮𝐫𝐝𝐢𝐧𝐞', '❓'));

        const limit = parseInt(args[0]);
        if (!limit || limit < 1) return reply(nagi-md('MUTE', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .mute <𝐧𝐨𝐦𝐛𝐫𝐞> (𝐞𝐱: .mute 5)', '❓'));

        const key = `${from}:${target}`;
        mutedUsers.set(key, { limit, count: 0 });

        await conn.sendMessage(from, {
            text: `🔇 *𝐒𝐎𝐔𝐑𝐃𝐈𝐍𝐄 𝐀𝐂𝐓𝐈𝐕𝐄́𝐄* @${target.split('@')[0]}\n\n𝐒𝐞𝐬 ${limit} 𝐩𝐫𝐨𝐜𝐡𝐚𝐢𝐧𝐬 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐬𝐞𝐫𝐨𝐧𝐭 𝐬𝐮𝐩𝐩𝐫𝐢𝐦𝐞́𝐬. 𝐀𝐩𝐫𝐞̀𝐬 𝐜𝐞𝐥𝐚, 𝐢𝐥/𝐞𝐥𝐥𝐞 𝐬𝐞𝐫𝐚 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́(𝐞).`,
            mentions: [target]
        }, { quoted: mek });

    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐦𝐮𝐭𝐞 :', e);
        reply(nagi-md('MUTE', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});

cmd({
    pattern: "unmute",
    desc: "Retirer la sourdine d'un membre (répondre à son message)",
    category: "group",
    react: "🔊",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isOwner, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply(nagi-md('UNMUTE', '𝐆𝐫𝐨𝐮𝐩𝐞𝐬 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isOwner && !isAdmins) return reply(yxzMiniBot('UNMUTE', '𝐀𝐝𝐦𝐢𝐧/𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));

        const target = mek.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target) return reply(nagi-md('UNMUTE', '𝐑𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 𝐚̀ 𝐫𝐞́𝐭𝐚𝐛𝐥𝐢𝐫', '❓'));

        const key = `${from}:${target}`;
        if (!mutedUsers.has(key)) return reply(nagi-md('UNMUTE', '𝐂𝐞𝐭𝐭𝐞 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 𝐧'+"'"+'𝐞𝐬𝐭 𝐩𝐚𝐬 𝐞𝐧 𝐬𝐨𝐮𝐫𝐝𝐢𝐧𝐞', '❓'));

        mutedUsers.delete(key);
        await conn.sendMessage(from, {
            text: `🔊 *𝐒𝐎𝐔𝐑𝐃𝐈𝐍𝐄 𝐑𝐄𝐓𝐈𝐑𝐄́𝐄* @${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: mek });

    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐮𝐧𝐦𝐮𝐭𝐞 :', e);
        reply(nagi-md('UNMUTE', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});

// =========== MUTE DETECTOR (sur chaque message) ===========
cmd({
    on: "body"
},
async (conn, mek, m, { from, sender, isGroup, isBotAdmins }) => {
    try {
        if (!isGroup || !isBotAdmins) return;
        if (mek.key?.fromMe) return;

        const key = `${from}:${sender}`;
        const muted = mutedUsers.get(key);
        if (!muted) return;

        try { await conn.sendMessage(from, { delete: mek.key }); } catch {}
        muted.count++;

        if (muted.count >= muted.limit) {
            mutedUsers.delete(key);
            await conn.sendMessage(from, {
                text: `🚫 *𝐄𝐗𝐏𝐔𝐋𝐒𝐄́!* @${sender.split('@')[0]}\n\n𝐋𝐢𝐦𝐢𝐭𝐞 𝐝𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐞𝐧 𝐬𝐨𝐮𝐫𝐝𝐢𝐧𝐞 𝐚𝐭𝐭𝐞𝐢𝐧𝐭𝐞.`,
                mentions: [sender]
            }, { quoted: mek });
            await conn.groupParticipantsUpdate(from, [sender], "remove");
        }
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐞́𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐦𝐮𝐭𝐞 :', e);
    }
});
