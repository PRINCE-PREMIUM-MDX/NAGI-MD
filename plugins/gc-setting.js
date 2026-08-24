const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd } = require("../arslan");
const { fakevCard } = require('../lib/fakevCard');

// Command to list all pending group join requests
cmd({
    pattern: "requestlist",
    desc: "Shows pending group join requests",
    category: "group",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        if (!isGroup) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        }
        if (!isAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐥𝐞𝐬 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬 𝐝'𝐚𝐝𝐡𝐞́𝐬𝐢𝐨𝐧.");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, {
                react: { text: 'ℹ️', key: m.key }
            });
            return reply("ℹ️ 𝐀𝐮𝐜𝐮𝐧𝐞 𝐝𝐞𝐦𝐚𝐧𝐝𝐞 𝐝'𝐚𝐝𝐡𝐞́𝐬𝐢𝐨𝐧 𝐞𝐧 𝐚𝐭𝐭𝐞𝐧𝐭𝐞.");
        }

        let text = `📋 *𝐃𝐄𝐌𝐀𝐍𝐃𝐄𝐒 𝐄𝐍 𝐀𝐓𝐓𝐄𝐍𝐓𝐄 (${requests.length})*\n\n`;
        requests.forEach((user, i) => {
            text += `${i+1}. @${user.jid.split('@')[0]}\n`;
        });

        await conn.sendMessage(from, {
            react: { text: '✅', key: m.key }
        });
        return reply(text, { mentions: requests.map(u => u.jid) });
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐥𝐢𝐬𝐭𝐞 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬 :", error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });
        return reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐞𝐬 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬.");
    }
});

// Command to accept all pending join requests
cmd({
    pattern: "acceptall",
    desc: "Accepts all pending group join requests",
    category: "group",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        if (!isGroup) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        }
        if (!isAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐚𝐜𝐜𝐞𝐩𝐭𝐞𝐫 𝐥𝐞𝐬 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬.");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, {
                react: { text: 'ℹ️', key: m.key }
            });
            return reply("ℹ️ 𝐀𝐮𝐜𝐮𝐧𝐞 𝐝𝐞𝐦𝐚𝐧𝐝𝐞 𝐚̀ 𝐚𝐜𝐜𝐞𝐩𝐭𝐞𝐫.");
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "approve");
        
        await conn.sendMessage(from, {
            react: { text: '👍', key: m.key }
        });
        return reply(`✅ ${requests.length} 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬 𝐚𝐜𝐜𝐞𝐩𝐭𝐞́𝐞𝐬 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.`);
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐚𝐜𝐜𝐞𝐩𝐭 𝐚𝐥𝐥 :", error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });
        return reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐥'𝐚𝐜𝐜𝐞𝐩𝐭𝐚𝐭𝐢𝐨𝐧 𝐝𝐞𝐬 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬.");
    }
});

// Command to reject all pending join requests
cmd({
    pattern: "rejectall",
    desc: "Rejects all pending group join requests",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        if (!isGroup) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        }
        if (!isAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐫𝐞𝐟𝐮𝐬𝐞𝐫 𝐥𝐞𝐬 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬.");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, {
                react: { text: 'ℹ️', key: m.key }
            });
            return reply("ℹ️ 𝐀𝐮𝐜𝐮𝐧𝐞 𝐝𝐞𝐦𝐚𝐧𝐝𝐞 𝐚̀ 𝐫𝐞𝐟𝐮𝐬𝐞𝐫.");
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "reject");
        
        await conn.sendMessage(from, {
            react: { text: '👎', key: m.key }
        });
        return reply(`✅ ${requests.length} 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬 𝐫𝐞𝐟𝐮𝐬𝐞́𝐞𝐬 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.`);
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐫𝐞𝐣𝐞𝐜𝐭 𝐚𝐥𝐥 :", error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });
        return reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐮 𝐫𝐞𝐟𝐮𝐬 𝐝𝐞𝐬 𝐝𝐞𝐦𝐚𝐧𝐝𝐞𝐬.");
    }
});

