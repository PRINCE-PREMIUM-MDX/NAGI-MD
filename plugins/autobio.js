const { cmd } = require('../arslan');
const config = require('../config');
const { nagi-md } = require('../lib/style');

cmd({
  pattern: "autobio",
  alias: ["bioauto", "setautobio"],
  react: "😎",
  category: "owner",
  desc: "Auto bio on/off",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, isOwner }) => {
  try {

    // 🔐 Owner only
    if (!isOwner) {
      return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    }

    const state = q?.toLowerCase();

    // ❓ Help / status
    if (!state || !["on", "off"].includes(state)) {
      return reply(nagi-md('AUTO BIO', global.autoBio ? '𝐀𝐂𝐓𝐈𝐕𝐄́ ✅' : '𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄́ ❌', '𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐳: .autobio on/off'));
    }

    // ✅ Set state
    global.autoBio = state === "on";

    if (global.autoBio) {
      updateBio(conn);
    }

    return reply(nagi-md('AUTO BIO', state === 'on' ? '𝐀𝐜𝐭𝐢𝐯𝐞́ ✅' : '𝐃𝐞́𝐬𝐚𝐜𝐭𝐢𝐯𝐞́ ❌', state === 'on' ? '🟢' : '🔴'));

  } catch (e) {
    console.error("AUTOBIO ERROR:", e);
    reply(nagi-md('AUTO BIO', '𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞', '❌'));
  }
});


// ================= BIO UPDATER =================
async function updateBio(conn) {
  if (!global.autoBio) return;

  try {
    const uptime = clockString(process.uptime() * 1000);
    const botname = config.BOT_NAME || "𝐍agi-𝐌d";

    const bio = `👑 ${botname} 𝐀𝐂𝐓𝐈𝐅 (${uptime}) 👑`;
    await conn.updateProfileStatus(bio);

    console.log("✅ BIO UPDATED:", bio);
  } catch (err) {
    console.log("❌ BIO UPDATE FAILED:", err.message);
  }

  // ⏱️ 1 minute loop
  setTimeout(() => updateBio(conn), 60 * 1000);
}


// ================= TIME FORMAT =================
function clockString(ms) {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;

  let str = "";
  if (d) str += `${d}D `;
  if (h) str += `${h}H `;
  if (m) str += `${m}M `;
  if (s) str += `${s}S`;
  return str.trim();
}
