import {Switch} from 'react-router-dom';
import  Route  from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Marker from '../pages/Marker';

const Routes = () => {
    return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register}/>
                <Route exact path="/marcadores" component={Marker}/>
            </Switch>
    )
}

export default Routes;