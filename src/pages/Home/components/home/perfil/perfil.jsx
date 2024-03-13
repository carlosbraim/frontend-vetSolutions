import { useState, useEffect } from 'react';
import './perfil.scss';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import EditPerfilPet from '../perfil/editPerfilPet'; 
import api from '../../../../../../src/api'
import { auth } from "../../../../../services/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Perfil() {
    const [petDados, setPetDados] = useState([]);
    const [editing, setEditing] = useState(false); // Adiciona o estado 'editing'
    const [idPet, setIdPet] = useState({});
    const notify = () => toast("Sucesso");
    const notifyErro = () => toast.error("Erro");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((pet) => {
            if (pet) {
                const { uid } = pet;
                const data = {
                    "uid": uid
                };
                console.log("Uid para o PET",uid)
                getPet(uid);
            }
        });

        return () => unsubscribe();
    }, []);

    //requisicao
    const getPet = async (uid) => {
        try {
            const response = await api.get(`pet/getPet?uid=${uid}`);
            const data = response.data;
            setPetDados(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (id) => {
        setEditing(true);
        setIdPet(id);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    if (editing) {
        return <EditPerfilPet dataPet={idPet} onCancelEdit={handleCancelEdit} />;
    } 

    const updatePetAtivo = async (data) => {
      try {  
        console.log("data updateAtivo 3",data);
        const response = await api.patch(`pet/updatePetAtivo`, data);
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
    

    return (
        <div>
          {petDados.map((petDados, index) => (       
            <div key={index} className="container-perfil">              
              <div className="header">
                <div>
                  <h1>{petDados?.Nome}</h1>
                  <div className='BtnEdit'>
                    <EditOutlined onClick={() => handleEditClick(petDados)}/>      
                    <CloseOutlined onClick={()=> updatePetAtivo(petDados)}/>   
                    <ToastContainer />
                  </div>
                  <h2>{petDados?.Descricao}</h2>
                </div>    
                <img
                  className='imgPerfilPet'
                  src={petDados?.PhotoUrl}
                  width={310}
                  height={310}
                />
              </div>
              <div className="infos">              
                <ul>
                  <li>
                    <h3>Dados do meu pet</h3>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>Idade:</strong> {petDados?.Idade} </p>
                  </li>
                  <li>
                    <p><strong>Raça:</strong> {petDados?.Raca}</p>
                  </li>
                  <li>
                    <p><strong>Peso:</strong> {petDados?.Peso}</p>
                  </li>
                  <li>
                    <p><strong>Ultima consulta:</strong> {petDados?.UltimaConsulta} </p>
                  </li>
                  <li>
                    <p><strong>Obs.:</strong> {petDados?.Obs} </p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      );
}

export default Perfil;
