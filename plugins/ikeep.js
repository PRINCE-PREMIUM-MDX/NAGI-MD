const { cmd } = require('../arslan');

cmd({
    pattern: "ikeep",
    alias: ["I-keep"],
    desc: "Garde uniquement les membres avec les indicatifs donnés, supprime les autres",
    category: "group",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, isBotAdmins, reply, groupMetadata, isCreator, isOwner }) => {
    if (!isGroup) return reply("*❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.*");
    if (!isCreator && !isOwner) return reply("*❌ 𝐒𝐞𝐮𝐥 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.*");
    if (!isBotAdmins) return reply("*❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐟𝐚𝐢𝐫𝐞 𝐜𝐞𝐜𝐢.*");
    if (!q) return reply("*❌ 𝐃𝐨𝐧𝐧𝐞𝐳 𝐚𝐮 𝐦𝐨𝐢𝐧𝐬 𝐮𝐧 𝐢𝐧𝐝𝐢𝐜𝐚𝐭𝐢𝐟. 𝐄𝐱𝐞𝐦𝐩𝐥𝐞: .ikeep 52,56,1*");

    const codes = q.split(",").map(code => code.trim()).filter(code => /^\d+$/.test(code));
    if (codes.length === 0) {
        return reply("*❌ 𝐀𝐮𝐜𝐮𝐧 𝐢𝐧𝐝𝐢𝐜𝐚𝐭𝐢𝐟 𝐯𝐚𝐥𝐢𝐝𝐞 𝐝𝐞́𝐭𝐞𝐜𝐭𝐞́. 𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐞𝐬 𝐧𝐨𝐦𝐛𝐫𝐞𝐬 𝐬é𝐩𝐚𝐫é𝐬 𝐩𝐚𝐫 𝐝𝐞𝐬 𝐯𝐢𝐫𝐠𝐮𝐥𝐞𝐬.*");
    }

    try {
        const participants = groupMetadata.participants;
        const toRemove = participants.filter(participant => {
            const jid = participant.id;
            const isAdmin = participant.admin;
            const number = jid.split("@")[0];
            const keep = codes.some(code => number.startsWith(code));
            return !keep && !isAdmin;
        });

        if (toRemove.length === 0) {
            return reply("*✅ 𝐓𝐨𝐮𝐬 𝐥𝐞𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐨𝐧𝐭 𝐮𝐧 𝐢𝐧𝐝𝐢𝐜𝐚𝐭𝐢𝐟 𝐜𝐨𝐫𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐚𝐧𝐭, 𝐩𝐞𝐫𝐬𝐨𝐧𝐧𝐞 𝐚̀ 𝐫𝐞𝐭𝐢𝐫𝐞𝐫.*");
        }

        const jids = toRemove.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");

        reply(`✅ ${toRemove.length} 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐫𝐞𝐭𝐢𝐫é𝐬 (𝐧𝐞 𝐜𝐨𝐫𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐚𝐢𝐞𝐧𝐭 𝐩𝐚𝐬 𝐚𝐮𝐱 𝐢𝐧𝐝𝐢𝐜𝐚𝐭𝐢𝐟𝐬: ${codes.join(", ")})`);
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐢𝐤𝐞𝐞𝐩 :", error);
        reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐥𝐨𝐫𝐬 𝐝𝐮 𝐭𝐫𝐚𝐢𝐭𝐞𝐦𝐞𝐧𝐭: " + error.message);
    }
});
