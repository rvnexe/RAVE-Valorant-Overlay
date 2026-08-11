<h1 align="center"><img width="700px" alt="Image" src="https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/h1.webp?raw=true"/><br>RAVE - Overlay for VALORANT Tournaments<br><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=2b2b2b&color=61DAFB">
</h1>

A manually-controlled HUD to be used for Valorant Esports streaming and observation; Perfectly aligned with VALORANT's native UI.

Currently, due to VALORANT Client's limitations, there's no automatic game feeds; This Tool is manually controlled through an HTML page. Overlay can be used in **OBS Browser Source** or anywhere else.

## Features
* **Teams scoreboard**
* **Timeout indicator:** Aligned with ingame timer + Timeouts count & Animated background
* **TECH PAUSE Indicator**
* **Match Point header**

[<img width="670px" alt="Image" src="https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/tasks.webp?raw=true"/>](https://github.com/rvnexe/RAVE-Valorant-Overlay/issues)

## Screenshots
<img width="1134" alt="Image" src="https://raw.githubusercontent.com/rvneXe/RAVE-Valorant-Overlay/refs/heads/main/screenshots/heading.png"/>
<details><summary>Click to view more</summary>

<img width="1134" alt="Image" src="https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/timeout.png?raw=true"/>

![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/techpause.png?raw=true)

![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/matchpoint.png?raw=true)

![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/screenshot1.png?raw=true)

</details>

### IF YOU RAN A TOURNAMENT USING THIS, PLEASE [OPEN A DISCUSSION⇗](https://github.com/rvnexe/RAVE-Valorant-Overlay/discussions/new?category=hall-of-fame) SO I CAN BE HAPPY ABOUT IT🥺🎉🎉🎉

## Getting Started

> [!NOTE]
> **You have to install [Node.js](https://nodejs.org/en/) in order to run this Overlay.**
    
1.  Clone the repo or [download ZIP](https://github.com/rvnexe/RAVE-Valorant-Overlay/archive/refs/heads/main.zip)
    
2.  Open a terminal in repo's folder and run this command:
    

```
npm install
```

3.  Wait until you see this message: `added x packages, and audited x packages`
    

## How to use

### Starting the overlay

1.  Open a terminal in repo's folder and run this command:
    

```
node server.js
```

2.  The overlay server is started now. Use these addresses to access Admin, Setup, and the Overlay itself:
    

```
Admin: localhost:7777/admin.html
Match setup: localhost:7777/setup.html

The Overlay itself: localhost:7777/overlay.html
```

### Adding team logos

*   The logo should be a 1:1 Image file, it's recommended to be larger than 200x200px
    

1.  Copy the logo file in public/userdata/
    
2.  Configure it for the desired team in the **Match Setup** page.
    

## Terms of usage

This tool is available for everyone under GPL-3.0 License. _(TLDR: u can copy, modify and distribute it but under the same license, use privately or for commercial purposes, and it's provided without warranty. [learn more](https://gist.github.com/kn9ts/cbe95340d29fc1aaeaa5dd5c059d2e60))_

> [!IMPORTANT]
> Crediting me isn’t necessary, but it would mean a lot if you did... 👉👈

### Fonts License

Fonts (`Tungsten` and `DIN Next`) aren't licensed! The open-source license applies to my code—not to those fonts. Soooooo take care of your projects made based on this code! If this ever becomes a problem for you, replacing them with free alternatives is the safest path. Just wanted you to know...
