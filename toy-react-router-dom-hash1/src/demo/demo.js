import HashRouter from '../src/HashRouter';
import Route from '../src/Route';
import Link from '../src/Link';

import One from './pages/One';
import Two from './pages/Two';
import Three from './pages/Three';

function App() {
  return (
    <div>
      <HashRouter>
        <div>
          <Link to='/one'>one</Link>
          <Link to='/two'>two</Link>
          <Link to='/three'>three</Link>
        </div>
        <div>
          <Route path='/one' component={One} />
          <Route path='/two' component={Two} exact />
          <Route path='/three' component={Three} exact />
          <Route path='/three' component={Three} exact />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
