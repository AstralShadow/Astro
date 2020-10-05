<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
include "include/initializeSession.php";
?>

<!DOCTYPE HTML>
<html>
    <head>
        <title> Astro </title>
        <meta charset="UTF-8">
        <link href="stylesheets/main.css" rel="stylesheet" type="text/css">
        <link href="stylesheets/homePage.css" rel="stylesheet" type="text/css">
        <script src="javascript/compactMode.js"></script>
        <script src="javascript/backgroundAnimation.js"></script>
        <script src="javascript/game/AstroGame.js"></script>
        <script src="javascript/game/AstroEngine.js"></script>
        <script src="javascript/game/AstroGraphics.js"></script>
    </head>
    <body>
        <div id="mainContainer">
            <div id="centerBlock" class="Block">
                <div id="playButton" onclick="startGame()">Play</div>
            </div>
        </div>
        <div id="gameContainer">
            
        </div>
        <script>
            var Game = undefined
            function startGame(){
                if(Game === undefined){
                    Game = new AstroGame({
                        container: document.getElementById("gameContainer")
                    })
                }
                document.getElementById("mainContainer").style.display = "none"
                document.getElementById("gameContainer").style.display = "block"
                Game.start()
            }
			<?php
				if(isset($_GET["start"]))
					echo "startGame()";
			?>
        </script>
    </body>
</html>
