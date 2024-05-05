import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <h1>Hello</h1>
            </Layout>
          }
        />
        <Route
          path='/sign-up'
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
