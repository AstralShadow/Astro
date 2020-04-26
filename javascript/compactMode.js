/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function isScreenOverflown(){
    var html = document.body.parentElement;
    return html.scrollHeight > html.clientHeight
           || html.scrollWidth > html.clientWidth;
}
function activateCompactMode(){
    var blocks = document.getElementsByClassName("Block")
    Object.keys(blocks).forEach(function(key){
        var block = blocks[key];
        block.classList.add("Compact");
    })
}
function deactivateCompactMode(){
    var blocks = document.getElementsByClassName("Block")
    Object.keys(blocks).forEach(function(key){
        var block = blocks[key];
        block.classList.remove("Compact");
    })
}

window.addEventListener("resize", function(){
    deactivateCompactMode();
    if(isScreenOverflown()){
        activateCompactMode();
    }
})
window.addEventListener("load", function(){
    if(isScreenOverflown()){
        activateCompactMode()
    }
})