// ==================== SIMPLE & WORKING KICK COMMAND ====================
cmd({
    pattern: "kick",
    alias: ["remove","k"],
    desc: "Remove a group member",
    category: "admin",
    react: "🗑️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {

    try {

        if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

        if (!isAdmins) return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");

        if (!isBotAdmins) return reply("❌ 𝐉'𝐚𝐢 𝐛𝐞𝐬𝐨𝐢𝐧 𝐝𝐞𝐬 𝐝𝐫𝐨𝐢𝐭𝐬 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐫𝐞𝐭𝐢𝐫𝐞𝐫 𝐝𝐞𝐬 𝐦𝐞𝐦𝐛𝐫𝐞𝐬.");

        const target =
            m.quoted?.sender ||
            m.mentionedJid?.[0];

        if (!target)
            return reply("❌ 𝐑𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐨𝐮 𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐮𝐧 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫!");

        // remove user
        await conn.groupParticipantsUpdate(
            from,
            [target],
            "remove"
        );

        await conn.sendMessage(from,{
            text:`🚫 @${target.split("@")[0]} 𝐚 𝐞́𝐭𝐞́ 𝐫𝐞𝐭𝐢𝐫𝐞́!`,
            mentions:[target]
        },{ quoted:m });

    } catch (error) {

        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐤𝐢𝐜𝐤 :", error);
        reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐮 𝐫𝐞𝐭𝐫𝐚𝐢𝐭 𝐝𝐮 𝐦𝐞𝐦𝐛𝐫𝐞.");

    }

});
// ==================== SIMPLE & WORKING KICKALL COMMAND ====================
cmd({
    pattern: "kickall4",
    desc: "Remove all non-admin members",
    category: "admin",
    react: "⚠️",
    filename: __filename
},
async (Void, citel) => {
    try {

        if (!citel.isGroup)
            return citel.reply("❌ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐝𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭!");

        const metadata = await Void.groupMetadata(citel.chat);
        const participants = metadata.participants;

        // admins list
        const admins = participants
            .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
            .map(p => p.id);

        // sender admin check
        if (!admins.includes(citel.sender))
            return citel.reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐜𝐢!");

        // bot jid
        let botJid = Void.user.id.includes(':')
            ? Void.user.id.split(':')[0] + "@s.whatsapp.net"
            : Void.user.id;

        // remove list (admins skip)
        const toKick = participants
            .map(p => p.id)
            .filter(id => !admins.includes(id) && id !== botJid);

        await citel.reply(`⚠️ 𝐒𝐮𝐩𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧 𝐝𝐞 ${toKick.length} 𝐦𝐞𝐦𝐛𝐫𝐞𝐬...`);

        for (let user of toKick) {
            await Void.groupParticipantsUpdate(citel.chat, [user], "remove");
        }

        await citel.reply("✅ 𝐄𝐱𝐩𝐮𝐥𝐬𝐢𝐨𝐧 𝐭𝐞𝐫𝐦𝐢𝐧𝐞́𝐞!");

    } catch (err) {
        console.log(err);
        citel.reply("❌ É𝐜𝐡𝐞𝐜 𝐝𝐞 𝐥+"+"𝐞𝐱𝐩𝐮𝐥𝐬𝐢𝐨𝐧!");
    }
});
//REMOVE ADMINS BY NAGI-MD 
cmd({
    pattern: "removeadmins",
    alias: ["kickadmins", "kickall3", "deladmins"],
    desc: "Remove all admin members from the group, excluding the bot and bot owner.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, isOwner, groupMetadata, groupAdmins, isBotAdmins, reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
        }

        if (!isOwner) {
            return reply("𝐒𝐞𝐮𝐥 𝐥𝐞 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐝𝐮 𝐛𝐨𝐭 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
        }

        if (!isBotAdmins) {
            return reply("𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐞𝐱𝐞́𝐜𝐮𝐭𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
        }

        const allParticipants = groupMetadata.participants;
        const botJid = conn.user.id.split(':')[0].split('@')[0] + '@s.whatsapp.net';
        const adminParticipants = allParticipants.filter(member => groupAdmins.includes(member.id) && member.id !== botJid && !config.OWNER_NUMBER.includes(member.id.split('@')[0]));

        if (adminParticipants.length === 0) {
            return reply("𝐈𝐥 𝐧'𝐲 𝐚 𝐚𝐮𝐜𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐚̀ 𝐫𝐞𝐭𝐢𝐫𝐞𝐫.");
        }

        reply(`𝐒𝐮𝐩𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧 𝐝𝐞 ${adminParticipants.length} 𝐚𝐝𝐦𝐢𝐧𝐬, 𝐡𝐨𝐫𝐬 𝐛𝐨𝐭 𝐞𝐭 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞...`);

        for (let participant of adminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000); // 2-second delay between removals
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("𝐓𝐨𝐮𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐨𝐧𝐭 𝐞́𝐭𝐞́ 𝐫𝐞𝐭𝐢𝐫𝐞́𝐬, 𝐡𝐨𝐫𝐬 𝐛𝐨𝐭 𝐞𝐭 𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞.");
    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐫𝐞𝐭𝐫𝐚𝐢𝐭 𝐚𝐝𝐦𝐢𝐧𝐬 :", e);
        reply("𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳.");
    }
});
// ==================== SIMPLE & WORKING PROMOTE COMMAND ====================
cmd({
pattern: "promote",
alias: ["p", "giveadmin", "makeadmin"],
desc: "Promote a user to admin",
category: "group",
react: "👑",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
quoted,
reply,
mentionedJid,
sender,
isCreator
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

// User extraction logic  
let users = [];  
  
if (mentionedJid && mentionedJid.length > 0) {  
  users = mentionedJid;  
} else if (quoted && quoted.sender) {  
  users = [quoted.sender];  
} else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {  
  users = m.message.extendedTextMessage.contextInfo.mentionedJid;  
} else {  
  return reply("❓ 𝐌𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐨𝐮 𝐫𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐚̀ 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐨𝐢𝐫!\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞 : .promote @user");  
}  

// Remove duplicates  
users = [...new Set(users.filter(user => user && user.includes('@')))];  
if (users.length === 0) return reply("⚠️ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐝𝐞́𝐭𝐞𝐫𝐦𝐢𝐧𝐞𝐫 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐜𝐢𝐛𝐥𝐞.");  

// Try to promote directly  
try {  
  await conn.groupParticipantsUpdate(from, users, "promote");  
    
  if (users.length === 1) {  
    reply(`✅ @${users[0].split('@')[0]} 𝐩𝐫𝐨𝐦𝐮 𝐚𝐝𝐦𝐢𝐧 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.`, { mentions: users });  
  } else {  
    reply(`✅ ${users.length} 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 𝐩𝐫𝐨𝐦𝐮𝐬 𝐚𝐝𝐦𝐢𝐧 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.`, { mentions: users });  
  }  
} catch (promoteError) {  
  if (promoteError.message.includes("not authorized") || promoteError.message.includes("admin")) {  
    reply("❌ 𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐨𝐢𝐫! 𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .botadmin");  
  } else if (promoteError.message.includes("already")) {  
    reply("❌ 𝐂𝐞𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐞𝐬𝐭 𝐝𝐞́𝐣𝐚̀ 𝐚𝐝𝐦𝐢𝐧!");  
  } else {  
    reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐩𝐫𝐨𝐦𝐨𝐭𝐢𝐨𝐧 : " + promoteError.message);  
  }  
}

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐏𝐫𝐨𝐦𝐨𝐭𝐢𝐨𝐧 :", err);
reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐩𝐫𝐨𝐦𝐨𝐭𝐢𝐨𝐧 : " + err.message);
}
});

