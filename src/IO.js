const fs = require("fs");
const rootPath = "C:\\Programação\\Databases\\GiveawayNotifier\\";

function writeDB (path,content)
{
    fs.writeFileSync(rootPath+path, content);
}

function readDB (path)
{
    if (fs.existsSync(rootPath+path))
    {
        return fs.readFileSync(rootPath+path,'utf8');
    }
    else
    {
        return null;
    }
}

function deleteDB (path)
{
    if (fs.existsSync(rootPath+path))
    {
        fs.unlinkSync(rootPath+path);
        return true;
    }
    else
    {
        return false;
    }
}

function readAllDB ()
{
    let returnData = [];

    for (const path of fs.readdirSync(rootPath))
    {
        if (fs.existsSync(rootPath+path))
        {
            returnData.push(fs.readFileSync(rootPath+path,'utf8'));
        }
    }

    if (returnData.length > 0)
    {
        return returnData;
    }
    else
    {
        return null;
    }
}

module.exports = { writeDB, readDB, deleteDB, readAllDB };