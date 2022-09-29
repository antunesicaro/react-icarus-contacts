import GlobalStyles from '../../assets/styles/global';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom'; //preciso disso aqui para envolver toda a aplicação, pois não pode-se usar um <Swith> fora de um <Router>, e lá no Routes eu uso um switch
import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles' //importa const Container e o engloba para centralizar todas divs da aplicação
import  Header  from '../Header'; //importo  o Header q vem por função exportada, portanto sem chave da desestruturação
//import ContactsList from '../ContactsList';  //não irei mais precisar
import Routes from '../../Routes'; // aqui importo as rotas
import React from 'react';

function App() {
  return(

    <BrowserRouter>
       <React.StrictMode>
      <ThemeProvider theme={defaultTheme} >
        <GlobalStyles/>
        <Container>
            <Header/>
            <Routes/>
        </Container>
      </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
