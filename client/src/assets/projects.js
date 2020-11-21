import React from 'react'
import { Link } from '@material-ui/core'
import tech from 'consts/tech'
import jamesGiesbrecht from 'assets/img/projects/james-giesbrecht.png'
import onesnap from 'assets/img/projects/onesnap.png'
import onesnapBg from 'assets/img/projects/onesnap-bg.jpg'
import critterCompanion from 'assets/img/projects/critter-companion.png'
import critterCompanionBg from 'assets/img/projects/critter-companion-bg.jpg'
import gamePit from 'assets/img/projects/game-pit.png'
import gamePitBg from 'assets/img/projects/game-pit-bg.jpg'

export default [
  {
    name: 'JamesGiesbrecht.ca',
    summary: 'The website you\'re on right now! Express backend for personal APIs, React frontend, and an automated build and deploy process utilizing git-hooks.',
    description: [
      {
        title: 'Features',
        content: [
          'Backend NodeJS/Express server to build and learn with RESTful APIs',
          <>
            {'WRHA wait times web scraping for my wife so she can ask her phone for the '}
            <Link target="_blank" href="/api/wrha/grace">current wait times at her workplace</Link>
          </>,
          'Hosted on a Linux Digital Ocean droplet',
          <>
            {'Git-hooks automatically build and deploy the site when master is pushed to webserver, and deploys to '}
            <Link target="_blank" href="https://dev.jamesgiesbrecht.ca">dev.jamesgiesbrecht.ca</Link>
            {' when any other branch is pushed'}
          </>,
          <>
            {'Subdomain to host my past PHP based projects '}
            <Link target="_blank" href="https://php.jamesgiesbrecht.ca/old-portfolio">Example project: Old Portfolio</Link>
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
    background: '#1D1D1D',
    link: { isPopper: true, content: 'You\'re already here silly' },
    github: 'https://github.com/JamesGiesbrecht/james-giesbrecht',
    stack: [tech.react, tech.materialUI, tech.node, tech.express],
  },
  {
    name: 'Game Pit',
    summary: 'Full-featured (kinda) mock e-commerce site specializing in video game and console sales. Powered by a Ruby on Rails backend that providing a RESTful JSON API being consumed by a React front end.',
    description: [
      {
        title: 'Description',
        content: [
          <>
            {'A (WIP) e-commerce project from my Full Stack Web Development class final project. Meant to emulate a small business requesting a online storefront. Code button below links to the front end React code, '}
            <Link target="_blank" href="https://github.com/JamesGiesbrecht/game_pit">backend code can be found here.</Link>
          </>,
        ],
      },
      {
        title: 'Features',
        content: [
          'Admin dashboard to manually add or edit properties of products',
          'Real scraped data from vgchartz.com and bestbuy.ca',
          'Product browsing, searching, and filtering',
          'Shopping cart functionality saved to local storage to persist across refreshes and browsing sessions',
          'Individual product pages for each product',
        ],
      },
      {
        title: 'Upcoming Features',
        content: [
          'Cart checkout with (mock) payment',
          'Account creation with address and login',
          'Order creation with pricing and taxes preserved at time of order',
        ],
      },
    ],
    image: gamePit,
    background: gamePitBg,
    // link: 'https://crittercompanion.app',
    github: 'https://github.com/JamesGiesbrecht/game_pit_react',
    stack: [tech.rubyOnRails, tech.react, tech.antD, tech.sqlite],
  },
  {
    name: 'Critter Companion',
    summary: 'Progress tracker for Animal Crossing New Horizons. Client side app made with React.',
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
    background: critterCompanionBg,
    link: 'https://crittercompanion.app',
    github: 'https://github.com/JamesGiesbrecht/acnh-critter-companion',
    stack: [tech.react, tech.materialUI],
  },
  {
    name: 'Onesnap',
    summary: 'Instagram clone with user auth, profiles, and posts for a college final project. Aside from Bootstrap, made entirely with vanilla PHP, Javascript, and HTML/CSS.',
    description: [
      {
        title: 'Description',
        content: [
          'WARNING: Bad code ahead! This is one of my first big projects and a lot of mistakes were made and lessons were learned. Onesnap is a Instagram clone made for a final project in a web development class at Red River College. This project taught me a lot about CRUD operations, responsive design, user authentication, integration with 3rd party apis, and input sanitization. It was built entirely with vanilla languages (with the exception of Bootstrap).',
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
          'Building this app gave me lots of practice in CSS and responsive design. This was also my first venture into AJAX and backend integrations. It\'s not the cleanest code by any stretch and there were definitely compromises made in order to meet deadlines. Building this app really outlined how taking advantages of templating and frameworks that could\'ve really streamlined the development process.',
        ],
      },
    ],
    image: onesnap,
    background: onesnapBg,
    link: 'https://php.jamesgiesbrecht.ca/onesnap',
    github: 'https://github.com/JamesGiesbrecht/Onesnap',
    stack: [tech.php, tech.javascript, tech.css, tech.bootstrap],
  },
]
