const { cmd } = require("../arslan");
const fetch = require("node-fetch");
const yts = require("yt-search");
const axios = require("axios");
const { fakevCard } = require('../lib/fakevCard');

cmd({
pattern: "song",
alias: ["ytmp3", "play", "mp3", "gana", "music", "audio"],
react: "🎵",
desc: "YouTube search & MP3 play",
category: "download",
use: ".play ",
filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {

try {

const query = args.join(" ");
if (!query) return reply("❌ 𝐃𝐨𝐧𝐧𝐞𝐳-𝐦𝐨𝐢 𝐮𝐧 𝐧𝐨𝐦 𝐝𝐞 𝐜𝐡𝐚𝐧𝐬𝐨𝐧 𝐨𝐮 𝐮𝐧 𝐥𝐢𝐞𝐧");

await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

/* 🔍 YouTube Search */
const search = await yts(query);

if (!search.videos || !search.videos.length) {
return reply("❌ 𝐀𝐮𝐜𝐮𝐧 𝐫𝐞́𝐬𝐮𝐥𝐭𝐚𝐭 𝐭𝐫𝐨𝐮𝐯𝐞́");
}

const video = search.videos[0];

/* 🎧 MP3 API */
const apiUrl = `https://arslan-apis-v2.vercel.app/download/ytmp4?url=${video.url}`;

const res = await axios.get(apiUrl, { timeout: 60000 });

if (
 !res.data ||
 !res.data.status ||
 !res.data.result ||
 !res.data.result.download ||
 !res.data.result.download.url
) {
 return reply("❌ 𝐀𝐮𝐝𝐢𝐨 𝐧𝐨𝐧 𝐠𝐞́𝐧𝐞́𝐫𝐞́");
}

const dlUrl = res.data.result.download.url;
const meta = res.data.result.metadata;
const quality = res.data.result.download.quality || "128kbps";

/* 🎵 SEND AUDIO */
await conn.sendMessage(from, {
audio: { url: dlUrl },
mimetype: "audio/mpeg",
ptt: false,
fileName: `${meta.title || "song"}.mp3`,
caption:
`🎵 *${meta.title || "𝐓𝐢𝐭𝐫𝐞 𝐢𝐧𝐜𝐨𝐧𝐧𝐮"}*\n` +
`🎚️ 𝐐𝐮𝐚𝐥𝐢𝐭𝐞́: ${quality}\n\n` +
`> © Nagi-md`,
contextInfo: {
externalAdReply: {
title: meta.title
? meta.title.substring(0, 40)
: "𝐂𝐡𝐚𝐧𝐬𝐨𝐧 𝐘𝐨𝐮𝐓𝐮𝐛𝐞",
body: "▶︎ •၊၊||၊|။||||။‌‌‌‌‌၊|• ★彡ɴᴀɢɪ-ᴍᴅ ʙᴏᴛ-ʙᴇᴀᴛꜱ彡★",
thumbnailUrl: video.thumbnail,
sourceUrl: video.url,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: fakevCard });

await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

} catch (err) {

console.error("𝐄𝐑𝐑𝐄𝐔𝐑 𝐏𝐋𝐀𝐘 :", err);

reply("❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞, 𝐫𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝");

await conn.sendMessage(from, { react: { text: "❌", key: m.key } });

}

});


cmd({
  'pattern': 'video1',
  'alias': ["vid", "ytv"],
  'desc': "Download YouTube Video",
  'category': 'downloader',
  'react': '🪄',
  'filename': __filename
}, async (_0x291138, _0x40711d, _0x320efe, {
  from: _0x3764b7,
  q: _0x247990,
  reply: _0x5286ec
}) => {
  try {
    if (!_0x247990) {
      return _0x5286ec("𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧 𝐥𝐢𝐞𝐧 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐨𝐮 𝐮𝐧𝐞 𝐫𝐞𝐜𝐡𝐞𝐫𝐜𝐡𝐞.\n\n𝐄𝐱𝐞𝐦𝐩𝐥𝐞: .video Pasoori");
    }
    let _0x3460a4;
    if (_0x247990.includes("youtube.com") || _0x247990.includes('youtu.be')) {
      _0x3460a4 = _0x247990;
    } else {
      let _0x145978 = await yts(_0x247990);
      if (!_0x145978 || !_0x145978.videos || _0x145978.videos.length === 0x0) {
        return _0x5286ec("𝐀𝐮𝐜𝐮𝐧 𝐫𝐞́𝐬𝐮𝐥𝐭𝐚𝐭.");
      }
      _0x3460a4 = _0x145978.videos[0x0].url;
    }
    let _0x32732f = await fetch("https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" + encodeURIComponent(_0x3460a4));
    let _0x207ba6 = await _0x32732f.json();
    if (!_0x207ba6.status) {
      return _0x5286ec("É𝐜𝐡𝐞𝐜 𝐝𝐞 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐞 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨.");
    }
    let {
      video_url_hd: _0x2500e4,
      video_url_sd: _0x1f2e71
    } = _0x207ba6.result.media;
    let _0x5f2691 = _0x2500e4 !== "No HD video URL available" ? _0x2500e4 : _0x1f2e71;
    if (!_0x5f2691 || _0x5f2691.includes('No')) {
      return _0x5286ec("𝐀𝐮𝐜𝐮𝐧𝐞 𝐯𝐢𝐝𝐞́𝐨 𝐭𝐞́𝐥𝐞́𝐜𝐡𝐚𝐫𝐠𝐞𝐚𝐛𝐥𝐞 𝐭𝐫𝐨𝐮𝐯𝐞́𝐞.");
    }
    await _0x291138.sendMessage(_0x3764b7, {
      'video': {
        'url': _0x5f2691
      },
      'caption': "*❀༒★[ɴᴀɢɪ-ᴍᴅ]★༒❀*"
    }, {
      'quoted': fakevCard
    });
  } catch (_0x4a5abf) {
    _0x5286ec("𝐄𝐫𝐫𝐞𝐮𝐫 𝐥𝐨𝐫𝐬 𝐝𝐞 𝐥𝐚 𝐫𝐞́𝐜𝐮𝐩𝐞́𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐞 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨.");
    console.log(_0x4a5abf);
  }
});
