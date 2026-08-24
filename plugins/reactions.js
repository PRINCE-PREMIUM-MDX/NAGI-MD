const { cmd } = require('../arslan');
const axios = require('axios');

const messages = {
    awoo: "hurle", bite: "mord", blush: "rougit", bonk: "assomme", bully: "embête",
    cringe: "grimace", cry: "pleure", cuddle: "câline", dance: "danse", glomp: "saute sur",
    handhold: "tient la main de", happy: "est content(e)", highfive: "tape dans la main de",
    hug: "prend dans ses bras", kill: "tue", kiss: "embrasse", lick: "lèche", nom: "grignote",
    pat: "caresse", poke: "pique", slap: "gifle", smile: "sourit", smug: "est fier(ère)",
    wave: "salue", wink: "fait un clin d'œil", yeet: "envoie balader"
};

const emojis = {
    awoo: "🐺", bite: "😬", blush: "😊", bonk: "🔨", bully: "😈", cringe: "😖", cry: "😢",
    cuddle: "🤗", dance: "💃", glomp: "🤸", handhold: "🤝", happy: "😄", highfive: "🖐️",
    hug: "🤗", kill: "🔪", kiss: "😘", lick: "👅", nom: "😋", pat: "🖐️", poke: "👉",
    slap: "🖐️", smile: "😊", smug: "😏", wave: "👋", wink: "😉", yeet: "🚀"
};

// nekos.best utilise des noms différents pour certaines actions
const nekosBestMap = {
    bite: "bite", blush: "blush", cry: "cry", cuddle: "cuddle", dance: "dance",
    handhold: "handhold", highfive: "highfive", hug: "hug", kiss: "kiss", pat: "pat",
    poke: "poke", slap: "slap", smile: "smile", wave: "wave", wink: "wink"
};

// purrbot.site (3e source de secours)
const purrbotMap = {
    cuddle: "cuddle", hug: "hug", kiss: "kiss", pat: "pat", slap: "slap", lick: "lick"
};

async function getGifUrl(action) {
    // 1ère tentative: waifu.pics
    try {
        const res = await axios.get(`https://api.waifu.pics/sfw/${action}`, { timeout: 10000 });
        if (res.data && res.data.url) return res.data.url;
    } catch (e) {}

    // 2e tentative: nekos.best
    const nekosAction = nekosBestMap[action];
    if (nekosAction) {
        try {
            const res = await axios.get(`https://nekos.best/api/v2/${nekosAction}`, { timeout: 10000 });
            if (res.data && res.data.results && res.data.results[0]) return res.data.results[0].url;
        } catch (e) {}
    }

    // 3e tentative: purrbot.site
    const purrAction = purrbotMap[action];
    if (purrAction) {
        try {
            const res = await axios.get(`https://purrbot.site/api/img/sfw/${purrAction}/gif`, { timeout: 10000 });
            if (res.data && res.data.link) return res.data.link;
        } catch (e) {}
    }

    return null;
}

for (const action of Object.keys(messages)) {
    cmd({
        pattern: action,
        desc: `Envoyer un GIF de réaction: ${action}`,
        category: "fun",
        react: emojis[action],
        filename: __filename
    },
    async (conn, mek, m, { from, sender, reply }) => {
        try {
            const mentionedUser = m.mentionedJid && m.mentionedJid[0];
            const senderTag = `@${sender.split('@')[0]}`;

            const message = mentionedUser
                ? `${senderTag} ${messages[action]} @${mentionedUser.split('@')[0]}`
                : `${senderTag} ${messages[action]} !`;

            const gifUrl = await getGifUrl(action);
            if (!gifUrl) {
                return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫é𝐜𝐮𝐩é𝐫𝐞𝐫 𝐥𝐞 𝐆𝐈𝐅. 𝐑é𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
            }

            await conn.sendMessage(from, {
                video: { url: gifUrl },
                caption: message,
                gifPlayback: true,
                mentions: [sender, mentionedUser].filter(Boolean)
            }, { quoted: mek });
        } catch (error) {
            console.error(`❌ 𝐄𝐫𝐫𝐞𝐮𝐫 .${action} :`, error.message);
            reply(`❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${error.message}`);
        }
    });
}
