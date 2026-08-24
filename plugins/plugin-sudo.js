const { cmd } = require('../arslan');
const { addSudo, removeSudo, listSudo } = require('../lib/sudo');
const { nagi-md } = require('../lib/style');

function getTarget(mek, args) {
    const quoted = mek.message?.extendedTextMessage?.contextInfo?.participant;
    if (quoted) return quoted.split('@')[0];

    const mentioned = mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (mentioned) return mentioned.split('@')[0];

    if (args[0]) return args[0].replace(/[^0-9]/g, '');

    return null;
}

cmd({
    pattern: "sudo",
    desc: "Ajouter/retirer un utilisateur sudo (droits propriétaire) — répondre ou mentionner",
    category: "owner",
    react: "👑",
    use: ".sudo add / .sudo del (en répondant ou en mentionnant)",
    filename: __filename
},
async (conn, mek, m, { args, isOwner, isCreator, reply }) => {
    try {
        if (!isOwner && !isCreator) {
            return reply(nagi-md('SUDO', '𝐒𝐞𝐮𝐥 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞', '❌'));
        }

        const action = (args[0] || '').toLowerCase();
        const number = getTarget(mek, args.slice(1));

        if (!['add', 'del', 'remove'].includes(action)) {
            return reply(nagi-md('SUDO', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .sudo add / .sudo del (𝐞𝐧 𝐫é𝐩𝐨𝐧𝐝𝐚𝐧𝐭 𝐨𝐮 𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐚𝐧𝐭)', '❓'));
        }
        if (!number) {
            return reply(nagi-md('SUDO', 'R\u00e9pondez \u00e0 un message, mentionnez la personne, ou donnez un num\u00e9ro', '❓'));
        }

        if (action === 'add') {
            addSudo(number);
            return reply(nagi-md('SUDO', `@${number} 𝐚 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭 𝐥𝐞𝐬 𝐝𝐫𝐨𝐢𝐭𝐬 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 ✅`, '👑'));
        } else {
            const removed = removeSudo(number);
            if (!removed) return reply(nagi-md('SUDO', `@${number} 𝐧'𝐞𝐬𝐭 𝐩𝐚𝐬 𝐝𝐚𝐧𝐬 𝐥𝐚 𝐥𝐢𝐬𝐭𝐞 𝐬𝐮𝐝𝐨`, '❓'));
            return reply(nagi-md('SUDO', `@${number} 𝐚 𝐩𝐞𝐫𝐝𝐮 𝐥𝐞𝐬 𝐝𝐫𝐨𝐢𝐭𝐬 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 ❌`, '👑'));
        }
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐬𝐮𝐝𝐨 :', e);
        reply(nagi-md('SUDO', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});

cmd({
    pattern: "listsudo",
    desc: "Afficher la liste des utilisateurs sudo",
    category: "owner",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, isCreator, reply }) => {
    try {
        if (!isOwner && !isCreator) {
            return reply(nagi-md('SUDO', '𝐒𝐞𝐮𝐥 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐩𝐞𝐮𝐭 𝐯𝐨𝐢𝐫 𝐜𝐞𝐭𝐭𝐞 𝐥𝐢𝐬𝐭𝐞', '❌'));
        }

        const list = listSudo();
        if (list.length === 0) {
            return reply(nagi-md('SUDO', '𝐀𝐮𝐜𝐮𝐧 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐬𝐮𝐝𝐨 𝐩𝐨𝐮𝐫 𝐥'+"'"+'𝐢𝐧𝐬𝐭𝐚𝐧𝐭', '📋'));
        }

        const mentions = list.map(n => `${n}@s.whatsapp.net`);
        const text = `📋 *𝐋𝐈𝐒𝐓𝐄 𝐒𝐔𝐃𝐎*\n\n` + list.map((n, i) => `${i + 1}. @${n}`).join('\n');

        await conn.sendMessage(from, { text, mentions }, { quoted: mek });
    } catch (e) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐥𝐢𝐬𝐭𝐬𝐮𝐝𝐨 :', e);
        reply(nagi-md('SUDO', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});
