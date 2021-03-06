import CONST from './const.js'

const TWEAK = {
    timermargin: .07,
    apmargin: .06,
}

export default class {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = CONST.sight.radius * 2
        this.canvas.height = CONST.sight.radius * 2

        this.timeranglemin = (0.5 + TWEAK.timermargin) * Math.PI
        this.timeranglemax = (2.5 - TWEAK.timermargin) * Math.PI

        this.apanglemin = (0.5 + TWEAK.apmargin) * Math.PI
        this.apanglemax = (1 - TWEAK.apmargin) * Math.PI

        const halfr = this.canvas.width / 2

        this.ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
        this.ctx.strokeArc(CONST.sight.linew * 2, halfr, halfr,
            CONST.sight.radius - CONST.sight.linew * 3, 
            0, 2 * Math.PI)

        this.ctx.strokeArc(CONST.sight.linew, halfr, halfr, CONST.sight.radius - CONST.sight.linew * 6, 
            TWEAK.timermargin * 2, Math.PI * .5 - TWEAK.timermargin * 2)
        this.ctx.strokeArc(CONST.sight.linew * 2, halfr, halfr, CONST.sight.radius - CONST.sight.linew * 7, 
            Math.PI * .5 + TWEAK.timermargin * 2, Math.PI - TWEAK.timermargin * 2)
        this.ctx.strokeArc(CONST.sight.linew, halfr, halfr, CONST.sight.radius - CONST.sight.linew * 6, 
            Math.PI + TWEAK.timermargin * 2, Math.PI * 1.5 - TWEAK.timermargin * 2)
        this.ctx.strokeArc(CONST.sight.linew, halfr, halfr, CONST.sight.radius - CONST.sight.linew * 6, 
            Math.PI * 1.5 + TWEAK.timermargin * 2, Math.PI * 2 - TWEAK.timermargin * 2)
        
        this.ctx.strokeStyle = 'rgba(255, 0, 0, .7)'
        this.ctx.strokeArc4(CONST.sight.linew * 2, halfr, halfr, CONST.sight.radius - CONST.sight.linew * 9, 
            Math.PI * .25, Math.PI * .25 + .01)

        this.ctx.strokeStyle = 'rgba(255, 255, 255, .2)'
        this.ctx.strokeArc(CONST.sight.linew * 2, halfr, halfr, CONST.sight.radius - CONST.sight.linew * 12, 
            0, 2 * Math.PI)
    }
    init() {
        this.poe_start = 0.
        this.max_time = CONST.sight.timelimit
        this.clock = CONST.sight.timelimit
    }
    extrainit() {
        this.poe_start = 0.
        this.max_time = CONST.sight.extratimelimit
        this.clock = CONST.sight.extratimelimit
    }
    ready() {
        this.poe_start = (this.poe_start < 1) ? this.poe_start + CONST.sight.readystep : 1
        return this.poe_start === 1
    }
    tick() {
        this.clock = (this.clock > 0) ? this.clock - 1 : 0
        return this.clock === 0
    }
    end() {
        this.clock = 0
    }
    draw(ctx, ap) {
        ctx.save()

        ctx.drawImage(this.canvas, (CONST.originalx - this.canvas.width) / 2, (CONST.originaly - this.canvas.height) / 2)

        ctx.shadowBlur = 10
        ctx.strokeStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.strokeArc(CONST.sight.linew * .5, CONST.originalx / 2, CONST.originaly / 2, 
            CONST.sight.radius - CONST.sight.linew * 3, 
            this.timeranglemin, this.timeranglemin + ((this.timeranglemax - this.timeranglemin) * (this.clock / this.max_time) * this.poe_start))
        
        ctx.strokeStyle = 'rgb(255, 200, 200)'
        ctx.shadowColor = 'rgb(255, 0, 0)'
        ctx.strokeArc(CONST.sight.linew * .5, CONST.originalx / 2, CONST.originaly / 2, 
            CONST.sight.radius - CONST.sight.linew * 7, 
            this.apanglemin, this.apanglemin + ((this.apanglemax - this.apanglemin) * (ap.current / ap.full) * this.poe_start))

        ctx.shadowBlur = 50
        ctx.font = '40px Sarpanch'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgb(200, 255, 255)'
        ctx.shadowColor = 'rgb(0, 255, 255)'
        ctx.fillText('TIMER', CONST.originalx / 2, (this.canvas.height + CONST.originaly) / 2 - CONST.sight.textmargin_tl)
        
        ctx.fillStyle = 'rgb(255, 200, 200)'
        ctx.shadowColor = 'rgb(255, 0, 0)'
        ctx.fillText('AP', CONST.originalx / 2, (this.canvas.height + CONST.originaly) / 2 - CONST.sight.textmargin_ap)

        ctx.restore()
    }
}
