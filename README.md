# RAVE - A VALORANT Overlay

A manually-controlled Observer HUD to be used for Valorant Esports streaming and observation.

Currently, due to VALORANT Client's limitations, there's no automatic game feeds; Everything on this Tool is manually controlled through 2 HTML pages for **Administration** and a **Match setup**. The Overlay page can be used in OBS Browser Source or anywhere else.

## Features
* Team Information (Name, Logo, Map score) with Side-Switching feature.
* Timeout indicator (Team, Side and their remaining timeouts)
* Technical Pause Indicator
* Match Point header (Team Name and their side)

## Screenshots
![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/heading.png?raw=true)
<details><summary>Click to view more</summary>

![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/timeout.png?raw=true)
![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/techpause.png?raw=true)
![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/matchpoint.png?raw=true)
![a screenshot](https://github.com/rvneXe/RAVE-Valorant-Overlay/blob/main/screenshots/screenshot1.png?raw=true)
</details>

# Getting Started

*   **You have to install [Node.js]([https://nodejs.org/en/) in order to run this Overlay.**
    

1.  Clone the repo
    
2.  Open a terminal in repo's folder and run this command:
    

```
npm install
```

3.  Wait until you see this message: `added x packages, and audited x packages`
    

# How to use

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
    

# Terms of usage

## IF YOU RAN A TOURNAMENT USING THIS, PLEASE [OPEN A DISCUSSION⇗](https://github.com/rvnexe/RAVE-Valorant-Overlay/discussions/new?category=hall-of-fame) SO I CAN BE HAPPY ABOUT IT🥺🎉🎉🎉
This tool is available for everyone under GPL-3.0 License. _(TLDR: u can copy, modify and distribute it but under the same license, use privately or for commercial purposes, and it's provided without warranty. [learn more](https://gist.github.com/kn9ts/cbe95340d29fc1aaeaa5dd5c059d2e60))_

### It's not necessary to credit me anywhere if you're using it, but it will be so kind if you do... 👉👈

# Fonts License

I did include some fonts (`Tungsten` & `DIN Next`) with this repository, to use in this project and it's purpose only. Any other usage is not intended by me, and will not be my fault, and I'll not be responsible for any illegal usage of those fonts.
