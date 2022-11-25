const { client, reactWithError, sendText } = require("./Discord.js");
const { writeDB, deleteDB } = require("./IO.js");
const { getChannelID, getAllChannelsID } = require("./Util.js");

const botId = "1045531066049503344";
const jungleChannelID = "416344480820494356";

client.on.message_create = async (message) =>
{
	if (message.author.id == botId)
	{
		//Do nothing if bot send the message
		return;
	}

	//Check if message has content
	if (message.content.length > 0)
	{
		if (message.guild_id == null)
		{
			if (message.content == "!register")
			{
				if (getChannelID(message.author.id) == null)
				{
					writeDB(`${message.author.id}.data`,message.channel_id);
					sendText("Registered successfully!",message.channel_id);
				}
				else { reactWithError(message.channel_id,message.id); }
			}
			else if (message.content == "!unregister")
			{
				if (getChannelID(message.author.id) != null)
				{
					deleteDB(`${message.author.id}.data`);
					sendText("Unregistered successfully. You will no longer receive notifications.",message.channel_id);
				}
				else { reactWithError(message.channel_id,message.id); }
			}
			else
			{
				if (getChannelID(message.author.id) == null)
				{
					sendText("You are not registered yet. Type !register to start receiving notifications from giveaways.",message.channel_id);
				}
			}
		}
	}

	if (message.channel_id == jungleChannelID) //Checks if chat is jungle chat
	{
		//Embed
		if (message.embeds.length > 0)
		{
			if (message.embeds[0].author != null)
			{
				if (message.embeds[0].author.name.startsWith("New Giveaway!"))
				{
					const gaMessage = message.embeds[0].description.split("\n");
					const notificationMessage = gaMessage[0]+"\n"+gaMessage[2]+"\n"+gaMessage[6];

					//Message every registered user
					let messagesSent = 0;
					for (var channel_id of getAllChannelsID())
					{
						sendText(notificationMessage,channel_id);
						messagesSent++;

						if (messagesSent%8 == 0)
						{
							await new Promise(resolve => setTimeout(resolve, 5000));
						}
					}
				}
			}
		}
	}
};