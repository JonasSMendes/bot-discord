const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação dos comandos
const fs = require("node:fs");
const path = require("node:path")

const comandsPath = path.join(__dirname,"comandos")
const ComandsFile = fs.readdirSync(comandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of ComandsFile){
    const filePath = path.join(comandsPath, file)
    const comand = require(filePath)

    if("data" in comand && "execute" in comand){
        client.commands.set(comand.data.name, comand)
    }else{
        console.log(`esse comando em ${filePath} esta com "data" ou "execute" ausente`)
    }
}
// login do bot
client.once(Events.ClientReady, c => {
	console.log(`pronto Login realizado com o ${c.user.tag}`);
});

client.login(TOKEN);

//listener de interações com o bot

client.on(Events.InteractionCreate, async interection => {

    if(interection.isStringSelectMenu()){
        const selected = interection.values[0]

        if(selected == "javascript"){
            await interection.reply(`Documentação do ${selected} esta nesse link: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript `)
        }else if(selected == "python"){
            await interection.reply(`Documentação do ${selected} esta nesse link: https://docs.python.org/3/`)
        }else if(selected == "java"){
            await interection.reply(`Documentação do ${selected} esta nesse link: https://docs.oracle.com/en/java/javase/index.html `)
        }else if(selected == "c++"){
            await interection.reply(`Documentação do ${selected} esta nesse link:  https://en.cppreference.com/w/`)
        }
    }

    if(!interection.isChatInputCommand()) return
    const command = interection.client.commands.get(interection.commandName)
    if(!command){
        console.error("comando não encontrado")
        return
    }
    try{
        await command.execute(interection)
    }
    catch (error){
        console.error(error)
        await interection.reply("Houve um erro ao executar esse comando")
    }
})