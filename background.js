/* global browser, io */

const socket = io('ws://localhost:9225')

const playCode = `document.querySelector('video').play()`
const pauseCode = `document.querySelector('video').pause()`
const nextCode = `document.querySelector('.next-button, .ytp-next-button').click()`
const previousCode = `document.querySelector('.previous-button') ? document.querySelector('.previous-button').click() : history.back()`

function sendCode (code, tabId) {
  browser.tabs.executeScript(tabId, { code })
}

async function getPlayingTab () {
  const tabs = await browser.tabs.query({
    audible: true,
    url: '*://*.youtube.com/*'
  })

  return tabs[0]
}

let lastPausedTabId

socket.on('playpause', async () => {
  const tab = await getPlayingTab()

  if (!tab) {
    if (lastPausedTabId) {
      sendCode(playCode, lastPausedTabId)
    }

    return
  }

  lastPausedTabId = tab.id
  sendCode(pauseCode, tab.id)
})

socket.on('next', async () => {
  const tab = await getPlayingTab()
  const id = tab ? tab.id : lastPausedTabId

  if (id) {
    sendCode(nextCode, tab.id)
  }
})

socket.on('previous', async () => {
  const tab = await getPlayingTab()
  const id = tab ? tab.id : lastPausedTabId

  if (id) {
    sendCode(previousCode, id)
  }
})
