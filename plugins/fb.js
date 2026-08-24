const { cmd } = require('../arslan');
const axios = require('axios');

cmd({
  pattern: "fb",
  react: "☺️",
  alias: ["facebook", "fbdl"],
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("*𝐕𝐎𝐔𝐒 𝐕𝐎𝐔𝐋𝐄𝐙 𝐓𝐄́𝐋𝐄́𝐂𝐇𝐀𝐑𝐆𝐄𝐑 𝐔𝐍𝐄 𝐕𝐈𝐃𝐄́𝐎 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 🤔 𝐂𝐎𝐏𝐈𝐄𝐙 𝐋𝐄 𝐋𝐈𝐄𝐍 𝐃𝐄 𝐋𝐀 𝐕𝐈𝐃𝐄́𝐎 🤗*\n*𝐏𝐔𝐈𝐒 𝐄́𝐂𝐑𝐈𝐕𝐄𝐙 ☺️*\n\n*FB ❮𝐋𝐈𝐄𝐍 𝐕𝐈𝐃𝐄́𝐎 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊❯*\n\n*𝐋𝐀 𝐕𝐈𝐃𝐄́𝐎 𝐒𝐄𝐑𝐀 𝐓𝐄́𝐋𝐄́𝐂𝐇𝐀𝐑𝐆𝐄́𝐄 𝐄𝐓 𝐄𝐍𝐕𝐎𝐘𝐄́𝐄 𝐈𝐂𝐈 😍♥️*");

    const apiUrl = `https://movanest.xyz/v2/fbdown?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    // 🔎 API status check
    if (data.status !== true) {
      return reply("𝐄𝐑𝐑𝐄𝐔𝐑 𝐀𝐏𝐈 😢");
    }

    // 🔎 Results check
    if (!Array.isArray(data.results) || data.results.length === 0) {
      return reply("*𝐕𝐈𝐃𝐄́𝐎 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐍𝐓𝐑𝐎𝐔𝐕𝐀𝐁𝐋𝐄 🥺*");
    }

    const result = data.results[0];

    // 🎥 Quality selection (API ke mutabiq)
    const videoUrl = result.hdQualityLink
      ? result.hdQualityLink
      : result.normalQualityLink;

    if (!videoUrl) {
      return reply("*𝐃𝐎𝐍𝐍𝐄𝐙 𝐔𝐍𝐈𝐐𝐔𝐄𝐌𝐄𝐍𝐓 𝐔𝐍 𝐋𝐈𝐄𝐍 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 ☺️*");
    }

    // 📝 Caption API data se
    const caption = `*👑 𝐕𝐈𝐃𝐄́𝐎 𝐅𝐁 👑*
*👑 𝐃𝐔𝐑𝐄́𝐄 :❯ ${result.duration}*
*👑 𝐂𝐑𝐄́𝐀𝐓𝐄𝐔𝐑 :❯ ${data.creator}*
*👑 𝐏𝐀𝐑 :❯ NAGI-MD 👑*`;

    await conn.sendMessage(
      from,
      {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: caption
      },
      { quoted: mek }
    );

  } catch (err) {
    console.log(err);
    reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞");
  }
});
