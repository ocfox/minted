function rectangularCollision({ rec1, rec2 }) {
  return (
    rec1.attackBox.position.x + rec1.attackBox.width >= rec2.position.x &&
    rec1.attackBox.position.y + rec1.attackBox.height >= rec2.position.y &&
    rec2.position.x + rec2.width >= rec1.attackBox.position.x &&
    rec2.position.y + rec2.height >= rec1.attackBox.position.y
  )
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#result').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#result').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#result').innerHTML = 'Player Win'
  } else {
    document.querySelector('#result').innerHTML = 'Enemy Win'
  }
}
