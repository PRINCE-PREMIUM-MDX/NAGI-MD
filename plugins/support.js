const { cmd } = require('../arslan');

const GROUP_LINKS = [
    "https://chat.whatsapp.com/JhNqvWWAWe7EBHKbIUw9eX?s=cl&p=a&ilr=0",
    
   
];

cmd({
    pattern: "support",
    alias: ["help", "aide", "groups", "groupes"],
    react: "🆘",
    desc: "Afficher les groupes d'aide et de support",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const text =
`╭┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
│ *🆘 𝐁𝐄𝐒𝐎𝐈𝐍 𝐃'𝐀𝐈𝐃𝐄 ?*

│Rejoins nos groupes de support pour poser tes questions et obtenir de l'aide :
│
│1️⃣ ${GROUP_LINKS[0]}
│2️⃣ ${GROUP_LINKS[1]}
│3️⃣ ${GROUP_LINKS[2]}
╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
> © 𝐌ade 𝐈n 𝐁y 𝐏rince 𝐏remium`;

        await reply(text);
    } catch (e) {
        reply("❌ Une erreur est survenue.");
    }
});
