const { cmd } = require('../arslan');
const { nagi-md } = require('../lib/style');

// ════════════════════════════════════════════════════════════
// 📁 ANTILINK - In-Memory Storage (no file system = no restart/reset issues)
// Ported from the Nagi-md repo's antilink fix, adapted to Nagi-md BOT's
// plugin format (arslan.js cmd() loader).
// ════════════════════════════════════════════════════════════
// antilinkGroups: Map<groupJid, boolean>
// antilinkWarnings: Map<"groupJid:senderJid", number>
const antilinkGroups = new Map();
const antilinkWarnings = new Map();

// Link detection patterns — social media + generic URLs
const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
    /https?:\/\/(www\.)?whatsapp\.com\/channel\/\S+/gi,
    /wa\.me\/\S+/gi,
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
    /https?:\/\/youtu\.be\/\S+/gi,
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
    /https?:\/\/fb\.me\/\S+/gi,
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?x\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?discord\.gg\/\S+/gi,
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
    /https?:\/\/bit\.ly\/\S+/gi,
    /https?:\/\/tinyurl\.com\/\S+/gi,
    /https?:\/\/t\.co\/\S+/gi,
    /https?:\/\/\S+\.\S{2,6}(\/\S*)?/gi,   // catch-all generic URL
];

// =========== ANTILINK ON/OFF COMMAND ===========
cmd({
    pattern: "antilink",
    alias: ["al"],
    desc: "Enable/disable antilink (warn + delete first, remove on second offense)",
    category: "group",
    react: "🔗",
    use: ".antilink on/off",
    filename: __filename
},
async (conn, mek, m, { from, args, isGroup, isOwner, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply(nagi-md('ANTILINK', '𝐆𝐫𝐨𝐮𝐩𝐞𝐬 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isOwner && !isAdmins) return reply(nagi-md('ANTILINK', '𝐀𝐝𝐦𝐢𝐧/𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isBotAdmins) return reply(nagi-md('ANTILINK', '𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧', '❌'));

        const action = (args[0] || '').toLowerCase();
        if (!['on', 'off'].includes(action)) {
            return reply(nagi-md('ANTILINK', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .antilink on/off', '❓'));
        }

        if (action === 'on') {
            antilinkGroups.set(from, true);
            reply(nagi-md('ANTILINK', '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅', '🟢'));
        } else {
            antilinkGroups.set(from, false);
            // Clear all warnings for this group
            for (const key of antilinkWarnings.keys()) {
                if (key.startsWith(from + ':')) antilinkWarnings.delete(key);
            }
            reply(nagi-md('ANTILINK', '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌', '🔴'));
        }

    } catch (e) {
        console.error('Antilink cmd error:', e);
        reply(nagi-md('ANTILINK', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});

// =========== ANTILINK DETECTOR (on every message body) ===========
// 1st offense: warn + delete link
// 2nd offense: remove from group
cmd({
    on: "body"
},
async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return;
        if (mek.key?.fromMe) return; // Never process bot's own messages for antilink

        // Check if antilink is enabled for this group
        if (!antilinkGroups.get(from)) return;

        // Reset regex lastIndex before testing (important for /g flags)
        const hasLink = linkPatterns.some(p => {
            p.lastIndex = 0;
            return p.test(body || '');
        });
        if (!hasLink) return;

        const warnKey = `${from}:${sender}`;
        const userWarnings = antilinkWarnings.get(warnKey) || 0;

        if (userWarnings === 0) {
            // ⚠️ FIRST OFFENSE: Warn + Delete message
            antilinkWarnings.set(warnKey, 1);

            try { await conn.sendMessage(from, { delete: mek.key }); } catch {}

            await conn.sendMessage(from, {
                text: `⚠️ *𝐀𝐕𝐄𝐑𝐓𝐈𝐒𝐒𝐄𝐌𝐄𝐍𝐓!* @${sender.split('@')[0]}\n\n🔗 𝐋𝐞𝐬 𝐥𝐢𝐞𝐧𝐬 𝐬𝐨𝐧𝐭 𝐢𝐧𝐭𝐞𝐫𝐝𝐢𝐭𝐬 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞!\n🗑️ 𝐕𝐨𝐭𝐫𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐚 𝐞́𝐭𝐞́ 𝐬𝐮𝐩𝐩𝐫𝐢𝐦𝐞́.\n\n❗ _𝐋𝐚 𝐩𝐫𝐨𝐜𝐡𝐚𝐢𝐧𝐞 𝐟𝐨𝐢𝐬 𝐯𝐨𝐮𝐬 𝐬𝐞𝐫𝐞𝐳 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞._`,
                mentions: [sender]
            }, { quoted: mek });

        } else {
            // 🚫 SECOND OFFENSE: Delete + Remove from group
            antilinkWarnings.delete(warnKey);

            try { await conn.sendMessage(from, { delete: mek.key }); } catch {}

            await conn.sendMessage(from, {
                text: `🚫 *𝐄𝐗𝐏𝐔𝐋𝐒𝐄́!* @${sender.split('@')[0]}\n\n🔗 𝐕𝐨𝐮𝐬 𝐚𝐯𝐢𝐞𝐳 𝐞́𝐭𝐞́ 𝐚𝐯𝐞𝐫𝐭𝐢 𝐩𝐨𝐮𝐫 𝐞𝐧𝐯𝐨𝐢 𝐝𝐞 𝐥𝐢𝐞𝐧𝐬.\n👮 𝐕𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 𝐞́𝐭𝐞́ 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.`,
                mentions: [sender]
            }, { quoted: mek });

            await conn.groupParticipantsUpdate(from, [sender], "remove");
        }

    } catch (e) {
        console.error('Antilink detect error:', e);
    }
});
