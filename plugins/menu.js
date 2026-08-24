const { cmd, commands } = require('../arslan');
const config = require('../config');
const fs = require('fs');
const path = require('path');

// Emojis arrays
const menuEmojis = ['✨', '❤️‍🩹', '⭐', '💫', '🎯', '🎨', '🎪', '🎭'];
const activeEmojis = ['✅', '🟢', '💚', '✔️', '☑️'];
const disabledEmojis = ['❌', '🔴', '⛔', '🚫', '❎'];
const fastEmojis = ['⚡', '🚀', '💨', '⏱️', '🔥'];
const slowEmojis = ['🌒', '🐌', '⏳', '⌛', '🕐'];

const categoryEmojis = {
    general: ['📱', '🔧', '⚙️', '🛠️'],
    owner: ['👑', '🔱', '💎', '🎖️'],
    admin: ['🛡️', '⚔️', '🔐', '👮'],
    group: ['👥', '👫', '🧑‍🤝‍🧑', '👨‍👩‍👧‍👦'],
    download: ['📥', '⬇️', '💾', '📦'],
    ai: ['🤖', '🧠', '💭', '🎯'],
    search: ['🔍', '🔎', '🕵️', '📡'],
    info: ['ℹ️', '📋', '📊', '📄'],
    fun: ['🎮', '🎲', '🎰', '🎪'],
    games: ['🎮', '🕹️', '🎯', '🏆'],
    images: ['🖼️', '📸', '🎨', '🌄'],
    menu: ['📜', '📋', '📑', '📚'],
    tools: ['🔨', '🔧', '⚡', '🛠️'],
    stickers: ['🎭', '😀', '🎨', '🖼️'],
    utility: ['📂', '🔧', '⚙️', '🛠️'],
    settings: ['⚙️', '🔧', '🛠️', '📱']
};

function getRandomEmoji(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getCategoryEmoji(category) {
    const emojis = categoryEmojis[category.toLowerCase()] || ['📂', '📁', '🗂️', '📋'];
    return getRandomEmoji(emojis);
}

function formatTime() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Karachi'
    };
    return now.toLocaleTimeString('en-US', options);
}

// Command stats tracking
const commandStats = new Map();

cmd({
    pattern: "menu",
    alias: ["shelp", "smart", "help2"],
    desc: "Interactive smart menu with live status",
    category: "menu",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Get all commands
        const allCommands = Array.from(commands.values());
        const categories = [...new Set(allCommands.map(cmd => cmd.category))].filter(Boolean);

        // Calculate stats
        const stats = Array.from(commandStats.entries()).map(([cmd, data]) => ({
            command: cmd,
            usage: data.count,
            avgResponse: data.totalTime / data.count
        })).sort((a, b) => b.usage - a.usage);

        // Random emojis
        const menuEmoji = getRandomEmoji(menuEmojis);
        const activeEmoji = getRandomEmoji(activeEmojis);
        const disabledEmoji = getRandomEmoji(disabledEmojis);
        const fastEmoji = getRandomEmoji(fastEmojis);
        const slowEmoji = getRandomEmoji(slowEmojis);

        // Build menu text
        let menuText = `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ ${menuEmoji} ${config.OWNER_NAME || 'NAGI-MD'} ${menuEmoji} ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ 📱 𝐁𝐨𝐭:* ${config.BOT_NAME || '𝐍agi-𝐌d'}
*│❀ 🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* 5.0.0
*│❀ 👤 𝐎𝐰𝐧𝐞𝐫:* ${config.OWNER_NAME || 'NAGI-MD'}
*│❀ ⏰ 𝐓𝐢𝐦𝐞:* ${formatTime()}
*│❀ 🔣 𝐏𝐫𝐞𝐟𝐢𝐱:* ${config.PREFIX || '.'}
*│❀ 📊 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬:* ${allCommands.length}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

`;

        // Top commands
        const topCmds = stats.slice(0, 3);
        if (topCmds.length > 0) {
            menuText += `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 🔥 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 𝐏𝐎𝐏𝐔𝐋𝐀𝐈𝐑𝐄𝐒 🔥 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n`;

            topCmds.forEach((c, i) => {
                const rank = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
                menuText += `*│❀ ${rank} .${c.command}* • ${c.usage} 𝗨𝗧𝗜𝗟.\n`;
            });

            menuText += `*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*\n\n`;
        }

        // Categories loop
        for (const cat of categories) {
            const catEmoji = getCategoryEmoji(cat);
            const catCmds = allCommands.filter(cmd => cmd.category === cat);

            menuText += `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ ${catEmoji} ${cat.toUpperCase()} ${catEmoji} ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*\n`;

            catCmds.forEach((cmd, index) => {
                const cmdStats = commandStats.get(cmd.pattern);
                let speedTag = '';

                if (cmdStats) {
                    const avgTime = cmdStats.totalTime / cmdStats.count;
                    if (avgTime < 100) speedTag = ` ${fastEmoji}`;
                    else if (avgTime > 1000) speedTag = ` ${slowEmoji}`;
                }

                menuText += `*│❀ .${cmd.pattern}*${speedTag}\n`;
            });

            menuText += `*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*\n\n`;
        }

        // Legend
        menuText += `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 💡 𝐋𝐄́𝐆𝐄𝐍𝐃𝐄 💡 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ ${activeEmoji} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐀𝐂𝐓𝐈𝐕𝐄*
*│❀ ${disabledEmoji} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́𝐄*
*│❀ ${fastEmoji} 𝐑𝐄́𝐏𝐎𝐍𝐒𝐄 𝐑𝐀𝐏𝐈𝐃𝐄*
*│❀ ${slowEmoji} 𝐑𝐄́𝐏𝐎𝐍𝐒𝐄 𝐋𝐄𝐍𝐓𝐄*
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

 ${config.DESCRIPTION || '𝐁𝐎𝐓 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐌𝐔𝐋𝐓𝐈-𝐀𝐏𝐏𝐀𝐑𝐄𝐈𝐋𝐒'}`;

        // Image (falls back to the bot's default image if MENU_IMAGE_URL is unset)
        const menuImageUrl = config.MENU_IMAGE_URL || config.IMAGE_PATH || '';

        // Newsletter context (channel forward branding)
        const contextInfo = {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363410956242470@newsletter',
                newsletterName: config.BOT_NAME || '𝐍agi-𝐌d',
                serverMessageId: 143
            }
        };

        // Send with image
        await conn.sendMessage(from, {
            image: { url: menuImageUrl },
            caption: menuText,
            contextInfo: contextInfo
        }, { quoted: mek });

    } catch (error) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐌𝐞𝐧𝐮 :', error);
        const errorMsg = `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ ❌ 𝐄𝐑𝐑𝐄𝐔𝐑 ❌ ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ ⚠️ ${error.message || 'É𝐜𝐡𝐞𝐜 𝐝𝐮 𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭 𝐝𝐮 𝐦𝐞𝐧𝐮'}*
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

 ${config.DESCRIPTION || '𝐁𝐎𝐓 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐌𝐔𝐋𝐓𝐈-𝐀𝐏𝐏𝐀𝐑𝐄𝐈𝐋𝐒'}`;

        await conn.sendMessage(from, { text: errorMsg }, { quoted: mek });
    }
});

// Track command usage
module.exports.commandStats = commandStats;
