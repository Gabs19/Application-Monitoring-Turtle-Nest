import {Switch} from 'react-router-dom';
import  Route  from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NestLocations from '../pages/NestLocations';
import Details from '../pages/Details';
import DetailsNonRepro from '../pages/DetailsNonRepro';
import Monitor from '../pages/TurtleMonitor';
import Sobre from '../pages/sobre';

const Routes = () => {
    return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home} isPrivate/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register}/>
                <Route exact path="/ninhos" component={NestLocations} isPrivate/>
                <Route exact path="/detalhes-ninho/:id" component={Details} />
                <Route exact path="/detalhes-non-reprodutivo/:id" component={DetailsNonRepro} />
                <Route exact path="/tartarugometro" component={Monitor}/>
                <Route exact path="/sobre" component={Sobre}/>
            </Switch>
    )
}

export default Routes;