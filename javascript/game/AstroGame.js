/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * The core class of the game in the browser.
 * @constructor
 */
function AstroGame(settings){
    "use strict"
    var container = settings.container
    this.container = container
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    
    while(container.firstChild)
        container.removeChild(container.firstChild)
    container.appendChild(this.canvas)
    this.fitCanvasToContainer();
    
    this.engine = new AstroEngine()
    this.graphics = new AstroGraphics(this.ctx)
}

AstroGame.prototype.engine = undefined
AstroGame.prototype.graphics = undefined
AstroGame.prototype.container = undefined
AstroGame.prototype.canvas = undefined
AstroGame.prototype.ctx = undefined
AstroGame.prototype.playing = false
AstroGame.prototype.paused = false
AstroGame.prototype.speed = 1

AstroGame.prototype.start = function(){
    "use strict"
    var self = this
    
    if(!this.playing){
        if(window.requestAnimationFrame !== undefined){
            window.requestAnimationFrame(function(){
                self.loop()
            })
        }else{
            this._intervalId = setInterval(function(){
                self.loop()
            }, 15)
        }
    }
    this.playing = true
    this.paused = false
}

AstroGame.prototype.play = function(){
    "use strict"
    "use strict"
    return this.start()
}

AstroGame.prototype.pause = function(){
    "use strict"
    "use strict"
    this.paused = true
}

AstroGame.prototype.stop = function(){
    "use strict"
    this.playing = false
    if(window.requestAnimationFrame === undefined)
        clearInterval(this._intervalId);
}

AstroGame.prototype.loop = function(){
    "use strict"
    var self = this
    if(this.playing && window.requestAnimationFrame !== undefined){
        window.requestAnimationFrame(function(){
            self.loop()
        })
    }
    this.fitCanvasToContainer();
    
    this.engine.loop()
    this.graphics.clear()
    this.graphics.drawScene(this.engine.getScene())
    this.graphics.drawObjects(this.engine.getObjects())
    this.graphics.drawPlayers(this.engine.getPlayers())
    this.graphics.drawParticles(this.engine.getPaticles())
    
}

AstroGame.prototype.fitCanvasToContainer = function(){
    "use strict"
    if(this.canvas.width !== this.container.innerWidth
       || this.canvas.height !== this.container.innerHeight
    ){
        this.canvas.width = this.container.innerWidth
        this.canvas.height = this.container.innerWidth
    }
}
