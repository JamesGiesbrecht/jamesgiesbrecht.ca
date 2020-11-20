import React from 'react'
import { Link } from '@material-ui/core'
import tech from 'consts/tech'
import jamesGiesbrecht from 'assets/img/projects/james-giesbrecht.jpg'
import onesnap from 'assets/img/projects/onesnap.jpg'
import critterCompanion from 'assets/img/projects/critter-companion.jpg'

export default [
  {
    name: 'JamesGiesbrecht.ca',
    summary: 'The website you\'re on right now! Express backend for personal APIs, React frontend, and an automated build and deploy process utilizing git-hooks.',
    description: [
      {
        title: 'Features',
        content: [
          'Backend Express server to build and learn with RESTful APIs',
          <>
            {'WRHA wait times web scraping for my wife so she can ask her phone for the '}
            <Link href="/api/wrha/grace">current wait times at her workplace</Link>
          </>,
          'Hosted on a Linux Digital Ocean droplet',
          <>
            {'Git-hooks automatically build and deploy the site when master is pushed to webserver, and deploys to '}
            <Link href="dev.jamesgiesbrecht.ca">dev.jamesgiesbrecht.ca</Link>
            {' when any other branch is pushed'}
          </>,
          <>
            {'Subdomain to host my past PHP based projects '}
            <Link href="php.jamesgiesbrecht.ca/old-portfolio">Example project: Old Portfolio</Link>
          </>,
          'Light/dark mode',
          'Responsive',
        ],
      },
      {
        title: 'Upcoming Features',
        content: [
          'Filter project views by tech used',
          'Blog posts generated on uploaded markdown files',
        ],
      },
    ],
    image: jamesGiesbrecht,
    link: { isPopper: true, content: 'You\'re already here silly' },
    github: 'https://github.com/JamesGiesbrecht/james-giesbrecht',
    stack: [tech.react, tech.materialUI, tech.node, tech.express],
  },
  {
    name: 'Critter Companion',
    summary: 'Progress tracker for Animal Crossing New Horizons',
    description: [
      {
        title: 'Description',
        content: [
          'A way for users to track their collections of critters in Animal Crossing New Horizons.',
        ],
      },
      {
        title: 'Features',
        content: [
          'Dynamic filtering of critters',
          'Saving to local storage of selected critters',
          'Search functionality',
          'Light/dark mode',
        ],
      },
      {
        title: 'Upcoming Features',
        content: [
          'Persistent filter/settings between visits',
          'OAuth based login for cloud sync of users critters/setting',
          'Support for other items in the game such as fossils and furniture',
        ],
      },
    ],
    image: critterCompanion,
    link: 'https://crittercompanion.app',
    github: 'https://github.com/JamesGiesbrecht/acnh-critter-companion',
    stack: [tech.react, tech.materialUI],
  },
  {
    name: 'Onesnap',
    summary: 'Instagram clone for a college final project',
    description: [
      {
        title: 'Description',
        content: [
          'WARNING: Bad code ahead! Onesnap is a Instagram clone made for a final project in a web development class at Red River College. This project taught me a lot about CRUD operations, responsive design, user authentication, integration with 3rd party apis, and input sanitization. It was built entirely with vanilla languages (with the exception of Bootstrap).',
        ],
      },
      {
        title: 'Features',
        content: [
          'Create and comment on posts',
          'Dynamic content retrieval based on who you are following or whose profile you are viewing',
          'Infinite scrolling',
          'User account creation and authentication',
          'Hashed and salted passwords',
          'Guarded routes and functionality only available to admin users',
          'Sanitized DB entries',
          'Random image retrieval through the Unsplash API (Note the app doesn\'t actively reach out to the API due to rate limits encountered in development, so multiple requests were made in advance and stored in the app)',
          'Responsive design',
        ],
      },
      {
        title: 'Retrospective',
        content: [
          'Building this app gave me lots of practice in CSS and responsive design. This was also my first venture into AJAX and backend integrations. It\'s not the cleanest code by any stretch and there were definitely compromises made in order to meet deadlines. Building this app really outlined how taking advantages of templating and frameworks could\'ve streamlined the development process.',
        ],
      },
    ],
    image: onesnap,
    link: 'https://php.jamesgiesbrecht.ca/onesnap',
    github: 'https://github.com/JamesGiesbrecht/Onesnap',
    stack: [tech.php, tech.javascript, tech.css, tech.bootstrap],
  },
]
