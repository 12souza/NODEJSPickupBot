const { SSL_OP_EPHEMERAL_RSA } = require('constants');
var Discord = require('discord.js')

var discordtoken = "NzMyMzcyMTcwMzY5NTMxOTc4.XwzovA.FUE8v-X_OzMgBAOSPQHLRBLzGxM";
var players = [];
var blueTeam = [];
var redTeam = [];
var playerOne = ""
var playerTwo = ""
var p1p = ""
var p2p = ""
var pick = 0
var bCaptain = ""
var rCaptain = ""

var bot = new Discord.Client({
	autorun : true,
	token : discordtoken
});

bot.login(discordtoken);

bot.on('ready', function(event) {
	console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }



bot.on('message', message => {
	if (message.content == '!pickup') {
        if(message.member.nickname == null){
            players.push(message.author.username.toLowerCase()) 
        }
        else{
            players.push(message.member.nickname.toLowerCase())
        }
        msgList = ["The Pickup Has Started! Please type !add to join in!\n\n", ]
        
        for (let step = 0; step < players.length; step++) {
            msgList.push(players[step] + "\n")
        }
        message.channel.send("```" + msgList.join('') + "```")
    }
    if (message.content == '!add' || message.content == '++'){
        if(players.length < 8){    
            msgList = []
            if(message.member.nickname == null){
                players.push(message.author.username.toLowerCase()) 
            }
            else{
                players.push(message.member.nickname.toLowerCase())
            }
            for (let step = 0; step < players.length; step++) {
                msgList.push(players[step] + "\n")
            }
            message.channel.send("```" + msgList.join('') + "```")
        }
        else{
            message.channel.send("```Sorry, the pickup is full :(```")
        }
    }
    if (message.content == '!remove' || message.content == '--'){ 
        var author = ""
        msgList = []
        if(message.member.nickname == null){
            author = message.author.username.toLowerCase() 
        }
        else{
            author = message.member.nickname.toLowerCase()
        }
        const index = players.indexOf(author)
        players.splice(index, 1);
        for (let step = 0; step < players.length; step++) {
            msgList.push(players[step] + "\n")
        }
        message.channel.send("```" + msgList.join('') + "```")
    }
    if (message.content.startsWith('!captains')){
        if(players.length == 0){    
            msgSplit = message.content.split(" ")
            playerOne = msgSplit[1].toLowerCase()
            playerTwo = msgSplit[2].toLowerCase()
            console.log(playerTwo)
            console.log(playerOne)
            const index = players.indexOf(playerOne)
            const index2 = players.indexOf(playerTwo)
            players.splice(index, 1);
            players.splice(index2, 1);
        }
        else{
            message.channel.send("```Pick Captains when 8 players have joined..```")
        } 
    }
    if (message.content.startsWith('!rps')){
        if(playerOne != "" && playerTwo != ""){  
            message.channel.send("3")
            sleep(1000).then(() => {
                message.channel.send("2")
            });
            sleep(2000).then(() => {
                message.channel.send("1")
            });
            sleep(3000).then(() => {
                message.channel.send("throw em!")
            });
            sleep(4000).then(() => {
                message.channel.send("Done!")
                
                if(p1p == "rock" && p2p == "scisscors"){message.channel.send(playerOne + " will pick first!"); playerOne = bCaptain; blueTeam.push(playerOne); playerTwo = rCaptain; redTeam.push(playerTwo)}
                else if(p1p == "rock" && p2p == "paper"){message.channel.send(playerTwo + " will pick first!"); playerTwo = bCaptain; blueTeam.push(playerTwo); playerOne = rCaptain; blueTeam.push(playerOne)}
                else if(p1p == "rock" && p2p == "rock"){message.channel.send("Tie! use !rps again")}
                else if(p1p == "paper" && p2p == "paper"){message.channel.send("Tie! use !rps again")}
                else if(p1p == "scissors" && p2p == "scissors"){message.channel.send("Tie! use !rps again")}
                else if(p2p == "rock" && p1p == "scisscors"){message.channel.send(playerTwo + " will pick first!"); playerTwo = bCaptain; blueTeam.push(playerTwo); playerOne = rCaptain; blueTeam.push(playerOne)}
                else if(p2p == "rock" && p1p == "paper"){message.channel.send(playerOne + " will pick first!"); playerOne = bCaptain; blueTeam.push(playerOne); playerTwo = rCaptain; redTeam.push(playerTwo)}
                else if(p2p == "paper" && p1p == "scisscors"){message.channel.send(playerOne + " will pick first!"); playerOne = bCaptain; blueTeam.push(playerOne); playerTwo = rCaptain; redTeam.push(playerTwo)}
                else if(p2p == "scissors" && p1p == "paper"){message.channel.send(playerTwo + " will pick first!"); playerTwo = bCaptain; blueTeam.push(playerTwo); playerOne = rCaptain; blueTeam.push(playerOne)}
                else if(p1p == ""){message.channel.send(playerTwo + " will pick first!"); playerTwo = bCaptain; blueTeam.push(playerTwo); playerOne = rCaptain; blueTeam.push(playerOne)}
                else if(p2p == ""){message.channel.send(playerOne + " will pick first!"); playerOne = bCaptain; blueTeam.push(playerOne); playerTwo = rCaptain; redTeam.push(playerTwo)}
                else{message.channel.send("Nobody threw.. use !rps again")}});
                pick++
            }
        else{
            message.channel.send("Captains havent been chosen yet..")
        }
    }
    if(message.content == 'r'){
        var captainPick
        if(message.member.nickname == null){
            captainPick = message.author.username 
        }
        else{
            captainPick = message.author.nickname
        }
        if (captainPick = playerOne){
            p1p = "rock"
        }
        else if(captainPick = playerTwo){
            p2p = "rock"
        }
        else{
            message.channel.send("You are not a captain.")
        }
    }
    if(message.content == 'p'){
        var captainPick
        if(message.member.nickname == null){
            captainPick = message.author.username 
        }
        else{
            captainPick = message.author.nickname
        }
        if (captainPick = playerOne){
            p1p = "paper"
        }
        else if(captainPick = playerTwo){
            p2p = "paper"
        }
        else{
            message.channel.send("You are not a captain.")
        }
    }
    if(message.content == 's'){
        var captainPick
        if(message.member.nickname == null){
            captainPick = message.author.username 
        }
        else{
            captainPick = message.author.nickname
        }
        if (captainPick = playerOne){
            p1p = "scissors"
        }
        else if(captainPick = playerTwo){
            p2p = "scissors"
        }
        else{
            message.channel.send("You are not a captain.")
        }
    }
    if (message.content.startsWith('!pick')){
        var captainPick
        msgSplit = message.content.split(" ")
        playerPick = msgSplit[1].toLowerCase()
        const index = players.indexOf(playerPick)
        if(message.member.nickname == null){
            captainPick = message.author.username 
        }
        else{
            captainPick = message.author.nickname
        }
        if(pick == 1){
            if(captainPick == bCaptain){
                if(players.includes(playerPick)){
                    blueTeam.push(playerPick)
                    players.splice(index, 1);
                    pick++

                    for (let step = 0; step < players.length; step++) {
                        msgList.push(players[step] + "\n")
                    }
                    message.channel.send("```" + msgList.join('') + "```")
                    for (let step = 0; step < blueTeam.length; step++) {
                        msgList.push(blueTeam[step] + "\n")
                    }
                    message.channel.send("```Blue Team\n\n" + msgList.join('') + "```")
                    for (let step = 0; step < redTeam.length; step++) {
                        msgList.push(redTeam[step] + "\n")
                    }
                    message.channel.send("```Red Team \n\n" + msgList.join('') + "```")
                }
                else{
                    message.channel.send("Not a Player in the Pickup..")
                }
            }
            else{
                message.channel.send(captainPick + " it is not your pick..")
            }
        }
        if(pick == 2){
            if(captainPick == rCaptain){
                if(players.includes(playerPick)){
                    redTeam.push(playerPick)
                    players.splice(index, 1);
                    pick++

                    for (let step = 0; step < players.length; step++) {
                        msgList.push(players[step] + "\n")
                    }
                    message.channel.send("```" + msgList.join('') + "```")
                    for (let step = 0; step < blueTeam.length; step++) {
                        msgList.push(blueTeam[step] + "\n")
                    }
                    message.channel.send("```Blue Team\n\n" + msgList.join('') + "```")
                    for (let step = 0; step < redTeam.length; step++) {
                        msgList.push(redTeam[step] + "\n")
                    }
                    message.channel.send("```Red Team \n\n" + msgList.join('') + "```")
                }
                else{
                    message.channel.send("Not a Player in the Pickup..")
                }
            }
            else{
                message.channel.send(captainPick + " it is not your pick..")
            }
        }
        if(pick == 3){
            if(captainPick == bCaptain){
                if(players.includes(playerPick)){
                    blueTeam.push(playerPick)
                    players.splice(index, 1);
                    pick++

                    for (let step = 0; step < players.length; step++) {
                        msgList.push(players[step] + "\n")
                    }
                    message.channel.send("```" + msgList.join('') + "```")
                    for (let step = 0; step < blueTeam.length; step++) {
                        msgList.push(blueTeam[step] + "\n")
                    }
                    message.channel.send("```Blue Team\n\n" + msgList.join('') + "```")
                    for (let step = 0; step < redTeam.length; step++) {
                        msgList.push(redTeam[step] + "\n")
                    }
                    message.channel.send("```Red Team \n\n" + msgList.join('') + "```")
                }
                else{
                    message.channel.send("Not a Player in the Pickup..")
                }
            }
            else{
                message.channel.send(captainPick + " it is not your pick..")
            }
        }
        if(pick == 4){
            if(captainPick == rCaptain){
                if(players.includes(playerPick)){
                    redTeam.push(playerPick)
                    players.splice(index, 1);
                    pick++

                    for (let step = 0; step < players.length; step++) {
                        msgList.push(players[step] + "\n")
                    }
                    message.channel.send("```" + msgList.join('') + "```")
                    for (let step = 0; step < blueTeam.length; step++) {
                        msgList.push(blueTeam[step] + "\n")
                    }
                    message.channel.send("```Blue Team\n\n" + msgList.join('') + "```")
                    for (let step = 0; step < redTeam.length; step++) {
                        msgList.push(redTeam[step] + "\n")
                    }
                    message.channel.send("```Red Team \n\n" + msgList.join('') + "```")
                }
                else{
                    message.channel.send("Not a Player in the Pickup..")
                }
            }
            else{
                message.channel.send(captainPick + " it is not your pick..")
            }
        }
        if(pick == 5){
            if(captainPick == rCaptain){
                if(players.includes(playerPick)){
                    redTeam.push(playerPick)
                    players.splice(index, 1);
                    pick++

                    for (let step = 0; step < players.length; step++) {
                        msgList.push(players[step] + "\n")
                    }
                    message.channel.send("```" + msgList.join('') + "```")
                    for (let step = 0; step < blueTeam.length; step++) {
                        msgList.push(blueTeam[step] + "\n")
                    }
                    message.channel.send("```Blue Team\n\n" + msgList.join('') + "```")
                    for (let step = 0; step < redTeam.length; step++) {
                        msgList.push(redTeam[step] + "\n")
                    }
                    message.channel.send("```Red Team \n\n" + msgList.join('') + "```")
                }
                else{
                    message.channel.send("Not a Player in the Pickup..")
                }
            }
            else{
                message.channel.send(captainPick + " it is not your pick..")
            }
        }
        if(pick == 6){
            blueTeam.push(players[0])
            pick = 0

            for (let step = 0; step < blueTeam.length; step++) {
                msgList.push(blueTeam[step] + "\n")
            }
            message.channel.send("```Blue Team\n\n" + msgList.join('') + "```")
            for (let step = 0; step < redTeam.length; step++) {
                msgList.push(redTeam[step] + "\n")
            }
            message.channel.send("```Red Team \n\n" + msgList.join('') + "```")
        }
    }

});
