import { AuthProvider } from './components/AuthProvider/AuthProvider';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import UnauthenticatedRoute from './components/Routing/Unauthenticated.route'
import PrivateRoute from './components/Routing/private.route'
import { Homepage } from './Homepage';
import Login from './components/Authentication/Login'
import { Provider } from 'react-redux'
import { store } from './components/store/store';

const App = () => {

  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AnimatePresence exitBeforeEnter>
            <Switch>
              <UnauthenticatedRoute exact path='/login' component={Login} />
              {/* <UnauthenticatedRoute exact path='/signup' component={SignUp} /> */}
              <PrivateRoute path="/" component={Homepage} />
            </Switch>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </Provider>

  );
}

export default App;