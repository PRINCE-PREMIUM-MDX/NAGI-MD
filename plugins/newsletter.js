const { cmd } = require('../arslan');

// 🔧 Canal officiel par défaut (utilisé si aucun lien n'est fourni)
const DEFAULT_NEWSLETTER_JID = "120363410956242470@newsletter";
const DEFAULT_NEWSLETTER_LINK = "https://whatsapp.com/channel/VOTRE-LIEN-ICI";

cmd({
    pattern: "newsletter",
    desc: "Afficher les infos d'un canal WhatsApp (lien ou canal actuel)",
    category: "tools",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        const now = new Date().toLocaleString('fr-FR');

        // Cas 1: utilisé directement dans un canal WhatsApp
        if (from.endsWith("@newsletter")) {
            return conn.sendMessage(from, {
                text: `*📰 𝐈𝐃 𝐝𝐮 𝐜𝐚𝐧𝐚𝐥:*\n\n*${from}*\n\n🕒 *𝐄𝐱𝐞́𝐜𝐮𝐭𝐞́ 𝐥𝐞:* ${now}`
            }, { quoted: mek });
        }

        // Cas 2: un lien de canal a été fourni en argument
        if (q && q.includes('whatsapp.com/channel/')) {
            const linkMatch = q.match(/channel\/([A-Za-z0-9]+)/);
            const inviteCode = linkMatch ? linkMatch[1] : null;

            if (!inviteCode) {
                return reply("❌ 𝐋𝐢𝐞𝐧 𝐝𝐞 𝐜𝐚𝐧𝐚𝐥 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
            }

            try {
                const metadata = await conn.newsletterMetadata("invite", inviteCode);
                const jid = metadata?.id || "𝐈𝐧𝐜𝐨𝐧𝐧𝐮";
                const name = metadata?.name || "𝐈𝐧𝐜𝐨𝐧𝐧𝐮";
                const subscribers = metadata?.subscribers ?? "𝐈𝐧𝐜𝐨𝐧𝐧𝐮";

                return await conn.sendMessage(from, {
                    text: `*📰 𝐈𝐍𝐅𝐎 𝐃𝐔 𝐂𝐀𝐍𝐀𝐋*\n\n📛 *𝐍𝐨𝐦:* ${name}\n🆔 *𝐈𝐃:* ${jid}\n👥 *𝐀𝐛𝐨𝐧𝐧𝐞́𝐬:* ${subscribers}\n🔗 *𝐋𝐢𝐞𝐧:* ${q}\n\n> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium`,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: jid.endsWith('@newsletter') ? jid : `${jid}@newsletter`,
                            newsletterName: name,
                            serverMessageId: 2,
                        },
                    },
                }, { quoted: mek });
            } catch (err) {
                console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐜𝐚𝐧𝐚𝐥 :", err.message);
                return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐜𝐞 𝐜𝐚𝐧𝐚𝐥. 𝐕𝐞́𝐫𝐢𝐟𝐢𝐞𝐳 𝐥𝐞 𝐥𝐢𝐞𝐧.");
            }
        }

        // Cas 3: aucun argument -> afficher le canal officiel par défaut
        await conn.sendMessage(from, {
            text: `*📰 𝐍𝐎𝐓𝐑𝐄 𝐂𝐀𝐍𝐀𝐋 𝐎𝐅𝐅𝐈𝐂𝐈𝐄𝐋*\n\n🔗 ${DEFAULT_NEWSLETTER_LINK}\n🆔 ${DEFAULT_NEWSLETTER_JID}\n\n💡 𝐕𝐨𝐮𝐬 𝐩𝐨𝐮𝐯𝐞𝐳 𝐚𝐮𝐬𝐬𝐢 𝐟𝐚𝐢𝐫𝐞: .newsletter <𝐥𝐢𝐞𝐧 𝐝𝐮 𝐜𝐚𝐧𝐚𝐥>\n\n> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: DEFAULT_NEWSLETTER_JID,
                    newsletterName: '𝐍agi-𝐌d',
                    serverMessageId: 2,
                },
            },
        }, { quoted: mek });

    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐧𝐞𝐰𝐬𝐥𝐞𝐭𝐭𝐞𝐫 :", e);
        reply(`❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${e.message}`);
    }
});
