module.exports = {
	config: {
			name: "#",
			version: "1.0",
			author: "𝐍𝐨𝐫𝐚'𝐬 𝐋𝐨𝐫𝐝",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "#") return message.reply("𝐘𝐨.. ✌ 𝐖𝐡𝐚𝐭'𝐬 𝐭𝐡𝐞 𝐩𝐥𝐚𝐧 ? \n \n 𝐎𝐰𝐧𝐞𝐫: 𝐍𝐨𝐫𝐚'𝐬 𝐋𝐨𝐫𝐝 ⚜ \n https://www.facebook.com/profile.php?id=61567641756782 ");
}
};
