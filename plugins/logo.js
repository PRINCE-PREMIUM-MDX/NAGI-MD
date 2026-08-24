const { cmd } = require('../arslan');
const axios = require('axios');

// Table des styles: nom de commande -> URL ephoto360
const logoStyles = {
    "3dcomic": "https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html",
    "dragonball": "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html",
    "deadpool": "https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html",
    "blackpink": "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html",
    "neonlight": "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html",
    "cat": "https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html",
    "sadgirl": "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html",
    "naruto": "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html",
    "thor": "https://en.ephoto360.com/create-thor-logo-style-text-effects-online-for-free-796.html",
    "america": "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html",
    "eraser": "https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html",
    "3dpaper": "https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html",
    "futuristic": "https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html",
    "clouds": "https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html",
    "sans": "https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html",
    "galaxy": "https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html",
    "leaf": "https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html",
    "sunset": "https://en.ephoto360.com/create-sunset-light-text-effects-online-807.html",
    "nigeria": "https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html",
    "devilwings": "https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html",
    "hacker": "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html",
    "boom": "https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html",
    "luxury": "https://en.ephoto360.com/floral-luxury-logo-collection-for-branding-616.html",
    "zodiac": "https://en.ephoto360.com/create-star-zodiac-wallpaper-mobile-604.html",
    "angelwings": "https://en.ephoto360.com/angel-wing-effect-329.html",
    "bulb": "https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html",
    "tatoo": "https://en.ephoto360.com/make-tattoos-online-by-empire-tech-309.html",
    "castle": "https://en.ephoto360.com/create-a-3d-castle-pop-out-mobile-photo-effect-786.html",
    "frozen": "https://en.ephoto360.com/create-a-frozen-christmas-text-effect-online-792.html",
    "paint": "https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html",
    "birthday": "https://en.ephoto360.com/beautiful-3d-foil-balloon-effects-for-holidays-and-birthday-803.html",
    "typography": "https://en.ephoto360.com/create-typography-status-online-with-impressive-leaves-357.html",
    "bear": "https://en.ephoto360.com/free-bear-logo-maker-online-673.html",
};

async function fetchLogo(styleUrl, name) {
    // API principale
    try {
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=${encodeURIComponent(styleUrl)}&name=${encodeURIComponent(name)}`;
        const res = await axios.get(apiUrl, { timeout: 15000 });
        if (res.data?.result?.download_url) return res.data.result.download_url;
    } catch (e) {}

    // API de secours (ephoto360 direct via api.davidcyriltech.my.id)
    try {
        const apiUrl2 = `https://api.davidcyriltech.my.id/ephoto360?url=${encodeURIComponent(styleUrl)}&text=${encodeURIComponent(name)}`;
        const res2 = await axios.get(apiUrl2, { timeout: 15000 });
        if (res2.data?.result?.image_url) return res2.data.result.image_url;
        if (res2.data?.url) return res2.data.url;
    } catch (e) {}

    return null;
}

for (const [style, styleUrl] of Object.entries(logoStyles)) {
    cmd({
        pattern: style,
        desc: `Créer un logo/texte stylé: ${style}`,
        category: "logo",
        react: "🎨",
        filename: __filename
    },
    async (conn, mek, m, { from, args, reply }) => {
        try {
            if (!args.length) {
                return reply(`❌ 𝐃𝐨𝐧𝐧𝐞𝐳 𝐮𝐧 𝐭𝐞𝐱𝐭𝐞. 𝐄𝐱𝐞𝐦𝐩𝐥𝐞: .${style} Empire`);
            }
            const name = args.join(" ");
            const imageUrl = await fetchLogo(styleUrl, name);

            if (!imageUrl) {
                return reply("❌ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐠é𝐧é𝐫𝐞𝐫 𝐥𝐞 𝐥𝐨𝐠𝐨. 𝐑é𝐞𝐬𝐬𝐚𝐲𝐞𝐳 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.");
            }

            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: "> 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐁𝐲 𝐏rince 𝐏remium"
            }, { quoted: mek });

        } catch (e) {
            reply(`❌ 𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞: ${e.message}`);
        }
    });
}
