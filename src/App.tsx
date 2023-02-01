import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import Search from './pages/Search';

function App() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path='/' element={<Home />} />,
      <Route path='/search' element={<Search />} />
    </Route>
  )
);

export default App;
