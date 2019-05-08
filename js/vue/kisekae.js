import { STAT } from '../kisekae/stat.js.js'
import CONST from '../kisekae/const.js.js'
import Command from '../kisekae/command.js.js'

export default {
    name: 'kisekae',
    data() {
        return {
            canvas,
            ctx,
            display_canvas,
            display_ctx,
            scale: 1,
            bg,
            command,
        }
    },
    created() {
        /////////////////// instantiate classes and so on

        this.bg = new Image(); this.bg.src = './images/kisekae/background.png'
        // await construction
        this.command = await new Command()
    },
    mounted() {
        /////////////////// initialize canvas

        this.display_canvas = document.getElementById('kisekae')
        this.display_ctx = this.display_canvas.getContext('2d')

        /////////////////// initialize buffered canvas

        this.canvas = document.createElement('canvas')
        this.canvas.width = CONST.originalx
        this.canvas.height = CONST.originaly
        this.ctx = this.canvas.getContext('2d')
        this.ctx.font = "40px 'MS P明朝'"
        this.ctx.fillStyle = '#ffffff'
        this.ctx.textAlign = 'center'

        /////////////////// add event listener

        this.display_canvas.addEventListener('click', this.onClick, false)
        this.display_canvas.addEventListener('keydown', this.onKeyDown, false)
        
        /////////////////// main loop

        setInterval(this.frame, 10)
    },
    methods: {
        frame() {
            this.ctx.drawImage(this.bg, 0, 0)
            switch(this.command.get_stat()) {
                case STAT.ready:
                this.command.proc_ready(); this.command.draw_ready(this.ctx)
                break

                ///////
                
                case STAT.pre_talk:
                this.command.proc_pre_talk(); this.command.draw_talk(this.ctx)
                break
                
                case STAT.talk:
                this.command.proc_talk(); this.command.draw_talk(this.ctx)
                break

                ///////
        
                case STAT.pre_select:
                this.command.proc_pre_select(); this.command.draw_select(this.ctx)
                break
        
                case STAT.select:
                this.command.proc_select(); this.command.draw_select(this.ctx)
                break

                case STAT.post_select:
                this.command.proc_post_select(); this.command.draw_select(this.ctx)
                break

                ///////
                
                case STAT.pre_game:
                this.command.proc_pre_game(); this.command.draw_pre_game(this.ctx)
                break
                
                case STAT.wait_game:
                this.command.proc_wait_game(); this.command.draw_wait_game(this.ctx)
                break
        
                case STAT.game:
                this.command.proc_game(); this.command.draw_game(this.ctx)
                break

                case STAT.wait_game:
                this.command.proc_wait_game(); this.command.draw_wait_game(this.ctx)
                break
        
                case STAT.post_game:
                this.command.proc_post_game(); this.command.draw_post_game(this.ctx)
                break

                ///////
        
                case STAT.pre_cg:
                this.command.proc_pre_cg(); this.command.draw_cg_min(this.ctx)
                break
        
                case STAT.cg:
                this.command.proc_cg(); this.command.draw_cg(this.ctx)
                break
        
                case STAT.post_cg:
                this.command.proc_post_cg(); this.command.draw_cg_min(this.ctx)
                break
        
                default:
            }
            this.resize()
        },

        onClick(e) {
            const rect = e.target.getBoundingClientRect()
            this.clicked((e.clientX - rect.left) / this.scale, (e.clientY - rect.top) / this.scale)
        },
        onKeyDown(e) {
            switch(e.keyCode) {
                case 32:
                case 64:
                clicked(0, 0)
                break

                default:
            }
        },

        clicked(x, y) {
            switch(this.command.get_stat()) {
                case STAT.ready:
                this.command.click_ready()
                break
                
                case STAT.talk:
                this.command.click_talk()
                break
        
                case STAT.select:
                this.command.click_select(x, y)
                break
        
                case STAT.game:
                this.command.click_game(x, y)
                break
        
                case STAT.cg:
                this.command.click_cg()
                break

                case STAT.wait_game:
                this.command.click_wait_game(x, y)
                break
        
                default:
            }
            console.log('clicked: ' + x + ', ' + y)

        },

        resize() {
            this.scale = Math.min((window.innerWidth / CONST.originalx), (window.innerHeight / CONST.originaly), 1)
        
            this.display_canvas.width = CONST.originalx * this.scale
            this.display_canvas.height = CONST.originaly * this.scale
            this.display_ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 
                0, 0, this.display_canvas.width, this.display_canvas.height)
        },
    },
    template: `<canvas id="kisekae"></canvas>`
}