// ==================== SIMPLE & WORKING DEMOTE COMMAND ====================
cmd({
pattern: "demote",
alias: ["d", "dismiss", "removeadmin"],
desc: "Demote a group admin",
category: "group",
react: "⬇️",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
quoted,
reply,
mentionedJid,
sender,
isCreator
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

// User extraction logic  
let users = [];  
  
if (mentionedJid && mentionedJid.length > 0) {  
  users = mentionedJid;  
} else if (quoted && quoted.sender) {  
  users = [quoted.sender];  
} else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {  
  users = m.message.extendedTextMessage.contextInfo.mentionedJid;  
} else {  
  return reply("❓ 𝐌𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐨𝐮 𝐫𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐚̀ 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐞𝐫!\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞 : .demote @admin");  
}  

// Remove duplicates  
users = [...new Set(users.filter(user => user && user.includes('@')))];  
if (users.length === 0) return reply("⚠️ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐝𝐞́𝐭𝐞𝐫𝐦𝐢𝐧𝐞𝐫 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐜𝐢𝐛𝐥𝐞.");  

// Try to demote directly  
try {  
  await conn.groupParticipantsUpdate(from, users, "demote");  
    
  if (users.length === 1) {  
    reply(`✅ @${users[0].split('@')[0]} 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐞́ 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.`, { mentions: users });  
  } else {  
    reply(`✅ ${users.length} 𝐚𝐝𝐦𝐢𝐧𝐬 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐞́𝐬 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬.`, { mentions: users });  
  }  
} catch (demoteError) {  
  if (demoteError.message.includes("not authorized") || demoteError.message.includes("admin")) {  
    reply("❌ 𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐞𝐫! 𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .botadmin");  
  } else if (demoteError.message.includes("not admin")) {  
    reply("❌ 𝐂𝐞𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐧+"+"𝐞𝐬𝐭 𝐩𝐚𝐬 𝐚𝐝𝐦𝐢𝐧!");  
  } else {  
    reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐚𝐭𝐢𝐨𝐧 : " + demoteError.message);  
  }  
}

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐃𝐞𝐦𝐨𝐭𝐞 :", err);
reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐭𝐫𝐨𝐠𝐫𝐚𝐝𝐚𝐭𝐢𝐨𝐧 : " + err.message);
}
});

