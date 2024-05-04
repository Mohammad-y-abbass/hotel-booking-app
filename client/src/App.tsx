import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

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
        <Route path='/sign-in' element={<h1>Si</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
