const { cmd } = require('../arslan');
const { setAntideleteStatus, getAntideleteStatus } = require('../data/Antidelete');
const { nagi-md } = require('../lib/style');

cmd({
    pattern: "antidelete",
    alias: ["antidel"],
    desc: "Turn Antidelete on/off",
    category: "owner",
    react: "🛡️"
},
async(conn, mek, m, { args, isOwner, reply, from }) => {
    if (!isOwner) return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    const mode = args[0]?.toLowerCase();

    if (mode === 'on' || mode === 'enable') {
        await setAntideleteStatus(from, true);
        await reply(nagi-md('ANTI-DELETE', '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅', '🟢'));
    } else if (mode === 'off' || mode === 'disable') {
        await setAntideleteStatus(from, false);
        await reply(nagi-md('ANTI-DELETE', '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌', '🔴'));
    } else {
        const current = await getAntideleteStatus(from);
        await reply(nagi-md('ANTI-DELETE', current ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .antidelete on/off'));
    }
});