// ==================== WORKING BOT ADMIN COMMAND ====================
cmd({
pattern: "botadmin",
alias: ["makebotadmin", "giveadminbot", "adminbot"],
desc: "Make bot admin in group",
category: "group",
react: "🤖",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
isCreator
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

// Check if bot is already admin  
try {  
  const groupMetadata = await conn.groupMetadata(from);  
  const botNumber = conn.user.id.split(':')[0].split('@')[0];
  const botParticipant = groupMetadata.participants.find(p => p.id.split('@')[0] === botNumber);  
  if (botParticipant && botParticipant.admin) {  
    return reply("✅ 𝐋𝐞 𝐛𝐨𝐭 𝐞𝐬𝐭 𝐝𝐞́𝐣𝐚̀ 𝐚𝐝𝐦𝐢𝐧 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞!");  
  }  
} catch (e) {  
  // If we can't fetch metadata, bot is probably not admin  
  console.log("𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐞𝐬 𝐢𝐧𝐟𝐨𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞, 𝐩𝐫𝐨𝐦𝐨𝐭𝐢𝐨𝐧 𝐝𝐮 𝐛𝐨𝐭...");  
}  
  
// Try to promote bot  
try {  
  const botJid = conn.user.id.split(':')[0].split('@')[0] + '@s.whatsapp.net';
  await conn.groupParticipantsUpdate(from, [botJid], "promote");  
  reply("✅ *𝐋𝐞 𝐛𝐨𝐭 𝐞𝐬𝐭 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭 𝐚𝐝𝐦𝐢𝐧!*\n\n𝐕𝐨𝐮𝐬 𝐩𝐨𝐮𝐯𝐞𝐳 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫:\n• .promote @user\n• .demote @admin\n• .kick @user");  
} catch (err) {  
  if (err.message.includes("not authorized")) {  
    reply(`❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐨𝐢𝐫 𝐥𝐞 𝐛𝐨𝐭.\n\n✳️ *𝐑𝐚𝐢𝐬𝐨𝐧:* 𝐕𝐨𝐮𝐬 𝐧'𝐚𝐯𝐞𝐳 𝐩𝐚𝐬 𝐥𝐚 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐝𝐞 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐨𝐢𝐫 𝐥𝐞 𝐛𝐨𝐭.\n\n✳️ *𝐌𝐚𝐧𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭:*\n1. 𝐀𝐥𝐥𝐞𝐳 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐩𝐚𝐫𝐚𝐦𝐞̀𝐭𝐫𝐞𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞\n2. 𝐂𝐥𝐢𝐪𝐮𝐞𝐳 𝐬𝐮𝐫 "𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞"\n3. 𝐀𝐥𝐥𝐞𝐳 𝐝𝐚𝐧𝐬 "𝐀𝐣𝐨𝐮𝐭𝐞𝐫 𝐦𝐞𝐦𝐛𝐫𝐞𝐬"\n4. 𝐓𝐫𝐨𝐮𝐯𝐞𝐳 𝐥𝐞 𝐛𝐨𝐭 𝐞𝐭 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐞𝐳-𝐥𝐞 𝐦𝐚𝐧𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭`);  
  } else {  
    reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐩𝐫𝐨𝐦𝐨𝐭𝐢𝐨𝐧 𝐝𝐮 𝐛𝐨𝐭 : " + err.message);  
  }  
}

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧 :", err);
reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐛𝐨𝐭𝐚𝐝𝐦𝐢𝐧 : " + err.message);
}
});

