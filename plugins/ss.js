const { cmd } = require('../arslan');
const axios = require('axios');

cmd({
  pattern: "screenshot",
  alias: ["ss", "webshot", "sitepic"],
  react: "🖥️",
  category: "tools",
  desc: "Take full HD desktop screenshot of a website",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(
        "*🖥️ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐂𝐀𝐏𝐓𝐔𝐑𝐄 𝐃'É𝐂𝐑𝐀𝐍*\n\n" +
        "𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧:\n" +
        "*.screenshot <𝐔𝐑𝐋 𝐝𝐮 𝐬𝐢𝐭𝐞>*\n\n" +
        "𝐄𝐱𝐞𝐦𝐩𝐥𝐞:\n" +
        "*.screenshot https://google.com*"
      );
    }

    // ✅ API call to movanest.xyz for full HD screenshot (1280x720)
    const apiUrl = `https:///movanest.xyz/v2/ssweb?url=${encodeURIComponent(q)}&width=1280&height=720&full_page=true`;
    const res = await axios.get(apiUrl, { timeout: 60000 });

    if (!res.data || !res.data.status || !res.data.screenshot) {
      return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐠𝐞́𝐧𝐞́𝐫𝐞𝐫 𝐥𝐚 𝐜𝐚𝐩𝐭𝐮𝐫𝐞 / 𝐩𝐚𝐬 𝐝𝐞 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞 𝐝𝐞 𝐥'𝐀𝐏𝐈");
    }

    const screenshotUrl = res.data.screenshot;

    // ✅ Send screenshot
    await conn.sendMessage(from, {
      image: { url: screenshotUrl },
      caption: `🖥️ 𝐂𝐚𝐩𝐭𝐮𝐫𝐞 𝐝𝐞: ${q}`
    }, { quoted: mek });

  } catch (err) {
    console.error("𝐄𝐑𝐑𝐄𝐔𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄 𝐒𝐂𝐑𝐄𝐄𝐍𝐒𝐇𝐎𝐓 :", err.message);
    reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐠𝐞́𝐧𝐞́𝐫𝐞𝐫 𝐥𝐚 𝐜𝐚𝐩𝐭𝐮𝐫𝐞 / 𝐀𝐏𝐈 𝐨𝐜𝐜𝐮𝐩𝐞́𝐞");
  }
});
