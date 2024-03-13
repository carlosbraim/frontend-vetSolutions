import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import api from '../../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import EditConsultation from './editConsultation';
import { auth } from "../../../../../src/services/firebase";

const Consultation = () => {

  const [cunsltationDados, setConsultationDados] = useState([]);
  const [editing, setEditing] = useState(false); // Adiciona o estado 'editing'
  const [idConsultation, setIdConsultation] = useState({});
  const notify = () => toast("Sucesso");
  const notifyErro = () => toast.error("Erro");


 
  const handleEditClick = (id) => {
    setEditing(true);
    setIdConsultation(id);
};

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((consultation) => {
      if (consultation) {
          const { uid } = consultation;
          const data = {
              "uid": uid
          };
          console.log("Uid para o Condulta",uid)
          getConsultation(uid);
      }
  });

  return () => unsubscribe();
}, []);

const handleCancelEdit = () => {
    setEditing(false);
};

if (editing) {
    return <EditConsultation dataPet={idConsultation} onCancelEdit={handleCancelEdit} />;
}




//requisicao
const getConsultation = async (uid) => {
  try {
      const response = await api.get(`pet/getConsultation?uid=${uid}`);
      const data = response.data;
      setConsultationDados(data);
  } catch (error) {
      console.log(error);
  }
};


const updateConsultationAtivo = async (data) => {
  try {  
    console.log("data updateAtivo 3",data);
    const response = await api.patch(`pet/updateConsultationAtivo`, data);
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
      {cunsltationDados.map((cunsltationDados, index) => ( 
        <div key={index} className="container-consultation-list">
          <div className="container-img-consultation">    
            <img
              className='img-consultation'
              src={'https://cdn-icons-png.flaticon.com/512/87/87971.png'}
              width={310}
              height={310}
            />
          </div>
          <div className="infos-consultation">
            <ul>
              <li>
                <h3>Consulta realizada!</h3>
              </li>
              <br></br>
              <li>
                <p><strong>Nome:</strong> {cunsltationDados?.NomePet} </p>
              </li>
              <li>
                <p><strong>Data Consulta:</strong> {cunsltationDados?.DataConsulta} </p>
              </li>
              <li>
                <p><strong>Data Retorno:</strong>{cunsltationDados?.DataRetorno} </p>
              </li>
              <li>
                <p><strong>Tratamento:</strong> {cunsltationDados?.Tratamento} </p>
              </li>
              <li>
                <p><strong>Detalhe tratamento:</strong> {cunsltationDados?.QualTratamento} </p>
              </li>
              <li>
                <p><strong>Exames</strong> {cunsltationDados?.Exame} </p>
              </li>
              <li>
                <p><strong>Prescrição:</strong> {cunsltationDados?.Prescricao}  </p>
              </li>
              <li>
                <p><strong>Obs.:</strong> {cunsltationDados?.Obsercacao} </p>
              </li>
            </ul> 
            <EditOutlined onClick={() => handleEditClick(cunsltationDados)}/>  
            <CloseOutlined onClick={()=> updateConsultationAtivo(cunsltationDados)}/> 
            <ToastContainer />
          </div>
        </div>   
        ))}     
    </div>
  );
}

export default Consultation;
