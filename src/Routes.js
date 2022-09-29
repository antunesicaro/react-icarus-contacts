import {Switch,Route} from 'react-router-dom'; //import o Swith que é pra garantir que somente uma rota vai ser rendezirada por vez e o Routes é a rota em si
//rota raiz é a /, por isso usa a prop exact pra dizer q tem q ser exatamente assim

//importar as páginas q serão usadas nas rotas, no caso as function delas q estao dentro do index.js... renderizo as pages com o component
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

//vamos usar essas páginas pra mudar a seção, matendo a logo

export default function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/new" component={NewContact}></Route>
            <Route path="/edit/:id" component={EditContact}></Route>
        </Switch>
    );
}
