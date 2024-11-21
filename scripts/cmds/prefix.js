const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: "Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)",
		category: "config",
		guide: {
			vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
				+ "\n   Ví dụ:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
				+ "\n   Ví dụ:"
				+ "\n    {pn} # -g"
				+ "\n\n   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
			en: "   {pn} <new prefix>: change new prefix in your box chat"
				+ "\n   Example:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"
				+ "\n   Example:"
				+ "\n    {pn} # -g"
				+ "\n\n   {pn} reset: change prefix in your box chat to default"
		}
	},

	langs: {
		vi: {
			reset: "Đã reset prefix của bạn về mặc định: %1",
			onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
			confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
			confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
			successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
			successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
			myPrefix: "🌐 Prefix của hệ thống: %1\n🛸 Prefix của nhóm bạn: %2"
		},
		en: {
			reset: "𝑷𝒓𝒆𝒇𝒊𝒙 𝑪𝒉𝒂𝒏𝒈𝒆́ 𝒑𝒂𝒓 𝑫𝒆́𝒇𝒂𝒖𝒕: %1",
			onlyAdmin: " 𝑯𝒆𝒚..!𝑺𝒆𝒖𝒍𝒔 𝒍𝒆𝒔 𝑨𝒅𝒎𝒊𝒏𝒔 𝒅𝒖 𝒃𝒐𝒕 𝒑𝒆𝒖𝒗𝒆𝒏𝒕 𝑪𝒉𝒂𝒏𝒈𝒆𝒓 𝒍𝒆 𝑷𝒓𝒆𝒇𝒊𝒙. \n 𝑻'𝒆𝒏 𝒆𝒔 𝑷𝒂𝒔 𝑼𝒏 😾",
			confirmGlobal: "𝑳𝒆 𝑷𝒓𝒆𝒇𝒊𝒙 𝒔𝒆𝒓𝒂 𝑪𝒉𝒂𝒏𝒈𝒆́ 𝒅𝒂𝒏𝒔 𝒍𝒆 𝑺𝒚𝒔𝒕𝒆̀𝒎𝒆 𝒅𝒖 𝒃𝒐𝒕 𝒆𝒏  【%1】. 𝑹𝒆́𝒂𝒈𝒊𝒔 𝒂̀ 𝒄𝒆 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝒑𝒐𝒖𝒓 𝑪𝒐𝒏𝒇𝒊𝒓𝒎𝒆𝒓.",
			confirmThisThread: "𝑳𝒆 𝑷𝒓𝒆𝒇𝒊𝒙 𝒔𝒆𝒓𝒂 𝑪𝒉𝒂𝒏𝒈𝒆́ 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 𝒅𝒂𝒏𝒔 𝒄𝒆 𝑮𝒓𝒐𝒖𝒑𝒆 𝒆𝒏  【%1】.𝑹𝒆́𝒂𝒈𝒊𝒔 𝒂̀ 𝒄𝒆 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝒑𝒐𝒖𝒓 𝑪𝒐𝒏𝒇𝒊𝒓𝒎𝒆𝒓.",
			successGlobal: "𝑳𝒆 𝑷𝒓𝒆𝒇𝒊𝒙 𝒅𝒖 𝑮𝒓𝒐𝒖𝒑𝒆 𝒅𝒂𝒏𝒔 𝒍𝒆 𝑺𝒚𝒔𝒕𝒆̀𝒎𝒆 𝒆𝒔𝒕 𝒅𝒆́𝒔𝒐𝒓𝒎𝒂𝒊𝒔:   【%1】.",
			successThisThread: "✔️ | 𝑳𝒆.𝑷𝒓𝒆𝒇𝒊𝒙 𝒅𝒖 𝒃𝒐𝒕 𝒅𝒂𝒏𝒔 𝒗𝒐𝒕𝒓𝒆 𝑮𝒓𝒐𝒖𝒑𝒆 𝒂 𝒆́𝒕𝒆́ 𝑪𝒉𝒂𝒏𝒈𝒆́ 𝒆𝒏:  【%2】.",
			myPrefix: "\n╭─────────────────\n │🌸┃𝐄𝐧 𝐆𝐞́𝐧𝐞́𝐫𝐚𝐥 :       ➪ 【%1】\n │🌸┃𝐃𝐚𝐧𝐬 𝐜𝐞 𝐆𝐫𝐨𝐮𝐩𝐞:➪ 【%2】 \n╰─────────────────\n"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.SyntaxError();

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "-g")
			if (role < 2)
				return message.reply(getLang("onlyAdmin"));
			else
				formSet.setGlobal = true;
		else
			formSet.setGlobal = false;

		return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author)
			return;
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "prefix")
			return () => {
				return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
			};
	}
};
