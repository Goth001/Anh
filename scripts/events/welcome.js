const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.7",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "",
			session2: "",
			session3: "",
			session4: "",
			welcomeMessage: "𝐌𝐞𝐫𝐜𝐢 𝐝𝐞 𝐦'𝐚𝐯𝐨𝐢𝐫 𝐚𝐣𝐨𝐮𝐭é 𝐢𝐜𝐢. 𝐉𝐞 𝐬𝐮𝐢𝐬 𝐮𝐧 𝐁𝐨𝐭.🙂 \n𝐓𝐚𝐩𝐞𝐳 ( %1help ) 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐥𝐞 𝐦𝐞𝐧𝐮 𝐝𝐞 𝐦𝐞𝐬 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬. 𝐉'𝐄𝐬𝐩è𝐫𝐞 𝐪𝐮𝐞 𝐯𝐨𝐮𝐬 𝐦'𝐔𝐭𝐢𝐥𝐢𝐬𝐞𝐫𝐞𝐳 𝐁𝐢𝐞𝐧.⚜",
			multiple1: "you",
			multiple2: "you guys",
			defaultWelcomeMessage: " {userName} ,\n 𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐮(𝐞)(𝐬)(𝐞𝐬) 𝐜𝐡𝐞𝐳 𝐧𝐨𝐮𝐬 à:\n {boxName}\n 𝐏𝐚𝐬𝐬𝐨𝐧𝐬 𝐝𝐞 𝐁𝐨𝐧𝐬 𝐌𝐨𝐦𝐞𝐧𝐭𝐬 𝐞𝐧𝐬𝐞𝐦𝐛𝐥𝐞𝐬.⚜"
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
