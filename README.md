# [Playerctl] Firefox YouTube

> MPRIS D-Bus binding for Firefox [YouTube] and [YouTube Music] tabs.

[YouTube]: https://www.youtube.com/
[YouTube Music]: https://music.youtube.com/
[Playerctl]: https://github.com/acrisci/playerctl

## Overview

This tool is composed of a tiny Firefox add-on and a ridiculously small
daemon.

The daemon registers as a D-Bus MPRIS media player and exposes a
Socket.IO server on port 9225 (currently hard coded) to forward the
`playpause`, `next` and `previous` D-Bus events.

The Firefox add-on then listens for this Socket.IO server in order to
respond to the above events, by finding the currently playing YouTube or
YouTube Music tab and executing the requested action on it.

## Installation

```sh
git clone https://github.com/valeriangalliat/playerctl-firefox-youtube
cd playerctl-firefox-youtube
npm install
node server
```

Then, in Firefox, browse to `about:debugging`, and load this directory
as a temporary add-on.

You might want to add the `node server` line somewhere where it's
started automatically for your session.

## Usage

Assuming you use [Playerctl] and have some [YouTube] or [YouTube Music]
tab playing:

```sh
playerctl play-pause
playerctl previous
playerctl next
```
