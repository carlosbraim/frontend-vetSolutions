import { useState, useEffect } from 'react';
import "./styles.scss";
import { Button, Layout, theme } from "antd";  
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import ToggleThemeButton from "./components/ToggleThemeButton";
import DataTableEdit from "./components/home/DataTable";
import ChartConsultation from "./components/home/report/charts/ChartConsultations";
import Calendar from "./components/Calendar";
import { auth } from "../../services/firebase";
import Perfil from "./components/home/perfil/perfil";
import PerfilUser from "./components/home/perfil/perfilUser";
import api from '../../api';
import Setting from '../Setting/index';
import Consultation from '../Home/components/Consultation/index'
import NewConsultation from '../Home/components/NewConsultation/index'
import PageHome from '../Home/components/pageHome'
import NewPet from './components/NewPet';
import Exercise from'./components/exercise';
import Nutrition from './components/Nutrition';

const { Header, Sider, Footer, Content } = Layout;

export function Home() {
  const [selectedContent, setSelectedContent] = useState('perfil');
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  const logout = () => {
    auth.signOut().then(() => {
      window.location.href = "/";
      sessionStorage.clear()
    }).catch(() => {
      alert('Erro ao fazer logout');
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        const data = {
          "uid": uid,
          "name": displayName,
          "email": email,
          "photoURL": photoURL
        }

        setUser(user);
        console.log(data);
        postAuthentication(data);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);        

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const postAuthentication = async (data) => {
    console.log("Data", data)
    await api.post('user/authentication', data)
      .then(function(response){
        if(response.status == 200){
          console.log("Api executada com sucesso");
          console.log('response', response)          
          sessionStorage.setItem('token', response.data.token)
        }
      }).catch(function(error){
        console.log("Erro ao executar API" + error);
      });
  }

  return (
    <>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className="sidebar"
        >
          <Logo />
          <MenuList darkTheme={darkTheme} onMenuClick={handleMenuClick} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ?
                <MenuUnfoldOutlined className='toggle-FouldOutlined'></MenuUnfoldOutlined> :
                <MenuFoldOutlined className='toggle-Foldlined'></MenuFoldOutlined>}>
            </Button>
            <Button className="btn-logout" onClick={logout}>
              Sair
            </Button>
          </Header>

          <Content
            style={{
              margin: '24px 240px 0',
              overflow: 'initial',
              padding: 24,
              textAlign: 'center',
            }}
          >
      
            {selectedContent === 'home' && (
              <div className="title-Home">
                <h3>Inicio</h3>
                <PageHome />
              </div>
            )}
            {selectedContent === 'perfil' && (
              <div className="title-perfil">
                <h3>Perfil</h3>
                <Perfil />
              </div>
            )}
            {selectedContent === 'perfilUser' && (
              <div className="title-perfilUser">
                <h3>Perfil Usuario</h3>
                <PerfilUser />
              </div>
            )}
            {selectedContent === 'newPet' && (
              <div className="title-newPet">
                <h3>Adicione um novo pet</h3>
                <NewPet />
              </div>
            )}
            {selectedContent === 'exercise' && (
              <div className="title-exercise">
                <h3>Exercício</h3>
                <Exercise />
              </div>
            )}
            {selectedContent === 'nutrition' && (
              <div className="title-nutrition">
                <h3>Nutrição</h3>
                <Nutrition />
              </div>
            )}            
            {selectedContent === 'calendar' && (
              <div className="title-calendar">
                <h3>Calendario</h3>
                <Calendar />
              </div>
            )}
            {selectedContent === 'chartConsultation' && (
              <div className="title-chart-consultation">
                <h3>Consultas</h3>
                <ChartConsultation />
              </div>
            )}
            {selectedContent === 'dataTableEdit' && (
              <div className="title-client">
                <h3>Cliente</h3>
                <DataTableEdit />
              </div>
            )}

            {selectedContent === 'consultation' && (
              <div className="title-consultation">
                <h3>Consultas Cadastradas</h3>
                <Consultation />
              </div>
            )}

            {selectedContent === 'newconsultation' && (
              <div className="title-newconsultation">
                <h3>Novas Consultas</h3>
                <NewConsultation />
              </div>
            )}

            {selectedContent === 'setting' && (
              <div className="title-setting">
                <h3>Configurações</h3>
                <Setting />
              </div>
            )}
            
          </Content>
      
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            PetSolutions© {new Date().getFullYear()} Created by Solutions Pets - LTDA
          </Footer>
        </Layout>
      </Layout>     

    </>
  );
}

export default Home;
