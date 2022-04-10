const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 2

class Sprite {
  constructor({ position, velocity, color = 'red' }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.width = 50
    this.lastKey
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    }
    this.color = color
    this.isAttacking = false
  }

  draw() {
    context.fillStyle = this.color
    context.fillRect(this.position.x, this.position.y, this.width, this.height)

    if (this.isAttacking) {
      context.fillStyle = 'green'
      context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update() {
    this.draw()
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
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
  },
  color: 'blue'
})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
}

let lastKey

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    enemy.position.x + enemy.width >= player.attackBox.position.x &&
    enemy.position.y + enemy.height >= player.attackBox.position.y &&
    player.isAttacking) {
    player.isAttacking = false
    console.log('-hp (for test)')
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break
    case 'w':
      if (player.velocity.y === 0) {
        player.velocity.y = -30
      }
      break
    case 'j':
      player.attack()
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      break
    case 'ArrowUp':
      if (enemy.velocity.y === 0) {
        enemy.velocity.y = -30
      }
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
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }

})
