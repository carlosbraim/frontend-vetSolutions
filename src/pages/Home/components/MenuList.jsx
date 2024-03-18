import React from 'react';
import { Menu } from 'antd';
import { 
  HomeOutlined,
  AppstoreOutlined, 
  AreaChartOutlined, 
  UserOutlined, 
  SettingOutlined,
  BarsOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  PlusOutlined
} from '@ant-design/icons';

import {jwtDecode} from 'jwt-decode';


const MenuList = ({ darkTheme, onMenuClick }) => {
  const handleClick = ({ key }) => {
    onMenuClick(key);
  };

  let token;
  let decoded;
  const infoUser = () =>{
    token = sessionStorage.getItem('token');
    if (token) {
      try {
        decoded = jwtDecode(token)
      } catch (ex) {
         console.log("Nao possui dados")
      }
    }
  }
  infoUser();

  return (
    <Menu 
      theme={darkTheme ? 'dark' : 'light'} 
      mode="inline" 
      className="menu-bar"
      onClick={handleClick} // Adiciona a função de clique
    >
      <Menu.Item key="home" icon={<HomeOutlined/>}>
        Home
      </Menu.Item>
      

      <Menu.SubMenu 
        key='tasks-pet' 
        icon={<AppstoreOutlined></AppstoreOutlined>} 
        title="Meus Pets"
      >
        <Menu.Item key="perfil" icon={<AppstoreOutlined/>}>
          Perfil Pet
        </Menu.Item>
        <Menu.Item key="newPet" icon={<PlusOutlined />}>
          Novo Pet
        </Menu.Item>
        
      </Menu.SubMenu>
      {decoded && decoded.typeUser === 2 ?  
        <Menu.SubMenu 
          key='tasks-clientes' 
          icon={<AppstoreOutlined></AppstoreOutlined>} 
          title="Clientes"
        >
          <Menu.Item key="listClient" icon={<AppstoreOutlined/>}>
            Lista Cliente
          </Menu.Item>
          <Menu.Item key="newClient" icon={<PlusOutlined />}>
            Cliente
          </Menu.Item>          
        </Menu.SubMenu>
        : null
      }

      <Menu.SubMenu 
        key='tasks' 
        icon={<BarsOutlined></BarsOutlined>} 
        title="Atividades"
      >
        <Menu.Item key="consultation" icon={<MedicineBoxOutlined />}>
          Consultas
        </Menu.Item>
        <Menu.Item key="newconsultation" icon={<PlusOutlined />}>
        Consulta
        </Menu.Item>        
        <Menu.SubMenu key="subtasks" title="Prescrição">
          <Menu.Item key="exercise">Exercício</Menu.Item>
          <Menu.Item key="nutrition">Nutrição</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>

      {decoded && decoded.typeUser === 2 ?  
        <Menu.Item key="chartConsultation" icon={<AreaChartOutlined/>}>
          Dashboard
        </Menu.Item>
        : null
      }

      <Menu.Item key="calendar" icon={<CalendarOutlined/>}>
        Calendario
      </Menu.Item>
      <Menu.Item key="perfilUser" icon={<UserOutlined />}>
        Perfil User
      </Menu.Item>
      <Menu.Item key="setting" icon={<SettingOutlined/>}>
        Configuração
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
