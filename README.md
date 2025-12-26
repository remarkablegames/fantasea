<p align="center">
  <img src="public/logo.png" alt="FantaSea: Heroes on Vacation" width="400">
</p>

# FantaSea: Heroes on Vacation

[![release](https://img.shields.io/github/v/release/remarkablegames/fantasea)](https://github.com/remarkablegames/fantasea/releases)
[![build](https://github.com/remarkablegames/fantasea/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/fantasea/actions/workflows/build.yml)

🏖️ **FantaSea: Heroes on Vacation** is a tower defense game where you assign heroes on the beach to combat waves of monsters.

This game was made for [GitHub Game Off 2025](https://itch.io/jam/game-off-2025), which the theme was **WAVES**.

Play the game on:

- [itch.io](https://remarkablegames.itch.io/fantasea)
- [remarkablegames](https://remarkablegames.org/fantasea)

## How to Play

- Drag your hero and place it on your base
- Click "Start" to begin the level
- Defeat the wave of monsters to progress the level
- Select a reward to upgrade your stats

## Credits

### Art

- [Wavend](https://wavendart.itch.io/)

### Development

- [remarkablemark](https://github.com/remarkablemark)

### Music

- [Michael Kalra](https://earentech.itch.io/)

### Sounds

- [Arrow Broken Glass #2](https://pixabay.com/sound-effects/arrow-broken-glass-2-388582/)
- [Bouncing Ball Sound Effect by Engyclick](https://pixabay.com/sound-effects/bouncing-ball-sound-effect-by-engyclick-280716/)
- [Fist Punch or kick](https://pixabay.com/sound-effects/fist-punch-or-kick-7171/)
- [Item swing SFX 3](https://pixabay.com/sound-effects/item-swing-sfx-3-409079/)
- [Knife Stab Sound Effect](https://pixabay.com/sound-effects/knife-stab-sound-effect-36354/)
- [Mouse click](https://pixabay.com/sound-effects/mouse-click-290204/)
- [Pop](https://pixabay.com/sound-effects/pop-423717/)
- [Real Swish_3](https://pixabay.com/sound-effects/real-swish-3-304242/)
- [UI Sounds pack 3 (7)](https://pixabay.com/sound-effects/ui-sounds-pack-3-7-359721/)
- [click button](https://pixabay.com/sound-effects/click-button-131479/)
- [monster death grunt](https://pixabay.com/sound-effects/monster-death-grunt-131480/)
- [water drop](https://pixabay.com/sound-effects/water-drop-85731/)

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#readme)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/fantasea.git
cd fantasea
```

Install the dependencies:

```sh
npm install
```

Update the environment variables:

```sh
cp .env .env.local
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the game for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your game is ready to be deployed!

### `npm run bundle`

Builds the game and packages it into a Zip file in the `dist` folder.

Your game can be uploaded to your server, [Itch.io](https://itch.io/), [Newgrounds](https://www.newgrounds.com/), etc.
