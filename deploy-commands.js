const {REST, Routes} = require ("discord.js")


//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação dos comandos
const fs = require("node:fs");
const path = require("node:path")
const comandsPath = path.join(__dirname,"comandos")
const ComandsFile = fs.readdirSync(comandsPath).filter(file => file.endsWith(".js"))


const commands = []

for(const file of ComandsFile){
    const command = require(`./comandos/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: "10"}).setToken(TOKEN);

//deploy

(async () => {
    try{
        console.log(`Resetando ${commands.length} comandos...`)

        //PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID),
            {body: commands}
        )

        console.log("comandos registrados com sucesso")

    }
    catch(error){
        console.error(error)
    }
})()
