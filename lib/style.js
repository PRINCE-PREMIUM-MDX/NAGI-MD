const config = require('../config');

// ════════════════════════════════════════════════════════════
// 📁 SHARED NAGI MINI BOT STYLE HELPER
// Same decorative banner used across the Nagi Mini Bot repo's plugins,
// shared here so every NAGI MINI BOT plugin renders replies the
// same way instead of each file re-declaring its own copy.
// ════════════════════════════════════════════════════════════
function nagiMiniBot(title, value, status) {
    return `
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─᛭*
*│    ${config.BOT_NAME}*
*│❀ ⚙️ ${title}:* ${value}
*│❀ 🔘 𝐒𝐭𝐚𝐭𝐮𝐬:* ${status}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ${config.BOT_FOOTER || '© 𝐌ade 𝐈n 𝐁y 𝚸R!NC𝚵'}
`;
}

module.exports = { nagiMiniBot };
