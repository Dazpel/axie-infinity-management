import { AuthProvider } from './components/AuthProvider/AuthProvider';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Homepage } from './Homepage';
import { Provider } from 'react-redux'
import { store } from './components/store/store';
import UnauthenticatedRoute from './components/Routing/Unauthenticated.route'
import PrivateRoute from './components/Routing/private.route'
import Login from './components/Authentication/Login'

const App = () => {

  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AnimatePresence exitBeforeEnter>
            <Switch>
              <UnauthenticatedRoute exact path='/login' component={Login} />
              <PrivateRoute path="/" component={Homepage} />
            </Switch>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </Provider>

  );
}

export default App;