// ==================== FIXED ADD USER COMMAND ====================
cmd({
pattern: "add",
alias: ["adduser", "addmember"],
desc: "Add user to group",
category: "group",
react: "➕",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
isCreator,
args = [], // args is array, not string
mentionedJid,
text, // This is the full text after command
body
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

let users = [];  
  
// Mentioned users se (priority)  
if (mentionedJid && mentionedJid.length > 0) {  
  users = mentionedJid;  
}  
  
// Agar koi number diya ho (extract from text)  
if (users.length === 0 && text) {  
  // Text ko string mein convert karo  
  const textString = String(text || "").trim();  
    
  // Pattern 1: Direct numbers like 923001234567  
  const directNumbers = textString.match(/\d{10,15}/g);  
  if (directNumbers) {  
    users = directNumbers.map(num => {  
      // Pakistan numbers ke liye +92 ya 92 add karo  
      let cleanNum = num.replace(/\D/g, '');  
      if (cleanNum.startsWith('3')) {  
        cleanNum = '92' + cleanNum; // 3000000000 -> 923000000000  
      }  
      if (cleanNum.length >= 10) {  
        return cleanNum + '@s.whatsapp.net';  
      }  
      return null;  
    }).filter(Boolean);  
  }  
    
  // Pattern 2: @ mentions se extract  
  if (users.length === 0) {  
    const mentionPattern = /@(\d{5,16})/g;  
    const mentions = [...textString.matchAll(mentionPattern)];  
    if (mentions.length > 0) {  
      users = mentions.map(match => match[1] + '@s.whatsapp.net');  
    }  
  }  
}  
  
// Agar message body se extract karna ho  
if (users.length === 0 && body) {  
  const bodyString = String(body);  
  const numbers = bodyString.match(/\d{10,15}/g);  
  if (numbers) {  
    users = numbers.map(num => {  
      let cleanNum = num.replace(/\D/g, '');  
      if (cleanNum.startsWith('3')) {  
        cleanNum = '92' + cleanNum;  
      }  
      return cleanNum + '@s.whatsapp.net';  
    }).filter(num => num.length >= 10);  
  }  
}  
  
// Agar phir bhi users nahi mile  
if (users.length === 0) {  
  return reply(`❌ 𝐌𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐝𝐞𝐬 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 𝐨𝐮 𝐝𝐨𝐧𝐧𝐞𝐳 𝐝𝐞𝐬 𝐧𝐮𝐦𝐞́𝐫𝐨𝐬!\n\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞𝐬:\n• .add @user (𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐪𝐮𝐞𝐥𝐪𝐮'𝐮𝐧)\n• .add 923001234567\n• .add 3001234567\n• .add @user1 @user2`);  
}  
  
// Duplicates remove karo  
users = [...new Set(users)];  
  
// Validate users  
const validUsers = users.filter(user => {  
  const num = user.split('@')[0];  
  return num.length >= 10 && num.length <= 16;  
});  
  
if (validUsers.length === 0) {  
  return reply("❌ 𝐍𝐮𝐦𝐞́𝐫𝐨𝐬 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞𝐬! 𝐃𝐨𝐧𝐧𝐞𝐳 𝐝𝐞𝐬 𝐧𝐮𝐦𝐞́𝐫𝐨𝐬 𝐝𝐞 10-16 𝐜𝐡𝐢𝐟𝐟𝐫𝐞𝐬 𝐯𝐚𝐥𝐢𝐝𝐞𝐬.");  
}  
  
// Try to add users  
try {  
  await conn.groupParticipantsUpdate(from, validUsers, "add");  
  reply(`✅ ${validUsers.length} 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫(𝐬) 𝐚𝐣𝐨𝐮𝐭𝐞́(𝐬) 𝐚𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.\n\n𝐀𝐣𝐨𝐮𝐭𝐞́𝐬: ${validUsers.map(u => u.split('@')[0]).join(', ')}`);  
} catch (addError) {  
  if (addError.message.includes("not authorized") || addError.message.includes("admin")) {  
    reply("❌ 𝐋𝐞 𝐛𝐨𝐭 𝐝𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐚𝐣𝐨𝐮𝐭𝐞𝐫! 𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .botadmin");  
  } else if (addError.message.includes("not in contacts")) {  
    reply("❌ 𝐂𝐞𝐫𝐭𝐚𝐢𝐧𝐬 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 𝐧𝐞 𝐬𝐨𝐧𝐭 𝐩𝐚𝐬 𝐝𝐚𝐧𝐬 𝐯𝐨𝐬 𝐜𝐨𝐧𝐭𝐚𝐜𝐭𝐬 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩.");  
  } else if (addError.message.includes("invite")) {  
    reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝+"+"𝐚𝐣𝐨𝐮𝐭𝐞𝐫. 𝐑𝐞𝐬𝐭𝐫𝐢𝐜𝐭𝐢𝐨𝐧𝐬 𝐝𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐨𝐮 𝐝𝐞 𝐜𝐨𝐧𝐟𝐢𝐝𝐞𝐧𝐭𝐢𝐚𝐥𝐢𝐭𝐞́.");  
  } else {  
    reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝+"+"𝐚𝐣𝐨𝐮𝐭 : " + addError.message);  
  }  
}

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐀𝐝𝐝 :", err);
reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝+"+"𝐚𝐣𝐨𝐮𝐭 : " + (err.message || "𝐕𝐞́𝐫𝐢𝐟𝐢𝐞𝐳 𝐥𝐞𝐬 𝐧𝐮𝐦𝐞́𝐫𝐨𝐬 𝐞𝐭 𝐫𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳"));
}
});

