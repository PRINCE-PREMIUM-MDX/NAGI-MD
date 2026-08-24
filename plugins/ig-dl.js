const axios = require("axios");
const { cmd } = require('../arslan');
const { fakevCard } = require('../lib/fakevCard');

cmd({
    pattern: "igdl",
    alias: ["instagram", "insta", "ig"],
    react: "⬇️",
    desc: "Download Instagram videos/reels",
    category: "downloader",
    use: ".igdl <Instagram URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
    try {
        const url = q || m.quoted?.text;
        if (!url || !url.includes("instagram.com")) {
            return reply("❌ 𝐃𝐨𝐧𝐧𝐞𝐳/𝐫𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐮𝐧 𝐥𝐢𝐞𝐧 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦");
        }

        // Show processing reaction
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Fetch from API
        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.data?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("É𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧. 𝐋𝐢𝐞𝐧 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞 𝐨𝐮 𝐜𝐨𝐧𝐭𝐞𝐧𝐮 𝐩𝐫𝐢𝐯𝐞́.");
        }

        // Send all media items
        for (const item of response.data.data) {
            await conn.sendMessage(from, {
                [item.type === 'video' ? 'video' : 'image']: { url: item.url },
                caption: `‎*_ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*

‎╔ஜ۩▒█ *𝐍agi-𝐌d* █▒۩ஜ╗
‎*|* 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐍agi-𝐌d* 
‎*╰━━━━━━━━━━━━━━━━━━⊷*
‎`
            }, { quoted: fakevCard });
        }

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐈𝐆𝐃𝐋 :', error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply("❌ É𝐜𝐡𝐞𝐜 𝐝𝐮 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
    }
});

cmd({
  pattern: "igdl4",
  alias: ["instagram4", "insta4", "ig4", "igvideo4"],
  react: '📶',
  desc: "Download videos from Instagram (Alternative API)",
  category: "download",
  use: ".igdl2 <Instagram URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const igUrl = args[0];
    if (!igUrl || !igUrl.includes("instagram.com")) {
      return reply('𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧𝐞 𝐔𝐑𝐋 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐯𝐚𝐥𝐢𝐝𝐞. 𝐄𝐱𝐞𝐦𝐩𝐥𝐞: `.igdl2 https://instagram.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://bk9.fun/download/instagram?url=${encodeURIComponent(igUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.status || !response.data?.BK9?.[0]?.url) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply('❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨. 𝐄𝐬𝐬𝐚𝐲𝐞𝐳 .igdl2.');
    }

    const videoUrl = response.data.BK9[0].url;
    await conn.sendMessage(from, { react: { text: '📶', key: m.key } });

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply('❌ É𝐜𝐡𝐞𝐜 𝐝𝐮 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.');
    }

    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: `*_ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*

‎‎╔ஜ۩▒█ *𝐍agi-𝐌d* █▒۩ஜ╗
‎*|* 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐍agi-𝐌d* 
‎*╰━━━━━━━━━━━━━━━━━━⊷*`
    }, { quoted: fakevCard });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭 𝐯𝐢𝐝𝐞́𝐨 :', error);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply('❌ 𝐄́𝐜𝐡𝐞𝐜 𝐀𝐏𝐈 2. 𝐄𝐬𝐬𝐚𝐲𝐞𝐳 .igdl.');
  }
});

cmd({
  pattern: "igdl2",
  alias: ["instagram2", "ig2", "instadl2"],
  react: '📥',
  desc: "Download videos from Instagram (API v5)",
  category: "download",
  use: ".igdl5 <Instagram video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const igUrl = args[0];
    if (!igUrl || !igUrl.includes("instagram.com")) {
      return reply('❌ 𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧𝐞 𝐔𝐑𝐋 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐯𝐚𝐥𝐢𝐝𝐞.\n\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞:\n.igdl5 https://instagram.com/reel/...');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(igUrl)}`;
    const response = await axios.get(apiUrl);

    const data = response.data;

    if (!data.status || !data.result || !Array.isArray(data.result)) {
      return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨. 𝐕𝐞́𝐫𝐢𝐟𝐢𝐞𝐳 𝐥'𝐔𝐑𝐋.");
    }

    const videoUrl = data.result[0];
    if (!videoUrl) return reply("❌ 𝐀𝐮𝐜𝐮𝐧𝐞 𝐯𝐢𝐝𝐞́𝐨 𝐭𝐫𝐨𝐮𝐯𝐞́𝐞.");

    const metadata = data.metadata || {};
    const author = metadata.author || "𝐈𝐧𝐜𝐨𝐧𝐧𝐮";
    const caption = metadata.caption ? metadata.caption.slice(0, 300) + "..." : "𝐀𝐮𝐜𝐮𝐧𝐞 𝐥𝐞́𝐠𝐞𝐧𝐝𝐞.";
    const likes = metadata.like || 0;
    const comments = metadata.comment || 0;

    await reply('𝐄𝐍𝐕𝐎𝐈 𝐃𝐄 𝐕𝐎𝐓𝐑𝐄 𝐕𝐈𝐃𝐄́𝐎, 𝐏𝐀𝐓𝐈𝐄𝐍𝐓𝐄𝐙...');

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: `📥 *𝐓𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐮𝐫 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐑𝐞𝐞𝐥*\n👤 *𝐀𝐮𝐭𝐞𝐮𝐫:* ${author}\n💬 *𝐋𝐞́𝐠𝐞𝐧𝐝𝐞:* ${caption}\n❤️ *𝐋𝐢𝐤𝐞𝐬:* ${likes} | 💭 *𝐂𝐨𝐦𝐦𝐞𝐧𝐭𝐚𝐢𝐫𝐞𝐬:* ${comments}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ☬༒𝐍agi-𝐌d༒☬`
    }, { quoted: fakevCard });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('𝐄𝐫𝐫𝐞𝐮𝐫 𝐈𝐆𝐃𝐋5 :', error);
    reply('❌ É𝐜𝐡𝐞𝐜 𝐝𝐮 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭. 𝐑𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
cmd({
    pattern: "ig3",
    alias: ["insta3", "instagram3"],
    desc: "Download Instagram video",
    category: "downloader",
    react: "⤵️",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧 𝐥𝐢𝐞𝐧 𝐯𝐢𝐝𝐞́𝐨 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦.");
        if (!q.includes("instagram.com")) return reply("𝐋𝐢𝐞𝐧 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐞.");
        
        reply("𝐓𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐦𝐞𝐧𝐭 𝐞𝐧 𝐜𝐨𝐮𝐫𝐬, 𝐩𝐚𝐭𝐢𝐞𝐧𝐭𝐞𝐳...");
        
        const apiUrl = `https://rest-lily.vercel.app/api/downloader/igdl?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data || !data.data[0]) return reply("É𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐞 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨.");
        
        const { url } = data.data[0];
        
        const caption = 
`*_ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*

‎╔ஜ۩▒█ *𝐍agi-𝐌d* █▒۩ஜ╗
‎*|* 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐍agi-𝐌d* 
‎*╰━━━━━━━━━━━━━━━━━━⊷*`;
        
        await conn.sendMessage(from, {
            video: { url: url },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: fakevCard });
        
    } catch (e) {
        console.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 :", e);
        reply(`𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${e.message}`);
    }
});
