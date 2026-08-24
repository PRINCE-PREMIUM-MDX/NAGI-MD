const { cmd } = require('../arslan');

// ════════════════════════════════════════════════════════════
// 📁 ANTITAG - Stockage en mémoire (pas de fichier = pas de perte au redémarrage)
// ════════════════════════════════════════════════════════════
const antiTagGroups = new Map(); // groupJid -> boolean

cmd({
    pattern: "anti-tag",
    alias: ["antistatustag", "antitagsw", "antitagstatus", "antitag"],
    desc: "Activer/Désactiver l'anti-mention de statut pour ce groupe",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, args }) => {
    if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
    if (!isAdmins) return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
    if (!isBotAdmins) return reply("❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐟𝐚𝐢𝐫𝐞 𝐜𝐞𝐜𝐢.");
    if (!args[0]) return reply("⚠️ 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧: .anti-tag on / off");

    const choice = args[0].toLowerCase();

    if (choice === 'on') {
        if (antiTagGroups.get(from) === true) return reply("✅ 𝐀𝐧𝐭𝐢𝐭𝐚𝐠 𝐞𝐬𝐭 𝐝𝐞́𝐣𝐚̀ 𝐚𝐜𝐭𝐢𝐯é 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞.");
        antiTagGroups.set(from, true);
        return reply("✅ 𝐀𝐧𝐭𝐢𝐭𝐚𝐠 𝐚 é𝐭é `𝐚𝐜𝐭𝐢𝐯é` 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞!");
    } else if (choice === 'off') {
        if (!antiTagGroups.get(from)) return reply("❌ 𝐀𝐧𝐭𝐢𝐭𝐚𝐠 𝐞𝐬𝐭 𝐝𝐞́𝐣𝐚̀ 𝐝é𝐬𝐚𝐜𝐭𝐢𝐯é 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞.");
        antiTagGroups.set(from, false);
        return reply("❌ 𝐀𝐧𝐭𝐢𝐭𝐚𝐠 𝐚 é𝐭é `𝐝é𝐬𝐚𝐜𝐭𝐢𝐯é` 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞!");
    } else {
        return reply("⚠️ 𝐂𝐡𝐨𝐢𝐬𝐢𝐬𝐬𝐞𝐳 '𝐨𝐧' 𝐨𝐮 '𝐨𝐟𝐟'");
    }
});

module.exports = { antiTagGroups };
