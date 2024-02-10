import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Shop from './pages/Shop'
import './index.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/Users/Profile.jsx'

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          
          <Route path='/' element={<App/>} >
            <Route index element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/favorite' element={<Shop />} />
            <Route path='/cart' element={<Shop />} />
            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