// ==================== SIMPLE ADD COMMAND (ALTERNATIVE VERSION) ====================
cmd({
pattern: "addmember",
alias: ["invite", "invitemember"],
desc: "Add user to group (simple version)",
category: "group",
react: "👥",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
args,
mentionedJid
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

let users = [];  
  
// Mentioned users  
if (mentionedJid && mentionedJid.length > 0) {  
  users = mentionedJid;  
  console.log("Mentioned users:", users);  
}  
  
// If no mentions, check args  
if (users.length === 0 && args) {  
  // Convert args to string if it's array  
  const argsString = Array.isArray(args) ? args.join(' ') : String(args || '');  
  console.log("Args string:", argsString);  
    
  // Extract numbers from args  
  const numberRegex = /(\+\d{1,3})?(\d{10,15})/g;  
  const matches = argsString.match(numberRegex);  
    
  if (matches) {  
    users = matches.map(num => {  
      // Clean the number  
      let cleanNum = num.replace(/\D/g, '');  
        
      // For Pakistan numbers starting with 3  
      if (cleanNum.startsWith('3') && cleanNum.length === 10) {  
        cleanNum = '92' + cleanNum;  
      }  
        
      // Remove leading zeros  
      cleanNum = cleanNum.replace(/^0+/, '');  
        
      if (cleanNum.length >= 10 && cleanNum.length <= 16) {  
        return cleanNum + '@s.whatsapp.net';  
      }  
      return null;  
    }).filter(Boolean);  
  }  
}  
  
// If still no users  
if (users.length === 0) {  
  return reply(`📋 *𝐀𝐈𝐃𝐄 𝐀𝐉𝐎𝐔𝐓 𝐔𝐓𝐈𝐋𝐈𝐒𝐀𝐓𝐄𝐔𝐑*\n\n𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧:\n• .add @user (𝐦𝐞𝐧𝐭𝐢𝐨𝐧𝐧𝐞𝐳 𝐪𝐮𝐞𝐥𝐪𝐮'𝐮𝐧)\n• .add 923001234567\n• .add 3001234567\n\n𝐍𝐨𝐭𝐞: 𝐋𝐞𝐬 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 𝐝𝐨𝐢𝐯𝐞𝐧𝐭 𝐞̂𝐭𝐫𝐞 𝐝𝐚𝐧𝐬 𝐯𝐨𝐬 𝐜𝐨𝐧𝐭𝐚𝐜𝐭𝐬.`);  
}  
  
// Remove duplicates  
users = [...new Set(users)];  
  
// Limit to 10 users at a time  
if (users.length > 10) {  
  reply(`⚠️ 𝐀𝐣𝐨𝐮𝐭 𝐝𝐞𝐬 10 𝐩𝐫𝐞𝐦𝐢𝐞𝐫𝐬 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 (𝐥𝐢𝐦𝐢𝐭𝐞)...`);  
  users = users.slice(0, 10);  
}  
  
console.log("Final users to add:", users);  
  
// Try to add  
try {  
  await conn.groupParticipantsUpdate(from, users, "add");  
  reply(`✅ ${users.length} 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫(𝐬) 𝐚𝐣𝐨𝐮𝐭𝐞́(𝐬) 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬!`);  
} catch (error) {  
  console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐚𝐣𝐨𝐮𝐭 :", error.message);  
    
  if (error.message.includes("not authorized")) {  
    reply("❌ 𝐋𝐞 𝐛𝐨𝐭 𝐧+"+"𝐞𝐬𝐭 𝐩𝐚𝐬 𝐚𝐝𝐦𝐢𝐧! 𝐏𝐫𝐨𝐦𝐨𝐮𝐯𝐞𝐳-𝐥𝐞 𝐝+"+"𝐚𝐛𝐨𝐫𝐝.");  
  } else if (error.message.includes("invite")) {  
    reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝+"+"𝐚𝐣𝐨𝐮𝐭𝐞𝐫 𝐜𝐞𝐬 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 (𝐜𝐨𝐧𝐟𝐢𝐝𝐞𝐧𝐭𝐢𝐚𝐥𝐢𝐭𝐞́).");  
  } else {  
    reply(`❌ 𝐄́𝐜𝐡𝐞𝐜 : ${error.message}`);  
  }  
}

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐀𝐝𝐝𝐌𝐞𝐦𝐛𝐞𝐫 :", err);
reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫: " + (err.message || "𝐄𝐫𝐫𝐞𝐮𝐫 𝐢𝐧𝐜𝐨𝐧𝐧𝐮𝐞"));
}
});

// ==================== SIMPLE TAGALL COMMAND ====================
cmd({
pattern: "tagall2",
alias: ["gc_tagall", "mentionall"],
desc: "Tag all members",
category: "group",
react: "🔊",
filename: __filename
}, async (conn, mek, m, {
from,
participants,
reply,
isGroup,
body,
command
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

let message = body.slice(body.indexOf(command) + command.length).trim();  
if (!message) message = "𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 𝐚̀ 𝐭𝐨𝐮𝐬!";  
  
let text = `╭┄──᛭『 📢 *𝐓𝐀𝐆 𝐀𝐋𝐋* 』\n│\n│📝 𝐌𝐞𝐬𝐬𝐚𝐠𝐞: ${message}\n│𝐁ot 𝐍agi-𝐌d\n`;  
  
participants.forEach((member, i) => {  
  text += `│❍ ${i+1}. @${member.id.split('@')[0]}\n`;  
});  
  
text += `╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*\n✅ 𝐓𝐨𝐭𝐚𝐥: ${participants.length} 𝐦𝐞𝐦𝐛𝐫𝐞𝐬`;  
  
await conn.sendMessage(from, {  
  text: text,  
  mentions: participants.map(p => p.id)  
}, { quoted: fakevCard });

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐓𝐚𝐠𝐀𝐥𝐥 :", err);
reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐭𝐚𝐠𝐚𝐥𝐥 : " + err.message);
}
});

//tag.js

