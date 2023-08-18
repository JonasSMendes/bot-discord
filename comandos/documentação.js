const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js')



const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma linguagem selecionada")
            .addOptions(
                {
                    label: "javascript",
                    description: "veja a documantação do javascript",
                    value: "JavaScript"
                },
                {
                    label: "python",
                    description: "veja a documantação do python",
                    value: "python"
                },
                {
                    label: "java",
                    description: "veja a documantação do java",
                    value: "java"
                },
                {
                    label: "C++",
                    description: "veja a documantação do C+",
                    value: "C++"
                },
            )
    )


module.exports = {

    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("acesse a Documentação da tecnologia"),

    async execute(interaction){
        await interaction.reply({content: "Selecione uma das tecnologias a baixo", components: [row] });
    }

}