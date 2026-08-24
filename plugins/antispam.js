const { cmd } = require('../arslan');
const { nagi-md } = require('../lib/style');

// ════════════════════════════════════════════════════════════
// 📁 ANTISPAM - Stockage en mémoire
// Détecte les envois trop rapides ou messages répétés en groupe.
// 1er avertissement: warn + suppression. 2e: expulsion.
// ════════════════════════════════════════════════════════════
const antispamGroups = new Map();      // groupJid -> boolean
const antispamWarnings = new Map();    // "groupJid:senderJid" -> count
const lastMessages = new Map();        // "groupJid:senderJid" -> { text, time }

const SPAM_INTERVAL_MS = 3000;   // messages envoyés à moins de 3s d'intervalle
const SPAM_REPEAT_LIMIT = 3;     // même texte répété 3 fois de suite

cmd({
    pattern: "antispam",
    alias: ["asp"],
    desc: "Activer/désactiver l'antispam (avertit puis expulse en cas de spam)",
    category: "group",
    react: "🚫",
    use: ".antispam on/off",
    filename: __filename
},
async (conn, mek, m, { from, args, isGroup, isOwner, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply(nagi-md('ANTISPAM', '𝐆𝐫𝐨𝐮𝐩𝐞𝐬 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isOwner && !isAdmins) return reply(nagi-md('ANTISPAM', '𝐀𝐝𝐦𝐢𝐧/𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        if (!isBotAdmins) return reply(nagi-md('ANTISPAM', '𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧', '❌'));

        const action = (args[0] || '').toLowerCase();
        if (!['on', 'off'].includes(action)) {
            return reply(nagi-md('ANTISPAM', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .antispam on/off', '❓'));
        }

        if (action === 'on') {
            antispamGroups.set(from, true);
            reply(nagi-md('ANTISPAM', '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅', '🟢'));
        } else {
            antispamGroups.set(from, false);
            for (const key of antispamWarnings.keys()) {
                if (key.startsWith(from + ':')) antispamWarnings.delete(key);
            }
            for (const key of lastMessages.keys()) {
                if (key.startsWith(from + ':')) lastMessages.delete(key);
            }
            reply(yxzMiniBot('ANTISPAM', '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌', '🔴'));
        }
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐚𝐧𝐭𝐢𝐬𝐩𝐚𝐦 :', e);
        reply(nagi-md('ANTISPAM', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});

// =========== ANTISPAM DETECTOR (sur chaque message) ===========
cmd({
    on: "body"
},
async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return;
        if (mek.key?.fromMe) return;
        if (!antispamGroups.get(from)) return;
        if (!body) return;

        const key = `${from}:${sender}`;
        const now = Date.now();
        const prev = lastMessages.get(key);

        let isSpam = false;
        let repeatCount = prev?.repeatCount || 0;

        if (prev) {
            const tooFast = (now - prev.time) < SPAM_INTERVAL_MS;
            const sameText = prev.text === body;
            if (sameText) repeatCount++; else repeatCount = 1;

            if (tooFast && sameText) isSpam = true;
            if (repeatCount >= SPAM_REPEAT_LIMIT) isSpam = true;
        } else {
            repeatCount = 1;
        }

        lastMessages.set(key, { text: body, time: now, repeatCount });

        if (!isSpam) return;

        const userWarnings = antispamWarnings.get(key) || 0;

        if (userWarnings === 0) {
            antispamWarnings.set(key, 1);
            try { await conn.sendMessage(from, { delete: mek.key }); } catch {}
            await conn.sendMessage(from, {
                text: `⚠️ *𝐀𝐕𝐄𝐑𝐓𝐈𝐒𝐒𝐄𝐌𝐄𝐍𝐓!* @${sender.split('@')[0]}\n\n🚫 𝐒𝐩𝐚𝐦 𝐝𝐞́𝐭𝐞𝐜𝐭𝐞́, 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐬𝐮𝐩𝐩𝐫𝐢𝐦𝐞́.\n\n❗ _𝐋𝐚 𝐩𝐫𝐨𝐜𝐡𝐚𝐢𝐧𝐞 𝐟𝐨𝐢𝐬 𝐯𝐨𝐮𝐬 𝐬𝐞𝐫𝐞𝐳 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞._`,
                mentions: [sender]
            }, { quoted: mek });
        } else {
            antispamWarnings.delete(key);
            lastMessages.delete(key);
            try { await conn.sendMessage(from, { delete: mek.key }); } catch {}
            await conn.sendMessage(from, {
                text: `🚫 *𝐄𝐗𝐏𝐔𝐋𝐒𝐄́!* @${sender.split('@')[0]}\n\n𝐕𝐨𝐮𝐬 𝐚𝐯𝐢𝐞𝐳 𝐞́𝐭𝐞́ 𝐚𝐯𝐞𝐫𝐭𝐢 𝐩𝐨𝐮𝐫 𝐬𝐩𝐚𝐦.\n👮 𝐕𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 𝐞́𝐭𝐞́ 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.`,
                mentions: [sender]
            }, { quoted: mek });
            await conn.groupParticipantsUpdate(from, [sender], "remove");
        }
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐞́𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐚𝐧𝐭𝐢𝐬𝐩𝐚𝐦 :', e);
    }
});
