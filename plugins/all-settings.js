const { cmd } = require('../arslan');
const { updateUserConfig } = require('../lib/database');
const { nagi-md } = require('../lib/style');

// Helper function to update config in memory and database
const updateConfig = async (key, value, botNumber, config, reply) => {
    try {
        // 1. Update in-memory config (Immediate)
        config[key] = value;

        // 2. Update in Database (Persistent)
        const newConfig = { ...config };
        newConfig[key] = value;

        await updateUserConfig(botNumber, newConfig);

        const statusIcon = (value === 'true') ? '🟢 ON' : (value === 'false') ? '🔴 OFF' : value;
        return reply(nagi-md(key.replace(/_/g, ' '), '𝐌𝐢𝐬 𝐚̀ 𝐣𝐨𝐮𝐫 ✅', statusIcon));
    } catch (e) {
        console.error(e);
        return reply(𝐍agi-𝐌d(key.replace(/_/g, ' '), '𝐄́𝐜𝐡𝐞𝐜 𝐝𝐞 𝐦𝐢𝐬𝐞 𝐚̀ 𝐣𝐨𝐮𝐫', '⚠️'));
    }
};

// ============================================================
// 1. PRESENCE MANAGEMENT (Recording / Typing)
// ============================================================

cmd({
    pattern: "autorecording",
    alias: ["autorec", "arecording"],
    desc: "Enable/Disable auto recording simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_RECORDING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_RECORDING', 'false', botNumber, config, reply);
    } else {
        reply(yxzMiniBot('AUTO RECORDING', config.AUTO_RECORDING === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autorecording on/off'));
    }
});

cmd({
    pattern: "autotyping",
    alias: ["autotype", "atyping"],
    desc: "Enable/Disable auto typing simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_TYPING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_TYPING', 'false', botNumber, config, reply);
    } else {
        reply(yxzMiniBot('AUTO TYPING', config.AUTO_TYPING === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autotyping on/off'));
    }
});

// ============================================================
// 2. CALL MANAGEMENT (Anti-Call)
// ============================================================

cmd({
    pattern: "anticall",
    alias: "acall",
    desc: "Auto reject calls",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('ANTI_CALL', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('ANTI_CALL', 'false', botNumber, config, reply);
    } else {
        reply(yxzMiniBot('ANTICALL', config.ANTI_CALL === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .anticall on/off'));
    }
});

// ============================================================
// 3. GROUP MANAGEMENT (Welcome / Goodbye)
// ============================================================

cmd({
    pattern: "welcome",
    desc: "Enable/Disable welcome messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('WELCOME', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('WELCOME', 'false', botNumber, config, reply);
    } else {
        reply(nagi-md('WELCOME', config.WELCOME === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .welcome on/off'));
    }
});

cmd({
    pattern: "goodbye",
    desc: "Enable/Disable goodbye messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('GOODBYE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('GOODBYE', 'false', botNumber, config, reply);
    } else {
        reply(nagi-md('GOODBYE', config.GOODBYE === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .goodbye on/off'));
    }
});

// ============================================================
// 4. READ & STATUS MANAGEMENT
// ============================================================

cmd({
    pattern: "autoread",
    desc: "Enable/Disable auto read messages (Blue Tick)",
    category: "settings",
    react: "👀"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('READ_MESSAGE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('READ_MESSAGE', 'false', botNumber, config, reply);
    } else {
        // FIX: this reply used to be a truncated/unterminated sentence
        // ("...USKA MSG KHUD HI SEEN ") that never told the user how to
        // toggle the feature — now uses the same banner as everything else.
        reply(nagi-md('AUTO READ', config.READ_MESSAGE === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autoread on/off'));
    }
});

cmd({
    pattern: "autoviewsview",
    alias: ["avs", "statusseen", "astatus"],
    desc: "Auto view status updates",
    category: "settings",
    react: "😎"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_VIEW_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_VIEW_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(nagi-md('AUTO STATUS VIEW', config.AUTO_VIEW_STATUS === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autoviewsview on/off'));
    }
});

cmd({
    pattern: "autolikestatus",
    alias: ["als"],
    desc: "Auto like status updates",
    category: "settings",
    react: "❤️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_LIKE_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_LIKE_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(nagi-md('AUTO LIKE STATUS', config.AUTO_LIKE_STATUS === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autolikestatus on/off'));
    }
});

// ============================================================
// 5B. AUTO REACT MANAGEMENT
// ============================================================

cmd({
    pattern: "autoreact",
    alias: ["areact"],
    desc: "Auto react to every incoming message with a random emoji",
    category: "settings",
    react: "🎉"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const value = args[0]?.toLowerCase();

    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_REACT', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_REACT', 'false', botNumber, config, reply);
    } else {
        reply(nagi-md('AUTO REACT', config.AUTO_REACT === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autoreact on/off'));
    }
});

// ============================================================
// 5. SYSTEM (Mode & Prefix)
// ============================================================

cmd({
    pattern: "mode",
    desc: "Change bot mode (public/private/groups/inbox)",
    category: "settings",
    react: "⚙️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const mode = args[0]?.toLowerCase();
    const validModes = ['public', 'private', 'groups', 'inbox'];

    if (validModes.includes(mode)) {
        await updateConfig('WORK_TYPE', mode, botNumber, config, reply);
    } else {
        reply(nagi-md('MODE', config.WORK_TYPE, `𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .mode <${validModes.join('/')}>`));
    }
});

cmd({
    pattern: "setprefix",
    desc: "Change bot prefix",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const newPrefix = args[0];

    if (newPrefix) {
        // Ensure prefix is short (single character or short string)
        if (newPrefix.length > 1 && newPrefix !== 'noprefix') return reply(nagi-md('SETPREFIX', '𝐑𝐞𝐣𝐞𝐭𝐞́', '𝐃𝐨𝐢𝐭 𝐞̂𝐭𝐫𝐞 𝐜𝐨𝐮𝐫𝐭, 𝐞𝐱: . 𝐨𝐮 ! 𝐨𝐮 #'));

        await updateConfig('PREFIX', newPrefix, botNumber, config, reply);
    } else {
        reply(nagi-md('PREFIX', config.PREFIX, '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .setprefix <symbol>'));
    }
});
