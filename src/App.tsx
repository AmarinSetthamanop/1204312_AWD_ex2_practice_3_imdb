import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage';
import MoviePage from './pages/movie/MoviePage';
import PersonPage from './pages/person/PersonPage';


const routers = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/movie', element: <MoviePage /> },
      { path: '/person', element: <PersonPage /> }
    ]
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={routers}/>
    </>
  )
}

export default App
