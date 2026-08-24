const { cmd } = require('../arslan');
const axios = require('axios');

cmd({
  pattern: "apk",
  alias: ["app", "playstore", "application"],
  react: "☺️",
  desc: "Download APK via Aptoide",
  category: "download",
  use: ".apk <name>",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("*𝐕𝐎𝐔𝐒 𝐕𝐎𝐔𝐋𝐄𝐙 𝐓𝐄́𝐋𝐄́𝐂𝐇𝐀𝐑𝐆𝐄𝐑 𝐔𝐍𝐄 𝐀𝐏𝐊 🤔*\n*𝐄́𝐂𝐑𝐈𝐕𝐄𝐙 𝐂𝐎𝐌𝐌𝐄 𝐂𝐄𝐂𝐈 ☺️*\n\n*APK ❮𝐍𝐎𝐌 𝐃𝐄 𝐋'𝐀𝐏𝐊❯*\n\n*𝐋'𝐀𝐏𝐊 𝐒𝐄𝐑𝐀 𝐓𝐄́𝐋𝐄́𝐂𝐇𝐀𝐑𝐆𝐄́𝐄 𝐄𝐓 𝐄𝐍𝐕𝐎𝐘𝐄́𝐄 𝐈𝐂𝐈 😍🌹*");

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("*𝐀𝐏𝐊 𝐈𝐍𝐓𝐑𝐎𝐔𝐕𝐀𝐁𝐋𝐄 😔*");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);

    let caption = `*╭━━━〔 👑 APK INFO 👑 〕━━━┈⊷*
*┃ 👑 𝐍𝐎𝐌: ${app.name.toUpperCase()}*
*┃ 👑 𝐓𝐀𝐈𝐋𝐋𝐄 :❯ ${appSize} MB*
*┃ 👑 𝐏𝐀𝐐𝐔𝐄𝐓 :❯ ${app.package.toUpperCase()}*
*┃ 👑 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 :❯ ${app.file.vername}*
*╰━━━━━━━━━━━━━━━┈⊷*

*👑 𝐏𝐀𝐑 :❯ NAGI-MD 👑*`;

    await conn.sendMessage(from, { image: { url: app.icon }, caption }, { quoted: mek });

    await conn.sendMessage(from, {
      document: { url: app.file.path || app.file.path_alt },
      mimetype: "application/vnd.android.package-archive",
      fileName: `${app.name.toUpperCase()}.apk`
    }, { quoted: mek });

    await m.react("😍");
  } catch (err) {
    reply("*👑 𝐄𝐑𝐑𝐄𝐔𝐑 :❯* 𝐑𝐄́𝐄𝐒𝐒𝐀𝐘𝐄𝐙!");
  }
});
                   
