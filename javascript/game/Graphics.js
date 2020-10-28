/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * The core class of the game in the browser.
 * @constructor
 */
function AstroGraphics(ctx){
    "use strict"
    this.ctx = ctx
    
}

AstroGraphics.prototype.ctx = undefined

AstroGraphics.prototype.clear = function(){
    "use strict"
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
}

AstroGraphics.prototype.drawSprite = function(object){
    
}

AstroGraphics.prototype.drawScene = function(object){

}

AstroGraphics.prototype.drawObjects = function(object){

}

AstroGraphics.prototype.drawPlayers = function(object){

}

AstroGraphics.prototype.drawParticles = function(object){

}
