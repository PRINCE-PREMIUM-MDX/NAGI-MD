const { cmd } = require('../arslan');

cmd({
    pattern: "demoteall",
    desc: "Rétrograder tous les admins du groupe (Propriétaire uniquement)",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isOwner, sender, reply }) => {
    try {
        if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        if (!isOwner) return reply("❌ 𝐒𝐞𝐮𝐥 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");

        const groupData = await conn.groupMetadata(from);
        const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

        const admins = groupData.participants
            .filter(p => p.admin !== null)
            .map(p => p.id)
            .filter(id => id !== botId && id !== sender);

        if (admins.length === 0) return reply("✅ 𝐀𝐮𝐜𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐚̀ 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐞𝐫.");

        await conn.groupParticipantsUpdate(from, admins, "demote");
        return reply("✅ 𝐓𝐨𝐮𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐨𝐧𝐭 𝐞́𝐭𝐞́ 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐞́𝐬, 𝐡𝐨𝐫𝐬 𝐛𝐨𝐭 𝐞𝐭 𝐯𝐨𝐮𝐬.");
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐞𝐦𝐨𝐭𝐞𝐚𝐥𝐥 :", error);
        return reply(`❌ 𝐄𝐫𝐫𝐞𝐮𝐫: ${error.message}`);
    }
});
