const Player = require('mpris-service')
const io = require('socket.io')(9225)

const player = Player({
  name: 'youtube',
  identity: 'YouTube media player',
  supportedInterfaces: ['player']
})

const events = ['playpause', 'next', 'previous']

for (const event of events) {
  player.on(event, () => io.emit(event))
}
