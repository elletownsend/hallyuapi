import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Docs from './components/Docs';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/docs' component={Docs} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
