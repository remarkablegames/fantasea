<p align="center">
  <img src="https://github.com/remarkablegames/fantasea/blob/master/public/logo.png" alt="FantaSea">
</p>

# FantaSea: Heroes on Vacation

[![release](https://img.shields.io/github/v/release/remarkablegames/fantasea)](https://github.com/remarkablegames/fantasea/releases)
[![build](https://github.com/remarkablegames/fantasea/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/fantasea/actions/workflows/build.yml)

🏖️ Heroes at the beach, but the monsters crash the party.

Play the game on:

- [itch.io](https://remarkablegames.itch.io/fantasea)
- [remarkablegames](https://remarkablegames.org/fantasea)

## Credits

### Art

- [Wavend](https://wavendart.itch.io/)

### Development

- [remarkablemark](https://github.com/remarkablemark)

### Music

- [Michael Kalra](https://earentech.itch.io/)

### Sounds

- [Fist Punch or kick](https://pixabay.com/sound-effects/fist-punch-or-kick-7171/)
- [Mouse click](https://pixabay.com/sound-effects/mouse-click-290204/)

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
