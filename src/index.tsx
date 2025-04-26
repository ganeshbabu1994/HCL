import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import signIn from './signIn';
import signUp from './signup'
import patientDashboard from './patientDashboard'
import providerDashboard from './providerDashboard'
import ChatPage from './chatPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:3000')

// io(`ws://${WS_DOMAIN}:${WS_PORT}`, { transports: ["websocket"] });

// var express = require('express')
// var cors = require('cors')
// var bodyParser = require('body-parser')
// var app = express()
// const mongoose = require('mongoose')
// var port = process.env.PORT || 5000

// app.use(bodyParser.json())
// app.use(cors())
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// )

// const mongoURI = 'mongodb://localhost:27017/mernloginreg'

// mongoose
//   .connect(
//     mongoURI,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch()

// var Users = require('./routes/Users')

// app.use('/users', Users)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
  <Routes>
      <Route>
          <Route path="/" Component={signIn}/>
          <Route path="/signUp" Component={signUp}/>
          <Route path="/dashboard" Component={patientDashboard}/>
          <Route path="/provider_dashboard" Component={providerDashboard}/>
          {/* <Route path="/chat" element={<ChatPage socket={socket} />}></Route> */}
      </Route>
  </Routes>
</Router>
);
 

