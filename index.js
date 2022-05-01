const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 2

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/Island/output.png'
})

const player = new Fighter({
  position: {
    x: 300,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  }
})

const enemy = new Fighter({
  position: {
    x: 700,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  offset: {
    x: -50,
    y: 0
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

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)

  background.update()
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

  if (rectangularCollision({
    rec1: player,
    rec2: enemy
  }) &&
    player.isAttacking
  ) {
    player.isAttacking = false
    enemy.health -= 5
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }

  if (rectangularCollision({
    rec1: enemy,
    rec2: player
  }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false
    player.health -= 5
    document.querySelector('#playerHealth').style.width = player.health + '%'
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

let timer = 61
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer -= 1
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
decreaseTimer()

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
      if (player.position.y + player.height === canvas.height - 70) {
        player.velocity.y = -30
      }
      break
    case 'j':
      player.attack()
      break
    case 'ArrowDown':
      enemy.attack()
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
      if (enemy.position.y + enemy.height === canvas.height - 70) {
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
