import './App.css';
import RootLayout from './Layout/RootLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

      <Route index element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route path="*" element={<NotFound/>} />

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
