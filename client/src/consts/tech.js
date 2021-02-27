import nodeJs from 'assets/img/logos/node-js.svg'
import react from 'assets/img/logos/react.svg'
// import nodeHex from 'assets/img/logos/node-hex.png'
import express from 'assets/img/logos/express.png'
import php from 'assets/img/logos/php.png'
import materialUI from 'assets/img/logos/material-ui.png'
import javascript from 'assets/img/logos/javascript.png'
import css from 'assets/img/logos/css.png'
import bootstrap from 'assets/img/logos/bootstrap.svg'
import rails from 'assets/img/logos/rails.svg'
import antd from 'assets/img/logos/antd.svg'
import sqlite from 'assets/img/logos/sqlite.svg'
import postgres from 'assets/img/logos/postgres.svg'
import docker from 'assets/img/logos/docker.svg'
import aws from 'assets/img/logos/aws.png'
import padlock from 'assets/img/logos/padlock.png'
import mongoDB from 'assets/img/logos/mongoDB.png'
import jwt from 'assets/img/logos/jwt.png'

const offWhite = '#F5F5F5'
const white = '#FFF'
const black = '#000'

export default {
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
}
