/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * The core class of the game in the browser.
 * @param container
 */
class AstroGame{
    _container
    _canvas
    _gl
    _playing
    _paused
    _speed
    
    constructor({container}){
        this._container = container
        this._canvas = document.createElement("canvas")
        this._gl = this.canvas.getContext("experimental-webgl")
        this._playing = false
        this._paused = false
        this._speed = 1
        
        this.fitCanvasToContainer();
        while(container.firstChild){
            container.removeChild(container.firstChild)
        }
        container.append(this._canvas)
    }
    
    start = () => {
        if(!this._playing){
            if(window.requestAnimationFrame !== undefined){
                window.requestAnimationFrame(this.loop)
            }else{
                this._intervalId = setInterval(this.loop, 15)
            }
        }
        this._playing = true
        this._paused = false
    }
    pause = () => {
        this._paused = true
    }
    stop = () => {
        this._playing = false
        if(window.requestAnimationFrame === undefined)
            clearInterval(this._intervalId);
    }

    loop = () => {
        if(this._playing && window.requestAnimationFrame !== undefined){
            window.requestAnimationFrame(this.loop)
        }
        
        finCanvasToContainer();
        
    }
    finCanvasToContainer = () => {
        if(this._canvas.width !== this._container.clientWidth
           || this._canvas.height !== this._container.clientHeight
        ){
            this._canvas.width = this._container.clientWidth
            this._canvas.height = this._container.clientHeight
        }
    }
}
