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
import CreateProduct from './pages/Admin/CreateProduct.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import UpdateProduct from './pages/Admin/UpdateProduct.jsx'
import Favorites from './pages/Users/Favorites.jsx'
import ProductDetails from './pages/Users/ProductDetails.jsx'
import Cart from './pages/Users/Cart.jsx'

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
              <Route path='/favorite' element={<Favorites />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/product/:id' element={<ProductDetails />}/>

              {/* Admin Routes */}
              <Route path='/admin' element={<AdminRoute />}>
                <Route path='users' element={<UserList />}></Route>
                <Route path='categories' element={<CategoryList />}></Route>
                <Route path='products' element={<AllProducts />}></Route>
                <Route path='createProduct' element={<CreateProduct />}></Route>
                <Route path='updateProduct/:id' element={<UpdateProduct />}></Route>
              </Route>
            </Route>
          </Route>

            
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
