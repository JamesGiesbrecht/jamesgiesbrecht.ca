import { Tech } from 'ts/app/types'

const aws = '/img/logos/aws.png'
const antd = '/img/logos/antd.svg'
const bootstrap = '/img/logos/bootstrap.svg'
const css = '/img/logos/css.png'
const docker = '/img/logos/docker.svg'
const express = '/img/logos/express.png'
const firebase = '/img/logos/firebase.png'
const php = '/img/logos/php.png'
const javascript = '/img/logos/javascript.png'
const jwt = '/img/logos/jwt.png'
const materialUI = '/img/logos/material-ui.png'
const mongoDB = '/img/logos/mongoDB.png'
const nodeJs = '/img/logos/node-js.svg'
const padlock = '/img/logos/padlock.png'
const postgres = '/img/logos/postgres.svg'
const rails = '/img/logos/rails.svg'
const react = '/img/logos/react.svg'
const sqlite = '/img/logos/sqlite.svg'
const typescript = '/img/logos/typescript.png'

const offWhite = '#F5F5F5'
const white = '#FFF'
const black = '#000'

const tech: { [name: string]: Tech } = {
  node: {
    name: 'Node.js',
    logo: nodeJs,
    color: offWhite,
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
    color: offWhite,
    fontColor: black,
  },
  php: {
    name: 'PHP',
    logo: php,
    color: '#717AAA',
    fontColor: black,
  },
  javascript: {
    name: 'Javascript',
    logo: javascript,
    color: '#F0DB4F',
    fontColor: black,
  },
  typescript: {
    name: 'Typescript',
    logo: typescript,
    color: '#2D78C7',
    fontColor: white,
  },
  css: {
    name: 'CSS',
    logo: css,
    color: '#2965F1',
    fontColor: white,
  },
  bootstrap: {
    name: 'Bootstrap',
    logo: bootstrap,
    color: '#563D7C',
    fontColor: white,
  },
  rubyOnRails: {
    name: 'Ruby On Rails',
    logo: rails,
    fontColor: white,
    color: '#CC0000',
  },
  antD: {
    name: 'Ant Design',
    logo: antd,
    color: offWhite,
    fontColor: '#1890ff',
  },
  sqlite: {
    name: 'SQLite',
    logo: sqlite,
    color: offWhite,
    fontColor: '#003B57',
  },
  postgres: {
    name: 'PostgreSQL',
    logo: postgres,
    color: '#336791',
    fontColor: white,
  },
  docker: {
    name: 'Docker',
    logo: docker,
    color: '#2396ED',
    fontColor: white,
  },
  aws: {
    name: 'AWS',
    logo: aws,
    color: '#252F3D',
    fontColor: white,
  },
  oAuth: {
    name: 'OAuth',
    logo: padlock,
    color: '#91D051',
    fontColor: white,
  },
  mongoDB: {
    name: 'mongoDB',
    logo: mongoDB,
    color: offWhite,
    fontColor: black,
  },
  jwt: {
    name: 'JWT',
    logo: jwt,
    color: black,
    fontColor: white,
  },
  firebase: {
    name: 'Firebase',
    logo: firebase,
    color: '#071D34',
    fontColor: white,
  },
}

export default tech
