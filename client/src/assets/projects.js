import nodeJs from './img/logos/node-js.svg'
import react from './img/logos/react.svg'
import nodeHex from './img/logos/node-hex.png'
import express from './img/logos/express.png'
import php from './img/logos/php.png'
import materialUI from './img/logos/material-ui.png'
import javascript from './img/logos/javascript.png'
import css from './img/logos/css.png'
import bootstrap from './img/logos/bootstrap.svg'

import onesnap from './img/projects/onesnap.png'
import critterCompanion from './img/projects/critter-companion.jpg'

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
    logo: materialUI,
    color: '#2A2C2E',
    fontColor: '#00B3FA',
  },
  express: {
    name: 'Express',
    logo: express,
    color: '#FFFFFF',
    fontColor: '#000000',
  },
  php: {
    name: 'PHP',
    logo: php,
    color: '#717AAA',
    fontColor: '#000000',
  },
  javascript: {
    name: 'Javascript',
    logo: javascript,
    color: '#F0DB4F',
    fontColor: '#000000',
  },
  css: {
    name: 'CSS',
    logo: css,
    color: '#2965F1',
    fontColor: '#FFFFFF',
  },
  bootstrap: {
    name: 'Bootstrap',
    logo: bootstrap,
    color: '#563D7C',
    fontColor: '#FFFFFF',
  },
}

export default [
  {
    name: 'JamesGiesbrecht.ca',
    summary: 'The website you\'re on right now!',
    description: 'This website',
    link: '#',
    github: 'https://github.com/JamesGiesbrecht/james-giesbrecht',
    stack: [tech.react, tech.materialUI, tech.node, tech.express],
  },
  {
    name: 'Critter Companion',
    summary: 'Progress tracker for Animal Crossing New Horizons',
    description: 'A way for users to track their collections of critters in Animal Crossing New Horizons.',
    image: critterCompanion,
    link: 'https://crittercompanion.app',
    github: 'https://github.com/JamesGiesbrecht/acnh-critter-companion',
    stack: [tech.react, tech.materialUI],
  },
  {
    name: 'Onesnap',
    summary: 'Instagram clone for a college final project',
    description: 'An Instagram clone made for a final project in a web development class at Red River College.',
    image: onesnap,
    github: 'https://github.com/JamesGiesbrecht/Onesnap',
    stack: [tech.php, tech.javascript, tech.css, tech.bootstrap],
  },
]
