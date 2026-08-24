const { cmd } = require('../arslan');
const { nagi-md } = require('../lib/style');

cmd({
    pattern: "online",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(nagi-md('ONLINE', '𝐆𝐫𝐨𝐮𝐩𝐞𝐬 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));

        // Check if user is either creator or admin
        if (!isCreator && !isAdmins && !fromMe) {
            return reply(nagi-md('ONLINE', '𝐀𝐝𝐦𝐢𝐧/𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭', '❌'));
        }

        // Inform user that we're checking
        await reply(nagi-md('ONLINE', '𝐕𝐞́𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐝𝐞𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬…', '⏳'));

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        const presencePromises = [];

        // Request presence updates for all participants
        for (const participant of groupData.participants) {
            presencePromises.push(
                conn.presenceSubscribe(participant.id)
                    .then(() => {
                        // Additional check for better detection
                        return conn.sendPresenceUpdate('composing', participant.id);
                    })
            );
        }

        await Promise.all(presencePromises);

        // Presence update handler
        const presenceHandler = (json) => {
            for (const id in json.presences) {
                const presence = json.presences[id]?.lastKnownPresence;
                // Check all possible online states
                if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                    onlineMembers.add(id);
                }
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Longer timeout and multiple checks
        const checks = 3;
        const checkInterval = 5000; // 5 seconds
        let checksDone = 0;

        const checkOnline = async () => {
            checksDone++;
            
            if (checksDone >= checks) {
                clearInterval(interval);
                conn.ev.off('presence.update', presenceHandler);
                
                if (onlineMembers.size === 0) {
                    return reply(nagi-md('ONLINE', '𝐀𝐮𝐜𝐮𝐧 𝐦𝐞𝐦𝐛𝐫𝐞 𝐝𝐞́𝐭𝐞𝐜𝐭𝐞́', '⚠️'));
                }
                
                const onlineArray = Array.from(onlineMembers);
                const onlineList = onlineArray.map((member, index) => 
                    `${index + 1}. @${member.split('@')[0]}`
                ).join('\n');
                
                const message = nagi-md('𝐌𝐄𝐌𝐁𝐑𝐄𝐒 𝐄𝐍 𝐋𝐈𝐆𝐍𝐄', `${onlineArray.length}/${groupData.participants.length}`, '🟢') + `\n${onlineList}`;
                
                await conn.sendMessage(from, { 
                    text: message,
                    mentions: onlineArray
                }, { quoted: mek });
            }
        };

        const interval = setInterval(checkOnline, checkInterval);

    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐨𝐧𝐥𝐢𝐧𝐞 :", e);
        reply(nagi-md('ONLINE', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
    }
});
