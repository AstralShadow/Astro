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
    document.body.classList.add("Compact");
}
function deactivateCompactMode(){
    document.body.classList.remove("Compact");
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
    }else{
        deactivateCompactMode();
    }
})