cmd({
  pattern: "hidetag",
  alias: ["tag", "h"],  
  react: "🔊",
  desc: "To Tag all Members for Any Message/Media",
  category: "group",
  use: '.hidetag Hello',
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isCreator, isAdmins,
  participants, reply
}) => {
  try {
    const isUrl = (url) => {
      return /https?:\/\/(www\.)?[\w\-@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w\-@:%_\+.~#?&//=]*)/.test(url);
    };

    if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
    if (!isAdmins && !isCreator) return reply("❌ 𝐒𝐞𝐮𝐥𝐬 𝐥𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐩𝐞𝐮𝐯𝐞𝐧𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");

    const mentionAll = { mentions: participants.map(u => u.id) };

    // If no message or reply is provided
    if (!q && !m.quoted) {
      return reply("❌ 𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐨𝐮 𝐫𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞.");
    }

    // If a reply to a message
    if (m.quoted) {
      const type = m.quoted.mtype || '';
      
      // If it's a text message (extendedTextMessage)
      if (type === 'extendedTextMessage') {
        return await conn.sendMessage(from, {
          text: m.quoted.text || '𝐀𝐮𝐜𝐮𝐧 𝐜𝐨𝐧𝐭𝐞𝐧𝐮 𝐭𝐫𝐨𝐮𝐯𝐞́.',
          ...mentionAll
        }, { quoted: mek });
      }

      // Handle media messages
      if (['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)) {
        try {
          const buffer = await m.quoted.download?.();
          if (!buffer) return reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐮 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭 𝐝𝐮 𝐦𝐞́𝐝𝐢𝐚.");

          let content;
          switch (type) {
            case "imageMessage":
              content = { image: buffer, caption: m.quoted.text || "📷 𝐈𝐦𝐚𝐠𝐞", ...mentionAll };
              break;
            case "videoMessage":
              content = { 
                video: buffer, 
                caption: m.quoted.text || "🎥 𝐕𝐢𝐝𝐞́𝐨", 
                gifPlayback: m.quoted.message?.videoMessage?.gifPlayback || false, 
                ...mentionAll 
              };
              break;
            case "audioMessage":
              content = { 
                audio: buffer, 
                mimetype: "audio/mp4", 
                ptt: m.quoted.message?.audioMessage?.ptt || false, 
                ...mentionAll 
              };
              break;
            case "stickerMessage":
              content = { sticker: buffer, ...mentionAll };
              break;
            case "documentMessage":
              content = {
                document: buffer,
                mimetype: m.quoted.message?.documentMessage?.mimetype || "application/octet-stream",
                fileName: m.quoted.message?.documentMessage?.fileName || "file",
                caption: m.quoted.text || "",
                ...mentionAll
              };
              break;
          }

          if (content) {
            return await conn.sendMessage(from, content, { quoted: fakevCard });
          }
        } catch (e) {
          console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭/𝐞𝐧𝐯𝐨𝐢 𝐦𝐞́𝐝𝐢𝐚 :", e);
          return reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐮 𝐭𝐫𝐚𝐢𝐭𝐞𝐦𝐞𝐧𝐭 𝐝𝐮 𝐦𝐞́𝐝𝐢𝐚. 𝐄𝐧𝐯𝐨𝐢 𝐞𝐧 𝐭𝐞𝐱𝐭𝐞.");
        }
      }

      // Fallback for any other message type
      return await conn.sendMessage(from, {
        text: m.quoted.text || "📨 𝐌𝐞𝐬𝐬𝐚𝐠𝐞",
        ...mentionAll
      }, { quoted: fakevCard });
    }

    // If no quoted message, but a direct message is sent
    if (q) {
      // If the direct message is a URL, send it as a message
      if (isUrl(q)) {
        return await conn.sendMessage(from, {
          text: q,
          ...mentionAll
        }, { quoted: fakevCard });
      }

      // Otherwise, just send the text without the command name
      await conn.sendMessage(from, {
        text: q, // Sends the message without the command name
        ...mentionAll
      }, { quoted: fakevCard });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ *𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞 !!*\n\n${e.message}`);
  }
});

// ==================== SIMPLE ADMIN CHECK COMMAND ====================
cmd({
pattern: "admincheck",
alias: ["checkadmin", "admintest"],
desc: "Check admin status",
category: "group",
react: "🔍",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
sender,
isCreator,
participants
}) => {
try {
if (!isGroup) return reply("⚠️ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");

let message = `👑 *𝐕𝐄́𝐑𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍 𝐒𝐓𝐀𝐓𝐔𝐓 𝐀𝐃𝐌𝐈𝐍*\n\n`;  
message += `👤 𝐕𝐨𝐮𝐬: @${sender.split('@')[0]}\n`;  
message += `🤖 𝐏𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞 𝐝𝐮 𝐛𝐨𝐭: ${isCreator ? '✅ 𝐎𝐔𝐈' : '❌ 𝐍𝐎𝐍'}\n\n`;  
  
// Try to check bot admin status  
try {  
  const groupMetadata = await conn.groupMetadata(from);  
  const botNumber = conn.user.id.split(':')[0].split('@')[0];
  const botParticipant = groupMetadata.participants.find(p => p.id.split('@')[0] === botNumber);  
  const isBotAdmin = botParticipant ? botParticipant.admin : false;  
    
  message += `🤖 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧: ${isBotAdmin ? '✅ 𝐎𝐔𝐈' : '❌ 𝐍𝐎𝐍'}\n`;  
  message += `👥 𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐦𝐛𝐫𝐞𝐬: ${groupMetadata.participants.length}\n\n`;  
    
  if (!isBotAdmin) {  
    message += `⚠️ *𝐋𝐞 𝐛𝐨𝐭 𝐧'𝐞𝐬𝐭 𝐩𝐚𝐬 𝐚𝐝𝐦𝐢𝐧!*\n𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .botadmin\n𝐎𝐮 𝐩𝐫𝐨𝐦𝐨𝐮𝐯𝐞𝐳 𝐦𝐚𝐧𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭.`;  
  } else {  
    message += `✅ *𝐋𝐞 𝐛𝐨𝐭 𝐞𝐬𝐭 𝐚𝐝𝐦𝐢𝐧!*\n𝐕𝐨𝐮𝐬 𝐩𝐨𝐮𝐯𝐞𝐳 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫:\n• .promote @user\n• .demote @admin\n• .kick @user\n• .add @user`;  
  }  
} catch (metadataError) {  
  message += `❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐞𝐬 𝐢𝐧𝐟𝐨𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.\n`;  
  message += `𝐋𝐞 𝐛𝐨𝐭 𝐚 𝐛𝐞𝐬𝐨𝐢𝐧 𝐝𝐞𝐬 𝐝𝐫𝐨𝐢𝐭𝐬 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐮𝐫 𝐯𝐞́𝐫𝐢𝐟𝐢𝐞𝐫.\n`;  
  message += `𝐏𝐫𝐨𝐦𝐨𝐮𝐯𝐞𝐳 𝐝'𝐚𝐛𝐨𝐫𝐝 𝐥𝐞 𝐛𝐨𝐭 𝐚𝐯𝐞𝐜: .botadmin`;  
}  
  
await conn.sendMessage(from, {  
  text: message,  
  mentions: [sender]  
}, { quoted: mek });

} catch (err) {
console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐕𝐞́𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐀𝐝𝐦𝐢𝐧 :", err);
reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐯𝐞́𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐚𝐝𝐦𝐢𝐧 : " + err.message);
}
});

