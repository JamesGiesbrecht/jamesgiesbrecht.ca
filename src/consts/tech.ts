import { FILESYSTEM } from 'consts/app'
import { Tech } from 'ts/app/types'

const aws = `${FILESYSTEM.IMAGES.LOGOS}aws.png`
const antd = `${FILESYSTEM.IMAGES.LOGOS}antd.svg`
const bootstrap = `${FILESYSTEM.IMAGES.LOGOS}bootstrap.svg`
const css = `${FILESYSTEM.IMAGES.LOGOS}css.png`
const docker = `${FILESYSTEM.IMAGES.LOGOS}docker.svg`
const express = `${FILESYSTEM.IMAGES.LOGOS}express.png`
const firebase = `${FILESYSTEM.IMAGES.LOGOS}firebase.png`
const php = `${FILESYSTEM.IMAGES.LOGOS}php.png`
const javascript = `${FILESYSTEM.IMAGES.LOGOS}javascript.png`
const jwt = `${FILESYSTEM.IMAGES.LOGOS}jwt.png`
const materialUI = `${FILESYSTEM.IMAGES.LOGOS}material-ui.png`
const mongoDB = `${FILESYSTEM.IMAGES.LOGOS}mongoDB.png`
const nodeJs = `${FILESYSTEM.IMAGES.LOGOS}node-js.svg`
const padlock = `${FILESYSTEM.IMAGES.LOGOS}padlock.png`
const postgres = `${FILESYSTEM.IMAGES.LOGOS}postgres.svg`
const rails = `${FILESYSTEM.IMAGES.LOGOS}rails.svg`
const react = `${FILESYSTEM.IMAGES.LOGOS}react.svg`
const sqlite = `${FILESYSTEM.IMAGES.LOGOS}sqlite.svg`
const typescript = `${FILESYSTEM.IMAGES.LOGOS}typescript.png`
const nextjs = `${FILESYSTEM.IMAGES.LOGOS}nextjs.png`
const jenkins = `${FILESYSTEM.IMAGES.LOGOS}jenkins.png`

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
  nextJs: {
    name: 'Next.js',
    logo: nextjs,
    color: white,
    fontColor: black,
  },
  jenkins: {
    name: 'Jenkins',
    logo: jenkins,
    color: black,
    fontColor: white,
  },
}

export default tech
