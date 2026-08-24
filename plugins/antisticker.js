const { cmd } = require('../arslan');
const { nagi-md } = require('../lib/style');

// ════════════════════════════════════════════════════════════
// 📁 ANTISTICKER - Fonctionne en groupe ET en chat privé
// Groupe: activable par admin/owner, supprime + avertit + expulse au 2e envoi.
// Privé: activable par le propriétaire uniquement, supprime simplement le sticker.
// ════════════════════════════════════════════════════════════
const antistickerGroups = new Map();   // groupJid -> boolean
const antistickerPrivate = new Map();  // userJid -> boolean (chat privé)
const antistickerWarnings = new Map(); // "groupJid:senderJid" -> count

cmd({
    pattern: "antisticker",
    alias: ["asticker"],
    desc: "Activer/désactiver l'antisticker (groupe ou chat privé)",
    category: "group",
    react: "🚯",
    use: ".antisticker on/off",
    filename: __filename
},
async (conn, mek, m, { from, args, isGroup, isOwner, isAdmins, isBotAdmins, reply }) => {
    try {
        const action = (args[0] || '').toLowerCase();
        if (!['on', 'off'].includes(action)) {
            return reply(nagi-md('ANTISTICKER', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .antisticker on/off', '❓'));
        }

        if (isGroup) {
            if (!isOwner && !isAdmins) return reply(yxzMiniBot('ANTISTICKER', '𝐀𝐝𝐦𝐢𝐧/𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
            if (!isBotAdmins) return reply(yxzMiniBot('ANTISTICKER', '𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧', '❌'));

            antistickerGroups.set(from, action === 'on');
            if (action === 'off') {
                for (const key of antistickerWarnings.keys()) {
                    if (key.startsWith(from + ':')) antistickerWarnings.delete(key);
                }
            }
            return reply(nagi-md('ANTISTICKER', action === 'on' ? '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅ (𝐠𝐫𝐨𝐮𝐩𝐞)' : '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌ (𝐠𝐫𝐨𝐮𝐩𝐞)', action === 'on' ? '🟢' : '🔴'));
        } else {
            if (!isOwner) return reply(yxzMiniBot('ANTISTICKER', '𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));

            antistickerPrivate.set(from, action === 'on');
            return reply(nagi-md('ANTISTICKER', action === 'on' ? '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅ (𝐜𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐞́)' : '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌ (𝐜𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐞́)', action === 'on' ? '🟢' : '🔴'));
        }
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐚𝐧𝐭𝐢𝐬𝐭𝐢𝐜𝐤𝐞𝐫 :', e);
        reply(yxzMiniBot('ANTISTICKER', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});

// =========== ANTISTICKER DETECTOR ===========
cmd({
    on: "sticker"
},
async (conn, mek, m, { from, sender, isGroup, isAdmins, isBotAdmins }) => {
    try {
        if (mek.key?.fromMe) return;

        if (isGroup) {
            if (isAdmins || !isBotAdmins) return;
            if (!antistickerGroups.get(from)) return;

            const key = `${from}:${sender}`;
            const userWarnings = antistickerWarnings.get(key) || 0;

            if (userWarnings === 0) {
                antistickerWarnings.set(key, 1);
                try { await conn.sendMessage(from, { delete: mek.key }); } catch {}
                await conn.sendMessage(from, {
                    text: `⚠️ *𝐀𝐕𝐄𝐑𝐓𝐈𝐒𝐒𝐄𝐌𝐄𝐍𝐓!* @${sender.split('@')[0]}\n\n🚯 𝐋𝐞𝐬 𝐬𝐭𝐢𝐜𝐤𝐞𝐫𝐬 𝐬𝐨𝐧𝐭 𝐢𝐧𝐭𝐞𝐫𝐝𝐢𝐭𝐬 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞!\n\n❗ _𝐋𝐚 𝐩𝐫𝐨𝐜𝐡𝐚𝐢𝐧𝐞 𝐟𝐨𝐢𝐬 𝐯𝐨𝐮𝐬 𝐬𝐞𝐫𝐞𝐳 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞._`,
                    mentions: [sender]
                }, { quoted: mek });
            } else {
                antistickerWarnings.delete(key);
                try { await conn.sendMessage(from, { delete: mek.key }); } catch {}
                await conn.sendMessage(from, {
                    text: `🚫 *𝐄𝐗𝐏𝐔𝐋𝐒𝐄́!* @${sender.split('@')[0]}\n\n𝐕𝐨𝐮𝐬 𝐚𝐯𝐢𝐞𝐳 𝐞́𝐭𝐞́ 𝐚𝐯𝐞𝐫𝐭𝐢 𝐩𝐨𝐮𝐫 𝐞𝐧𝐯𝐨𝐢 𝐝𝐞 𝐬𝐭𝐢𝐜𝐤𝐞𝐫.\n👮 𝐕𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 𝐞́𝐭𝐞́ 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.`,
                    mentions: [sender]
                }, { quoted: mek });
                await conn.groupParticipantsUpdate(from, [sender], "remove");
            }
        } else {
            if (!antistickerPrivate.get(from)) return;
            try { await conn.sendMessage(from, { delete: mek.key }); } catch {}
        }
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐞́𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐚𝐧𝐭𝐢𝐬𝐭𝐢𝐜𝐤𝐞𝐫 :', e);
    }
});
