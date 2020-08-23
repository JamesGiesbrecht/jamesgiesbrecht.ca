import nodeJs from './img/logos/node-js.svg'
import react from './img/logos/react.svg'
import nodeHex from './img/logos/node-hex.png'

import onesnap from './img/projects/onesnap.png'

const tech = {
  node: {
    name: 'Node.js',
    logo: nodeJs,
    color: '#FFFFFF',
    fontColor: '#5C9144',
  },
  react: {
    name: 'React',
    logo: react,
    color: '#2A2C2E',
    fontColor: '#78D1F7',
  },
  materialUI: {
    name: 'Material UI',
    color: '#2384C7',
    fontColor: '#FFFFFF',
  },
  php: {
    name: 'PHP',
    color: '#222222',
    fontColor: '#FFFFFF',
  },
  javascript: {
    name: 'Javascript',
    color: '#222222',
    fontColor: '#FFFFFF',
  },
  css: {
    name: 'CSS',
    color: '#222222',
    fontColor: '#FFFFFF',
  },
}

export default [
  {
    name: 'Critter Companion',
    description: 'A way for users to track their collections of critters in Animal Crossing New Horizons.',
    link: 'https://crittercompanion.app',
    github: 'https://github.com/JamesGiesbrecht/acnh-critter-companion',
    stack: [tech.react, tech.materialUI],
  },
  {
    name: 'Onesnap',
    description: 'An Instagram clone made for a final project in a web development class at Red River College.',
    image: onesnap,
    github: 'https://github.com/JamesGiesbrecht/Onesnap',
    stack: [tech.php, tech.javascript, tech.css],
  },
]
