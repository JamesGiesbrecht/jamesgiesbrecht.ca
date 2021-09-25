import { Tech } from 'ts/app/types'

import aws from 'assets/img/logos/aws.png'
import antd from 'assets/img/logos/antd.svg'
import bootstrap from 'assets/img/logos/bootstrap.svg'
import css from 'assets/img/logos/css.png'
import docker from 'assets/img/logos/docker.svg'
import express from 'assets/img/logos/express.png'
import firebase from 'assets/img/logos/firebase.png'
import php from 'assets/img/logos/php.png'
import javascript from 'assets/img/logos/javascript.png'
import jwt from 'assets/img/logos/jwt.png'
import materialUI from 'assets/img/logos/material-ui.png'
import mongoDB from 'assets/img/logos/mongoDB.png'
import nodeJs from 'assets/img/logos/node-js.svg'
import padlock from 'assets/img/logos/padlock.png'
import postgres from 'assets/img/logos/postgres.svg'
import rails from 'assets/img/logos/rails.svg'
import react from 'assets/img/logos/react.svg'
import sqlite from 'assets/img/logos/sqlite.svg'
import typescript from 'assets/img/logos/typescript.png'

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
