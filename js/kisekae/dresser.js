import { DRESS } from './stat.js'
import CONST from './const.js'

const stat = {
    active: 0,
    clicked: 1,
    disabled: 2,
}

export default class {
    constructor(dress) {
        this.canvas_top = document.createElement('canvas')
        this.ctx_top = this.canvas_top.getContext('2d')
        this.canvas_top.width = CONST.dresser.width_t
        this.canvas_top.height = CONST.dresser.height_t

        this.canvas_base = document.createElement('canvas')
        this.ctx_base = this.canvas_base.getContext('2d')
        this.canvas_base.width = CONST.dresser.width_b
        this.canvas_base.height = CONST.dresser.height_b

        draw_top(this.ctx_top, this.canvas_top.width, this.canvas_top.height, CONST.dresser[dress].color)
        draw_base(this.ctx_base, this.canvas_base.width, this.canvas_base.height, this.canvas_top, this.canvas_top.width, this.canvas_top.height, CONST.dresser[dress].text)

        //---------

        this.dress = DRESS[dress]
        this.x = CONST.dresser[dress].x
        this.y = CONST.dresser[dress].y
        this.poe = 0.0
        this.stat = stat.active
    }
    clicked(x, y) {
        if ((this.x <= x && x <= this.x + this.canvas_base.width) && (this.y <= y && y <= this.y + this.canvas_base.height) && this.stat == stat.active) {
            this.stat = stat.clicked
            return true
        } else {
            return false
        }
    }
    ready() {
        if (this.stat == stat.clicked) { 
            this.poe = 0.0
            this.stat = stat.disabled
            draw_top(this.ctx_top, this.canvas_top.width, this.canvas_top.height, 'rgb(64, 64, 64)')
            draw_base(this.ctx_base, this.canvas_base.width, this.canvas_base.height, this.canvas_top, this.canvas_top.width, this.canvas_top.height, '****')
        }
        if (this.poe < 1) {
            this.poe += CONST.dresser.step
            return false
        } else {
            this.poe = 1
            return true
        }
    }
    unready() {
        if (this.stat == stat.clicked) {
            // do nothing
        } else if (this.poe > 0) {
            this.poe -= CONST.dresser.step
            return false
        } else {
            this.poe = 0.0
            return true
        }
    }
    draw(ctx) {

        ctx.drawImage(this.canvas_base, 0, 0, this.canvas_base.width, this.canvas_base.height,
            this.x, this.y + (1 - this.poe) * this.canvas_base.height / 2,
            this.canvas_base.width, this.canvas_base.height * this.poe)
    }
}

function draw_top(ctx, width, height, color) {
    ctx.clearRect(0, 0, width, height)
    
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.beginPath()
    ctx.ellipse(width / 2, 0, width / 2, height / 2, 0, 0, 2 * Math.PI)
    ctx.fill()

    let grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, color)
    grad.addColorStop(1, 'rgba(255, 255, 255, .7)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
    
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRoundRect(0, 0, width, height, 10)
}

function draw_base(ctx, width, height, icanvas, iwidth, iheight, text) {
    ctx.clearRect(0, 0, width, height)
    ctx.save()

    ctx.fillStyle = 'rgba(0, 0, 0, .5)'
    ctx.fillRoundRect(0, 0, width, height, 10)
    
    ctx.drawImage(icanvas, (width - iwidth) / 2, (height - iheight) / 2)
    
    const fsize = 40
    ctx.font = fsize + 'px Meiryo'
    let grad = ctx.createLinearGradient(0, 0, 0, 100)
    grad.addColorStop(.5, 'rgb(128, 128, 128)')
    grad.addColorStop(1, 'rgb(0, 0, 0)')
    ctx.fillStyle = grad
    ctx.shadowColor = 'rgb(255, 255, 255)'
    ctx.shadowBlur = 2
    ctx.textAlign = 'center'
    ctx.fillText(text, width / 2, height / 2 + fsize * .4)
}
