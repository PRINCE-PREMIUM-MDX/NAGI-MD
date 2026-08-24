const { cmd } = require('../arslan');

cmd({
    pattern: "ginfo",
    desc: "Afficher les informations du groupe",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("*`[❌]` 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.*");
        if (!isAdmins && !isOwner) return reply("*`[❌]` 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐨𝐮 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.*");
        if (!isBotAdmins) return reply("*`[❌]` 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐞𝐱𝐞́𝐜𝐮𝐭𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.*");

        const groupMetadata = await conn.groupMetadata(from);
        const groupName = groupMetadata.subject;
        const memberCount = groupMetadata.participants.length;

        let creator = groupMetadata.owner ? `@${groupMetadata.owner.split('@')[0]}` : '𝐈𝐧𝐜𝐨𝐧𝐧𝐮';

        const groupAdmins = groupMetadata.participants
            .filter(member => member.admin)
            .map((admin, index) => `${index + 1}. @${admin.id.split('@')[0]}`)
            .join("\n") || "𝐀𝐮𝐜𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐭𝐫𝐨𝐮𝐯𝐞́";

        const creationDate = groupMetadata.creation
            ? new Date(groupMetadata.creation * 1000).toLocaleString('fr-FR', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })
            : '𝐈𝐧𝐜𝐨𝐧𝐧𝐮𝐞';

        const message = `
╭───「 *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍𝐒 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄* 」───◆  
│ 🏷️ *𝐍𝐨𝐦 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞:* ${groupName}  
│ 🆔 *𝐈𝐃 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞:* ${from}  
│ 👥 *𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐦𝐛𝐫𝐞𝐬:* ${memberCount}  
│ 👑 *𝐂𝐫𝐞́𝐚𝐭𝐞𝐮𝐫:* ${creator}  
│ 📅 *𝐂𝐫𝐞́𝐞́ 𝐥𝐞:* ${creationDate}  
│ 🚻 *𝐀𝐝𝐦𝐢𝐧𝐬:*  
│ ${groupAdmins}  
╰──────────────────◆`;

        await conn.sendMessage(from, {
            text: message,
            mentions: groupMetadata.participants.filter(m2 => m2.admin).map(a => a.id)
        }, { quoted: mek });

    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐠𝐢𝐧𝐟𝐨 :", error);
        reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞 𝐥𝐨𝐫𝐬 𝐝𝐞 𝐥𝐚 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐞𝐬 𝐢𝐧𝐟𝐨𝐬.");
    }
});

// ── kickall / stop ────────────────────────────────────────────────────
const stopFlags = new Map(); // groupJid -> boolean
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cmd({
    pattern: "kickall",
    desc: "Expulser en continu tous les non-admins jusqu'à l'arrêt",
    react: "🧨",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, isOwner, isAdmins, groupMetadata, groupAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        if (!isAdmins && !isOwner) return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
        if (!isBotAdmins) return reply("❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐫𝐞𝐭𝐢𝐫𝐞𝐫 𝐝𝐞𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬.");

        stopFlags.set(from, false);
        reply("⚠️ *𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧!* 𝐋𝐞 𝐛𝐨𝐭 𝐯𝐚 𝐫𝐞𝐭𝐢𝐫𝐞𝐫 𝐞𝐧 𝐜𝐨𝐧𝐭𝐢𝐧𝐮 𝐭𝐨𝐮𝐬 𝐥𝐞𝐬 𝐧𝐨𝐧-𝐚𝐝𝐦𝐢𝐧𝐬 𝐣𝐮𝐬𝐪𝐮'𝐚̀ 𝐜𝐞 𝐪𝐮'𝐢𝐥𝐬 𝐬𝐨𝐢𝐞𝐧𝐭 𝐭𝐨𝐮𝐬 𝐩𝐚𝐫𝐭𝐢𝐬 𝐨𝐮 𝐪𝐮𝐞 *.stop* 𝐬𝐨𝐢𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞́.");

        while (true) {
            const metadata = await conn.groupMetadata(from);
            const botJid = conn.user.id;
            const nonAdmins = metadata.participants.filter(mem => !groupAdmins.includes(mem.id) && mem.id !== botJid);

            if (nonAdmins.length === 0) {
                reply("✅ 𝐏𝐥𝐮𝐬 𝐚𝐮𝐜𝐮𝐧 𝐧𝐨𝐧-𝐚𝐝𝐦𝐢𝐧 𝐚̀ 𝐫𝐞𝐭𝐢𝐫𝐞𝐫.");
                break;
            }

            for (const participant of nonAdmins) {
                if (stopFlags.get(from)) {
                    reply("✅ *𝐎𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐚𝐫𝐫𝐞̂𝐭𝐞́𝐞 𝐩𝐚𝐫 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫.* 𝐂𝐞𝐫𝐭𝐚𝐢𝐧𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐧'𝐨𝐧𝐭 𝐩𝐚𝐬 𝐞́𝐭𝐞́ 𝐫𝐞𝐭𝐢𝐫𝐞́𝐬.");
                    stopFlags.delete(from);
                    return;
                }
                await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                    .catch(err => console.error(`⚠️ 𝐄́𝐜𝐡𝐞𝐜 𝐫𝐞𝐭𝐫𝐚𝐢𝐭 ${participant.id} :`, err));
                await delay(1000);
            }
        }
        stopFlags.delete(from);
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐤𝐢𝐜𝐤𝐚𝐥𝐥 :', e);
        reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞 𝐩𝐞𝐧𝐝𝐚𝐧𝐭 𝐥'𝐞𝐱𝐞́𝐜𝐮𝐭𝐢𝐨𝐧 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
    }
});

cmd({
    pattern: "stop",
    desc: "Arrêter le kickall en cours",
    react: "⏹️",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    stopFlags.set(from, true);
    reply("✅ *𝐋'𝐨𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐤𝐢𝐜𝐤𝐚𝐥𝐥 𝐚 𝐞́𝐭𝐞́ 𝐚𝐫𝐫𝐞̂𝐭𝐞́𝐞.*");
});
