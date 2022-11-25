const Discord = require("discord-user-bots");
const client = new Discord.Client("your-token-here");

client.on.ready = function ()
{
	console.log("Bot online!");
};

//Pre-made functions
function reactWithError(channel_id,message_id)
{
	client.add_reaction
	(
		message_id, channel_id, "❌"
	);
}

function sendText(message,channel_id,tag=true)
{
	return client.send
	(
		channel_id,
		{
			content: message,
			embeds: [],
			allowed_mentions: {allowUsers: tag,allowRoles: tag, allowEveryone: tag,allowRepliedUser: tag,},
			components: [],
			stickers: []
		}
	);  
}

function editText(message,message_id,channel_id)
{
	return client.edit
	(
		message_id,
		channel_id,
		message
	);
}

function deleteMessage(message_id,channel_id)
{
	return client.delete_message
	(
    	message_id,
		channel_id
	);
}

function sendImage(message,channel_id,attachments,tag=true)
{
	return client.send
	(
		channel_id,
		{
			content: message,
			embeds: [],
			allowed_mentions: {allowUsers: tag,allowRoles: tag, allowEveryone: tag,allowRepliedUser: tag,},
			components: [],
			stickers: [],
			attachments: attachments
		}
	);  
}

module.exports = { client, reactWithError, sendText, editText, deleteMessage, sendImage };