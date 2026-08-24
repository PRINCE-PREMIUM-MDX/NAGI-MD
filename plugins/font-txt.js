const { cmd } = require('../arslan');
const fancy = require('../lib/style-fancy');

cmd({
    pattern: "fancy",
    desc: "Appliquer un style de texte stylé",
    category: "fun",
    react: "💫",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        const id = args[0]?.match(/\d+/)?.join('');
        const text = args.slice(1).join(" ");

        if (!args.length) {
            return reply(
                `╭─「 *\`𝐒𝐓𝐘𝐋𝐄 𝐃𝐄 𝐓𝐄𝐗𝐓𝐄\`* 」\n│𝐄𝐱𝐞𝐦𝐩𝐥𝐞: .fancy 10 𝐍agi-𝐌d\n│` +
                fancy.list('Nagi-md', fancy)
            );
        }

        if (!id || !text) {
            return reply(`𝐄𝐱𝐞𝐦𝐩𝐥𝐞: .fancy 10 𝐍agi-𝐌d\n` + fancy.list('Nagi-md', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return reply(fancy.apply(selectedStyle, text));
        } else {
            return reply('_𝐒𝐭𝐲𝐥𝐞 𝐢𝐧𝐭𝐫𝐨𝐮𝐯𝐚𝐛𝐥𝐞 :(_');
        }
    } catch (error) {
        console.error(error);
        return reply('_𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐞𝐬𝐭 𝐬𝐮𝐫𝐯𝐞𝐧𝐮𝐞 :(_');
    }
});
