const config = require('../config');
// NOTE: Le code complet dépend de la fonction 'get' si vous voulez des messages par groupe
// const { get } = require('./database'); 

/**
 * Récupère la photo de profil WhatsApp d'un utilisateur.
 * Retombe sur une image par défaut si l'utilisateur n'en a pas ou si elle est privée.
 * @param {import('@whiskeysockets/baileys').WASocket} conn
 * @param {string} jid
 * @param {string} fallbackUrl
 */
async function getProfilePicture(conn, jid, fallbackUrl) {
    try {
        const url = await conn.profilePictureUrl(jid, 'image');
        if (url) return url;
    } catch (e) {
        // Pas de photo de profil (privée ou absente) — on utilise le fallback
    }
    return fallbackUrl || config.IMAGE_PATH || 'https://files.catbox.moe/peqjfq.jpeg';
}

/**
 * Gère les événements de participants de groupe (ajout ou suppression).
 * @param {import('@whiskeysockets/baileys').WASocket} conn Le socket de connexion Baileys.
 * @param {import('@whiskeysockets/baileys').GroupParticipantsUpdate} update L'objet de mise à jour des participants.
 */
async function groupEvents(conn, update) {
    // Variables de configuration (Assurez-vous qu'elles existent dans config.js)
    const isWelcomeEnabled = config.WELCOME_ENABLE === 'true'; 
    const isGoodbyeEnabled = config.GOODBYE_ENABLE === 'true'; 
    
    if (!isWelcomeEnabled && !isGoodbyeEnabled) return;

    try {
        const metadata = await conn.groupMetadata(update.id);
        const groupName = metadata.subject;
        const groupJid = update.id;
        const participants = update.participants;

        for (const participantJid of participants) {
            const username = `@${participantJid.split('@')[0]}`;
            
            // 1. GESTION DU MESSAGE DE BIENVENUE (ADD)
            if (update.action === 'add' && isWelcomeEnabled) {
                
                const defaultWelcomeMsg = 
`*╭─「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐔𝐄 」─◇*
*│*
*│* *🌟 𝐍𝐎𝐔𝐕𝐄𝐀𝐔 𝐌𝐄𝐌𝐁𝐑𝐄 𝐀𝐑𝐑𝐈𝐕𝐄́!*
*│* *👋 𝐁𝐨𝐧𝐣𝐨𝐮𝐫:* ${username}
*│* *🏰 𝐆𝐫𝐨𝐮𝐩𝐞:* ${groupName}
*│* *📝 𝐑𝐞̀𝐠𝐥𝐞𝐬:* 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐥𝐢𝐫𝐞 𝐥𝐞𝐬 𝐫𝐞̀𝐠𝐥𝐞𝐬 𝐝𝐚𝐧𝐬 𝐥𝐚 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.
*│*
*╰────────────────────○*
> *𝐌ade 𝐈n 𝐁y 𝚸R!NC𝚵*`;
                
                const welcomeText = config.WELCOME_MSG || defaultWelcomeMsg;

                const message = welcomeText
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName);

                // Photo de profil du nouveau membre (fallback sur WELCOME_IMAGE / image par défaut)
                const profileImage = await getProfilePicture(conn, participantJid, config.WELCOME_IMAGE);

                await conn.sendMessage(groupJid, {
                    image: { url: profileImage },
                    caption: message,
                    mentions: [participantJid]
                });
            }
            
            // 2. GESTION DU MESSAGE D'AU REVOIR (REMOVE)
            else if (update.action === 'remove' && isGoodbyeEnabled) {
                
                const defaultGoodbyeMsg = 
`*╭─「 𝐀𝐔 𝐑𝐄𝐕𝐎𝐈𝐑 𝐋É𝐆𝐄𝐍𝐃𝐄 」─◇*
*│*
*│* *😔 𝐔𝐍 𝐌𝐄𝐌𝐁𝐑𝐄 𝐀 𝐐𝐔𝐈𝐓𝐓É 𝐋𝐄 𝐆𝐑𝐎𝐔𝐏𝐄...*
*│* *👤 𝐀𝐮 𝐫𝐞𝐯𝐨𝐢𝐫:* ${username}
*│* *📢 𝐌𝐬𝐠:* 𝐍𝐨𝐮𝐬 𝐞𝐬𝐩𝐞́𝐫𝐨𝐧𝐬 𝐭𝐞 𝐫𝐞𝐯𝐨𝐢𝐫 𝐛𝐢𝐞𝐧𝐭𝐨̂𝐭!
*│*
*╰────────────────────○*
> *𝐌ade 𝐈n 𝐁y 𝚸R!NC𝚵*`;
                
                const goodbyeText = config.GOODBYE_MSG || defaultGoodbyeMsg;

                const message = goodbyeText
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName);

                // Photo de profil du membre parti (fallback sur GOODBYE_IMAGE / image par défaut)
                const profileImage = await getProfilePicture(conn, participantJid, config.GOODBYE_IMAGE);

                await conn.sendMessage(groupJid, {
                    image: { url: profileImage },
                    caption: message,
                    mentions: [participantJid]
                });
            }
        }
    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 É𝐯𝐞́𝐧𝐞𝐦𝐞𝐧𝐭𝐬 𝐆𝐫𝐨𝐮𝐩𝐞 :", e.message);
    }
}

module.exports = {
    groupEvents
};
