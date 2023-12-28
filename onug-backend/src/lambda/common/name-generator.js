const names = ['Justin Case', 'Dick Sack', 'Flapberry Fudgewhistle', 'Stinkroid Noodleshine', 'Bur-a-boo Noodleborn', 'Sniffwax Pukeseed', 'Doodle Loodle', 'Stinkbuns Spottygold', 'Werewolfy', 'Witchenious Craftenber', 'Horacle the Oracle', 'Kribidy Dibidy Doo']
const randomPlayerName = (players = []) => {
    const namesAlreadyExistsInGameState = players.map(player => player.name)
    const diffNames = names.filter(name => !namesAlreadyExistsInGameState.includes(name))
    return diffNames[~~(Math.random() * diffNames.length)]
}

module.exports = {
    randomPlayerName
}