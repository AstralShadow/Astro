/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function slideBackground(e){
    var amplitude = -50;
    var xOffset = amplitude * e.clientX / window.innerWidth;
    var yOffset = amplitude * e.clientY / window.innerHeight;
    
    var mainContainer = document.getElementById("mainContainer");
    mainContainer.style.backgroundPosition = xOffset + "px " + yOffset + "px";
}

window.addEventListener("mousemove", slideBackground)