function dot(data){
    "use strict"
    var self = this
    if(!data)
        data = {}
    this.x = data.x || window.innerWidth / 2
    this.y = data.y || window.innerHeight / 2
    this.color = data.color || "white"
    this.tail = [];
    this.size = data.size || 3
    
    this.forces = []
    this.tick = function(t){
        this.tail.push([this.x, this.y])
        for(var k in self.forces){
            var force = self.forces[k]
            if(force.duration < 0)
                self.forces.splice(self.forces.indexOf(force), 1)
            else{
                force.apply(self, t)
                force.duration-= Math.ceil(t);
            }
        }
        while(this.tail.length > 5)
            this.tail.shift()
    }
    
    this.draw = function(){
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
        
        if(drawTail || this == tracker){
            ctx.beginPath()
            this.tail.forEach(function(a){
                ctx.lineTo(a[0], a[1])
            })
            ctx.stroke()
            ctx.globalAlpha *= 0.2
            ctx.fill()
            ctx.globalAlpha *= 5
        }
        if(drawForces){ // draw vectors
            ctx.globalAlpha *= 0.25
            this.forces.forEach(function(f){
                if(f.duration > 0){
                    var o = {x: self.x, y: self.y}
                    f.apply(o, 15)
                    ctx.beginPath()
                    ctx.moveTo(self.x, self.y)
                    ctx.lineTo(o.x, o.y)
                    ctx.strokeStyle="white"
                    ctx.stroke()
                }
            })
            ctx.globalAlpha *= 4
        }
    }
    
}
function force(data){
    "use strict"
    if(!data)
        data = {}
    this.direction = data.direction || 0
    this.power = data.power || 0
    this.duration = Math.round(data.duration) || -1
    this.apply = function(object, t){
        if(this.duration > 0){
            var multiplayer
                multiplayer = Math.sin(Math.PI * this.duration / data.duration) * t
            var x = this.power * Math.cos(this.direction) * multiplayer
            var y = this.power * Math.sin(this.direction) * multiplayer
            object.x += x
            object.y += y
        }
    }
}

const dots = []
var time = (new Date()).getTime()

function eaten(dot){
    var ax = tracker.x
    var ay = tracker.y
    var bx = tracker.tail[tracker.tail.length - 1][0]
    var by = tracker.tail[tracker.tail.length - 1][1]
    var cx = dot.x
    var cy = dot.y
    var A = ay - by
    var B = bx - ax
    var C = ax * by - ay * bx
    var d = Math.abs((A * cx + B * cy + C) / Math.hypot(A, B))
    //ctx.fillStyle = "white"
    //ctx.fillText(Math.round(d), dot.x, dot.y)
    
    if(!isNaN(d)){
        if(cx < Math.min(ax, bx) - tracker.size -  dot.size)
            return false
        if(cy < Math.min(ay, by) - tracker.size - dot.size)
            return false
        if(cx > Math.max(ax, bx) + tracker.size + dot.size)
            return false
        if(cy > Math.max(ay, by) + tracker.size + dot.size)
            return false
        
    }
    
    return (d || Math.hypot(ax - cx, ay - cy)) < tracker.size + dot.size
}

var localScore = 0

function animation(){
    requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var now = (new Date()).getTime()
    var t = (now - time) * 6 / 100
    dots.forEach(function(dot){
        dot.tick(t)
        var flag = false
        if(dot.x < -10){
            dot.x = window.innerWidth + 10
            flag = true
            }
        if(dot.x > window.innerWidth + 10){
            dot.x = -10
            flag = true
            }
        if(dot.y < -10){
            dot.y = window.innerHeigth + 10
            flag = true
            }
        if(dot.y > window.innerHeight + 10){
            dot.y = -10
            flag = true
            }
            if(flag)
            dot.tail.length = 0
                
        dot.draw()
    })
    if(tracker){
        tracker.tick(t)
        tracker.draw()
        for(var k in dots){
            var dot = dots[k]
            if(eaten(dot)){
                dots.splice(k, 1)
                tracker.size += 0.2
            }
        }
        while(tracker.size > 11){
            localScore++
           spawnHorde(tracker.x, tracker.y, 30)
           tracker.size  -= 4.5
        }
        
        ctx.fillStyle = "black"
        ctx.textAlign = "center"
        ctx.font = "16px Comic Sans MS"
        ctx.fillText(localScore, tracker.x, tracker.y + 6)
    }
    time = now
    
    
}

requestAnimationFrame(animation)