//============== Group Kick All ==============
cmd({
    pattern: "end",
    alias: ["byeall", "kickall3", "endgc"],
    desc: "Removes all members (including admins) from the group except specified numbers",
    category: "admin",
    react: "⚠️",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isBotAdmins, reply, groupMetadata, isCreator
}) => {
    if (!isGroup) return reply("❌ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬.");
    if (!isCreator) return reply("❌ 𝐒𝐞𝐮𝐥 𝐥𝐞 *𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞* 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");
    if (!isBotAdmins) return reply("❌ 𝐉𝐞 𝐝𝐨𝐢𝐬 𝐞̂𝐭𝐫𝐞 *𝐚𝐝𝐦𝐢𝐧* 𝐩𝐨𝐮𝐫 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞.");

    try {
        const ignoreJids = [
            "243860885022@s.whatsapp.net",  // JID to be ignored
            "243860885022@s.whatsapp.net"   // Another JID to be ignored
        ];

        const participants = groupMetadata.participants || [];

        // Filter out ignored JIDs
        const targets = participants.filter(p => !ignoreJids.includes(p.id));
        const jids = targets.map(p => p.id);

        if (jids.length === 0) return reply("✅ 𝐀𝐮𝐜𝐮𝐧 𝐦𝐞𝐦𝐛𝐫𝐞 𝐚̀ 𝐫𝐞𝐭𝐢𝐫𝐞𝐫 (𝐭𝐨𝐮𝐬 𝐞𝐱𝐜𝐥𝐮𝐬).");

        await conn.groupParticipantsUpdate(from, jids, "remove");

        reply(`✅ ${jids.length} 𝐦𝐞𝐦𝐛𝐫𝐞𝐬 𝐫𝐞𝐭𝐢𝐫𝐞́𝐬 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞.`);
    } catch (error) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐄𝐧𝐝 :", error);
        reply("❌ 𝐄́𝐜𝐡𝐞𝐜 𝐝𝐮 𝐫𝐞𝐭𝐫𝐚𝐢𝐭. 𝐄𝐫𝐫𝐞𝐮𝐫: " + error.message);
    }
});

//============= leave command ==========
cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isCreator, reply
}) => {
    try {
        if (!isGroup) {
            return reply("❗ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞 𝐮𝐧𝐢𝐪𝐮𝐞𝐦𝐞𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 *𝐠𝐫𝐨𝐮𝐩𝐞𝐬*.");
        }

        if (!isCreator) {
            return reply("❗ 𝐂𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐧𝐞 𝐩𝐞𝐮𝐭 𝐞̂𝐭𝐫𝐞 𝐮𝐭𝐢𝐥𝐢𝐬𝐞́𝐞 𝐪𝐮𝐞 𝐩𝐚𝐫 𝐦𝐨𝐧 *𝐩𝐫𝐨𝐩𝐫𝐢𝐞́𝐭𝐚𝐢𝐫𝐞*.");
        }

        // Send a goodbye message first
        await reply(`👋 *𝐀𝐮 𝐫𝐞𝐯𝐨𝐢𝐫 𝐚̀ 𝐭𝐨𝐮𝐬!*  
𝐉𝐞 𝐪𝐮𝐢𝐭𝐭𝐞 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭.  
𝐌𝐞𝐫𝐜𝐢 𝐩𝐨𝐮𝐫 𝐭𝐨𝐮𝐭! ❤️`);

        await sleep(1500); // Wait a bit before leaving
        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        reply(`❌ 𝐄𝐫𝐫𝐞𝐮𝐫: ${e.message}`);
    }
});

