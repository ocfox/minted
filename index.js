const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6

class Sprite {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.width = 50
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
  }
}

const player = new Sprite({
  position: {
    x: 300,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
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

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  if (keys.a.pressed) {
    player.velocity.x = -1
  } else if (keys.d.pressed) {
    player.velocity.x = 1
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'w':
      keys.w.pressed = true
      break
  }

})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'w':
      keys.w.pressed = false
  }

})
