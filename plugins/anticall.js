const { cmd } = require('../arslan');
const config = require('../config');
const { nagi-md } = require('../lib/style');


cmd({
    pattern: "anti-call",
    react: "👑",
    alias: ["anticall"],
    desc: "Enable or disable welcome messages for new members",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTI_CALL = "true";
        return reply(nagi-md('ANTI-CALL', '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅', '🟢'));
    } else if (status === "off") {
        config.ANTI_CALL = "false";
        return reply(nagi-md('ANTI-CALL', '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌', '🔴'));
    } else {
        return reply(nagi-md('ANTI-CALL', config.ANTI_CALL === 'true' ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .anticall on/off'));
    }
});
