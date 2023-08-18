const { SlashCommandBuilder} = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("jogostrilha"),

    async execute(interaction){
        await interaction.reply("https://open.spotify.com/playlist/7vluRd5PQDeuPhYjbNHdAU")
    }

}