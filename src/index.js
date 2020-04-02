import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import './styles/main.css'
import './styles/carousel.min.css'

const mountNode = document.getElementById('mountNode')

ReactDOM.render(<App />, mountNode)
