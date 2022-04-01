const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, 50, 150)
  }

  update() {
    if (this.position.y + 150 + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
      this.position.y = canvas.height - 150
    }
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const player = new Sprite({
  position: {
    x: 300,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  }
})

const enemy = new Sprite({
  position: {
    x: 700,
    y: 400
  },
  velocity: {
    x: 0,
    y: 10
  }
})



function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()
}

animate()

player.draw()
enemy.draw()
