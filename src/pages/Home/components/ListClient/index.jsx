import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import api from '../../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import EditClient from './editClient';
import { auth } from "../../../../../src/services/firebase";

const   ListClient = () => {

  const [clientDados, setListClientDados] = useState([]);
  const [editing, setEditing] = useState(false); // Adiciona o estado 'editing'
  const [idClient, setIdClient] = useState({});
  const notify = () => toast("Sucesso");
  const notifyErro = () => toast.error("Erro");


 
  const handleEditClick = (id) => {
    setEditing(true);
    setIdClient(id);
};

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((client) => {
      if (client) {
          const { uid } = client;
          const data = {
              "uid": uid
          };
          console.log("Uid para o Client",uid)
          getListClient(uid);
      }
  });

  return () => unsubscribe();
}, []);

const handleCancelEdit = () => {
    setEditing(false);
};

if (editing) {
    return <EditClient dataClient={idClient} onCancelEdit={handleCancelEdit} />;
}




//requisicao
const getListClient = async (uid) => {
  try {
      const response = await api.get(`client/getClient?uid=${uid}`);
      const data = response.data;
      setListClientDados(data);
  } catch (error) {
      console.log(error);
  }
};


const updateClientAtivo = async (data) => {
  try {  
    console.log("data updateAtivo 3",data);
    const response = await api.patch(`client/updateClientAtivo`, data);
    console.log(response);
    // Verifica se a atualização foi bem-sucedida
    if (response.status === 200) {
      notify(); // Notifica sucesso
      
    } else {
      notifyErro(); // Notifica erro
    }
    console.log("Apos response data: ",data);
  } catch (error) {
    console.log(error);
    notifyErro(); // Notifica erro
  }
};
  
function formatDate(dateString) {
  const dateObject = new Date(dateString); // Parse the date string into a Date object
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();

  return `${day}/${month}/${year}`;
}

return (
    <div>
      {clientDados.map((clientDados, index) => ( 
        <div key={index} className="container-client-list">
          <div className="container-img-client">    
            <img
              className='img-client'
              src={'https://cdn-icons-png.flaticon.com/512/15/15656.png'}
              width={250}
              height={250}
            />
          </div>
          <div className="infos-client">
            <ul>
              <li>
                <h3>Dados Cliente:</h3>
              </li>
              <br></br><br></br><br></br><br></br><br></br><br></br>
              <li>
                <p><strong>Nome: </strong> {clientDados?.Nome} </p>
              </li>
              <br></br><br></br><br></br><br></br><br></br><br></br>
              <li>
                <p><strong>Data Nascimento: </strong> {formatDate(clientDados?.DataNascimento)} </p>
              </li>
              <br></br><br></br><br></br><br></br><br></br><br></br>
              <li>
                <p><strong>Endereço: </strong>{clientDados?.Endereco} </p>
              </li>  
              <br></br><br></br><br></br><br></br><br></br><br></br>
              <li>
                <p><strong>Telefone: </strong>{clientDados?.Telefone} </p>
              </li>  
              <br></br><br></br><br></br><br></br><br></br><br></br>  
            </ul> 
            <EditOutlined onClick={() => handleEditClick(clientDados)}/>  
            <CloseOutlined onClick={()=> updateClientAtivo(clientDados)}/> 
            <ToastContainer />
          </div>
        </div>   
        ))}     
    </div>
  );
}

export default ListClient;
