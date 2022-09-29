import React from "react";
import PropTypes from 'prop-types';
import  ReactDOM  from "react-dom"; //para usar o nodo, portal lá do index, assim o loader n vai ter a position absoluta em relação à div pai q é container(loader está dentro de container) e sim vai ter a div pai mais externa que criamos no index
import { Overlay } from "./styles";

export default function Loader({isLoading}){

    if(!isLoading){ //se is loading not true, é false, nao ta carregando, nao renderiza nada
        return null;
    }
    //rendereiza

    return ReactDOM.createPortal(
        <Overlay>
            <div className="loader"/>
        </Overlay>,
        document.getElementById('loader-root'),
    );

}


Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
}
