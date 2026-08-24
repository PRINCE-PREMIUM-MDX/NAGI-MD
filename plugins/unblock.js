const { cmd } = require('../arslan');

cmd({
  pattern: "unblock",
  alias: ["unb", "unblk", "unblok"],
  react: "🥰",
  category: "owner",
  desc: "Unblock user (reply or inbox)",
  filename: __filename
}, async (conn, mek, m, { from, reply, isOwner }) => {
  try {

    // 🔒 Owner only
    if (!isOwner) {
      return reply("*𝐂𝐄𝐓𝐓𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐄𝐒𝐓 𝐑𝐄́𝐒𝐄𝐑𝐕𝐄́𝐄 𝐀𝐔 𝐏𝐑𝐎𝐏𝐑𝐈𝐄́𝐓𝐀𝐈𝐑𝐄 😎*");
    }

    let jid;

    // 📌 Reply case
    if (m.quoted) {
      jid = m.quoted.sender;
    }
    // 📌 Inbox case
    else if (from.endsWith("@s.whatsapp.net")) {
      jid = from;
    } 
    else {
      return reply("*𝐑𝐄́𝐏𝐎𝐍𝐃𝐄𝐙 𝐀̀ 𝐔𝐍 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐎𝐔 𝐄́𝐂𝐑𝐈𝐕𝐄𝐙 𝐄𝐍 𝐈𝐍𝐁𝐎𝐗 𝐏𝐎𝐔𝐑 𝐃𝐄́𝐁𝐋𝐎𝐐𝐔𝐄𝐑 ☺️*");
    }

    await conn.updateBlockStatus(jid, "unblock");

    await conn.sendMessage(from, {
      react: { text: "🥰", key: mek.key }
    });

    reply(`*𝐕𝐎𝐔𝐒 𝐀𝐕𝐄𝐙 É𝐓É 𝐃É𝐁𝐋𝐎𝐐𝐔É ☺️*`, { mentions: [jid] });

  } catch (e) {
    console.log("𝐄𝐑𝐑𝐄𝐔𝐑 𝐃É𝐁𝐋𝐎𝐂𝐀𝐆𝐄 :", e);
    reply("*❌ É𝐂𝐇𝐄𝐂 𝐃𝐔 𝐃É𝐁𝐋𝐎𝐂𝐀𝐆𝐄 😔*");
  }
});
