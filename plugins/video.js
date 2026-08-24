const axios = require('axios')
const yts = require('yt-search')
const { cmd } = require('../arslan')
const { fakevCard } = require('../lib/fakevCard')

cmd({
pattern: "video",
alias: ["vid","playvideo"],
desc: "Download YouTube Video (Fast)",
category: "download",
react: "🎬",
filename: __filename
},
async (conn, mek, m, { from, reply, text }) => {

try {

if (!text) {
return reply("❌ 𝐄𝐱𝐞𝐦𝐩𝐥𝐞:\n.video pasoori")
}

/* 🔍 Search */
const search = await yts(text)

if (!search.videos.length) {
return reply("❌ 𝐀𝐮𝐜𝐮𝐧𝐞 𝐯𝐢𝐝𝐞́𝐨 𝐭𝐫𝐨𝐮𝐯𝐞́𝐞")
}

const vid = search.videos[0]

/* 🎨 Preview */

const caption = `
╔ஜ۩▒█ ɴᴀɢɪ-ᴍᴅ  █▒۩ஜ╗
┃🎬 𝐕𝐈𝐃𝐄́𝐎 𝐓𝐑𝐎𝐔𝐕𝐄́𝐄
┃📌 𝐓𝐢𝐭𝐫𝐞: ${vid.title}
┃⏱️ 𝐃𝐮𝐫𝐞́𝐞: ${vid.timestamp}
┃⚡ 𝐄𝐧𝐯𝐨𝐢 𝐝𝐞 𝐥𝐚 𝐯𝐢𝐝𝐞́𝐨...
╰━━━━━━━━━━━━━━⊷
`

await conn.sendMessage(from,{
image:{url:vid.thumbnail},
caption
},{quoted:fakevCard})

/* 🎥 API */

const api = `https://arslan-apis-v2.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`

const res = await axios.get(api,{timeout:60000})

if(
!res.data ||
!res.data.status ||
!res.data.result ||
!res.data.result.download ||
!res.data.result.download.url
){
return reply("❌ É𝐜𝐡𝐞𝐜 𝐝𝐞 𝐥'𝐀𝐏𝐈 𝐯𝐢𝐝𝐞́𝐨")
}

const videoUrl = res.data.result.download.url
const title = res.data.result.metadata.title || vid.title

/* 🚀 SEND VIDEO DIRECT */

await conn.sendMessage(from,{
video:{url:videoUrl},
mimetype:"video/mp4",
caption:`🎬 *${title}*\n\n> © ʏxᴢ ᴍɪɴɪ ʙᴏᴛ`
},{quoted:fakevCard})

}catch(err){

console.log(err)
reply("❌ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐯𝐢𝐝𝐞́𝐨")

}

})
