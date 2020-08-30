import tech from '../consts/tech'
import jamesGiesbrecht from './img/projects/james-giesbrecht.jpg'
import onesnap from './img/projects/onesnap.jpg'
import critterCompanion from './img/projects/critter-companion.jpg'

export default [
  {
    name: 'JamesGiesbrecht.ca',
    description: 'This website',
    summary: 'The website you\'re on right now! Express backend for personal APIs, React frontend, and an automated build and deploy process utilizing git-hooks.',
    image: jamesGiesbrecht,
    link: { isPopper: true, content: 'You\'re already here silly' },
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
