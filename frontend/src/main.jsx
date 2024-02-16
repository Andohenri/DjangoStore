import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Users/Home'
import Shop from './pages/Users/Shop'
import Profile from './pages/Users/Profile'
import './index.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          {/* Private Route */}
          <Route path='' element={<PrivateRoute />}>
            <Route path='/' element={<App/>} >

              <Route index element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/favorite' element={<Shop />} />
              <Route path='/cart' element={<Shop />} />
              <Route path='/profile' element={<Profile/>}/>
              {/* Admin Routes */}
              <Route path='/admin' element={<AdminRoute />}>
                <Route path='users' element={<UserList />}></Route>
                <Route path='categories' element={<CategoryList />}></Route>
                <Route path='products' element={<ProductList />}></Route>
              </Route>
            </Route>
          </Route>

            
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
