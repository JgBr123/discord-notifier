const { readDB, readAllDB } = require("./IO.js");

//Util functions
function extractID(string)
{
	return string.replace("<","").replace(">","").replace("@","");
}

function getChannelID(id)
{
	return readDB(`${id}.data`);
}

function getAllChannelsID()
{
	return readAllDB();
}

function tag(id)
{
	return `<@${id}>`;
}

module.exports = { extractID, getChannelID, getAllChannelsID, tag };