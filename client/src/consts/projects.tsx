import { Link } from '@mui/material'
import { Link as LinkIcon, Code as CodeIcon } from '@mui/icons-material'

import tech from 'consts/tech'
import { Project } from 'ts/app/types'

import jamesGiesbrecht from 'assets/img/projects/james-giesbrecht.png'
import wrha from 'assets/img/projects/wrha-wait-times.png'
import wrhaBg from 'assets/img/projects/wrha-wait-times-bg.jpg'
import craTemplate from 'assets/img/projects/react.png'
import craTemplateBg from 'assets/img/projects/cra-template-bg.jpg'
import onesnap from 'assets/img/projects/onesnap.png'
import onesnapBg from 'assets/img/projects/onesnap-bg.jpg'
import critterCompanion from 'assets/img/projects/critter-companion.png'
import critterCompanionBg from 'assets/img/projects/critter-companion-bg.jpg'
import gamePit from 'assets/img/projects/game-pit.png'
import gamePitBg from 'assets/img/projects/game-pit-bg.jpg'

const projects: Project[] = [
  {
    name: 'JamesGiesbrecht.ca',
    summary:
      "The website you're on right now! Express backend and MongoDB for personal APIs, React frontend, all containerized through Docker.",
    description: [
      {
        title: 'Features',
        content: [
          'Backend NodeJS/Express server to build and learn with RESTful APIs',
          'Login and Authentication with Firebase and JWT',
          'CRUD operations in the Posts tab. Authenticated users can create, view, edit, and delete posts.',
          'Dockerized for straightforward and reliable deployments and updates.',
          <>
            {'WRHA wait times web scraping for my wife so she can ask her phone for the '}
            <Link target="_blank" href="/api/wrha/grace">
              current wait times at her workplace
            </Link>
          </>,
          'Hosted on a Linux Digital Ocean droplet',
          'Light/dark mode',
          'Mobile Responsive',
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
    buttons: [
      {
        name: 'Code',
        icon: <CodeIcon />,
        link: 'https://github.com/JamesGiesbrecht/james-giesbrecht',
      },
    ],
    stack: [
      tech.react,
      tech.materialUI,
      tech.typescript,
      tech.docker,
      tech.firebase,
      tech.node,
      tech.express,
      tech.jwt,
      tech.mongoDB,
    ],
  },
  {
    name: 'Critter Companion',
    summary:
      'Progress tracker for Animal Crossing New Horizons. Client side app made with React. Native mobile version of the app under development.',
    description: [
      {
        title: 'Description',
        content: [
          'A way for users to track their collections of critters in Animal Crossing New Horizons. Users are able to log in and their configurations are saved and synced.',
        ],
      },
      {
        title: 'Features',
        content: [
          'Dynamic filtering of critters',
          'Authentication and saving of selected critters through Firebase.',
          'Search functionality',
          'Light/dark mode',
        ],
      },
    ],
    image: critterCompanion,
    background: critterCompanionBg,
    buttons: [
      { name: 'Website', icon: <LinkIcon />, link: 'https://crittercompanion.app' },
      {
        name: 'Code',
        icon: <CodeIcon />,
        items: [
          {
            name: 'Web',
            link: 'https://github.com/JamesGiesbrecht/critter-companion-web',
          },
          {
            name: 'Mobile',
            link: 'https://github.com/JamesGiesbrecht/critter-companion-mobile',
          },
          {
            name: 'Utility',
            link: 'https://github.com/JamesGiesbrecht/critter-companion-utility',
          },
        ],
      },
    ],
    stack: [tech.react, tech.materialUI, tech.typescript, tech.firebase],
  },
  {
    name: 'WRHA Wait Times Alexa Skill',
    summary: 'An Alexa Skill to get the current wait times for any hospital in Winnipeg.',
    description: [
      {
        title: 'Description',
        content: [
          'My wife works in health care and frequently would check the WRHA website to see the wait times for her shift. I saw a problem and I decided to fix it for her.',
          'The skill contacts an API I made to scrape the official WRHA website for wait times, this API is also utilized in a iOS widget to allow quick access on her phone home screen.',
        ],
      },
    ],
    image: wrha,
    background: wrhaBg,
    buttons: [{ name: 'Website', icon: <LinkIcon />, link: 'https://www.amazon.ca/dp/B08RJ8NKBC' }],
    stack: [tech.aws, tech.node],
  },
  {
    name: 'Custom Create React App Template',
    summary:
      'A Create React App template with React Router, Material UI, Eslint, Prettier, and Typescript with a basic layout and routes configured.',
    description: [
      {
        title: 'Description',
        content: ['Try it out: npx create-react-app my-app --template goose'],
      },
    ],
    image: craTemplate,
    background: craTemplateBg,
    buttons: [
      {
        name: 'Code',
        icon: <CodeIcon />,
        link: 'https://github.com/JamesGiesbrecht/cra-template-goose',
      },
    ],
    stack: [tech.react, tech.materialUI, tech.typescript],
  },
  {
    name: 'Game Pit',
    hidden: true,
    summary:
      'A mock e-commerce site specializing in video game and console sales. Powered by a Ruby on Rails backend that providing a RESTful JSON API being consumed by a React front end. Also my first experience with Docker and containerization. This app was part of a school project and is no longer getting updates.',
    description: [
      {
        title: 'Description',
        content: [
          'A e-commerce project from my Full Stack Web Development class final project. Meant to emulate a small business requesting a online storefront. The code is contained in a monorepo, the React code can be found in the "client" subdirectory.',
        ],
      },
      {
        title: 'Features',
        content: [
          'Containerized with Docker to deploy anywhere',
          'Admin dashboard to manually add or edit properties of products',
          'Real scraped data from vgchartz.com and bestbuy.ca',
          'Product browsing, searching, and filtering',
          'Shopping cart functionality saved to local storage to persist across refreshes and browsing sessions',
          'Individual product pages for each product',
        ],
      },
    ],
    image: gamePit,
    background: gamePitBg,
    buttons: [
      { name: 'Website', icon: <LinkIcon />, link: 'https://gamepit.jamesgiesbrecht.ca' },
      {
        name: 'Code',
        icon: <CodeIcon />,
        link: 'https://github.com/JamesGiesbrecht/game_pit',
      },
    ],
    stack: [tech.rubyOnRails, tech.react, tech.antD, tech.postgres, tech.docker],
  },
  {
    name: 'Onesnap',
    hidden: true,
    summary:
      'Instagram clone with user auth, profiles, and posts for a college final project. Aside from Bootstrap, made entirely with vanilla PHP, Javascript, and HTML/CSS.',
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
          "Random image retrieval through the Unsplash API (Note the app doesn't actively reach out to the API due to rate limits encountered in development, so multiple requests were made in advance and stored in the app)",
          'Responsive design',
        ],
      },
      {
        title: 'Retrospective',
        content: [
          "Building this app gave me lots of practice in CSS and responsive design. This was also my first venture into AJAX and backend integrations. It's not the cleanest code by any stretch and there were definitely compromises made in order to meet deadlines. Building this app really outlined how taking advantages of templating and frameworks that could've really streamlined the development process.",
        ],
      },
    ],
    image: onesnap,
    background: onesnapBg,
    buttons: [
      {
        name: 'Code',
        icon: <CodeIcon />,
        link: 'https://github.com/JamesGiesbrecht/Onesnap',
      },
    ],
    stack: [tech.php, tech.javascript, tech.css, tech.bootstrap],
  },
]

export default projects
