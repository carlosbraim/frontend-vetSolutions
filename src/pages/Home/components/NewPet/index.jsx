import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importe o locale para português do Brasil
import api from '../../../../api';
import {jwtDecode} from 'jwt-decode';

moment.locale('pt-br'); // Defina o locale para português do Brasil

const NewPet = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const notify = () => toast("Sucesso");
  const notifyErro = () => toast.error("Erro");
/*
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };*/
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

  const onFinish = async (values) => {
    try {
      const data = {
        ...values.pet,     
        uid_dadosusuario_fk: decoded.uid,
      }; 
      await postPet(data);
    } catch (error) {
      console.log(error);
      notifyErro(); // Notifica erro
    }
  };

 
  
  const postPet = async (data) => {
    console.log("novo pet",data)
    await api.post('pet/newPet', data)
      .then(function(response){
        if(response.status == 200){
          notify(); // Notifica sucesso
          console.log("Api executada com sucesso");
          console.log('response', response)          
          sessionStorage.setItem('token', response.data.token)
        }
      }).catch(function(error){
        console.log("Erro ao executar API" + error);
        notifyErro(); // Notifica erro
      });
  }

  return ( 
  
    <><div className='newPet-div' style={{height : '100%'}}>
    {/* Adiciona um marginLeft de 20px para distanciar da esquerda */}
 
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginBottom: '16px',
      }}

    >
      <div style={{ display: 'flex', marginBottom: '16px'}}>
        {/* Adiciona a imagem ao lado de todos os campos */}
        <div style={{ marginRight: '24px', borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }}>
          <img
            src="https://media.istockphoto.com/id/1485380292/vector/dog-pet-puppy-doggy-cute-animal-medical-sign-health-care-medicine-plus-addition-vector.jpg?s=612x612&w=0&k=20&c=qMuA0hj3MxEY46xdnkysy3vSDTwzKZ40LkiMXSUvZDk="
            alt="Imagem Ilustrativa"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Adiciona todos os campos de edição */}
        <div>
          <Form.Item
            name={['pet', 'Nome']}
            label="Nome"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['pet', 'Idade']}
            label="Idade"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['pet', 'DataNascimento']}
            label="Data de Nascimento"
            labelCol={{ span: 13 }}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name={['pet', 'Descricao']}
            label="Descrição"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name={['pet', 'Peso']}
            label="Peso"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['pet', 'Raca']}
            label="Raça"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['pet', 'UltimaConsulta']}
            label="Última Consulta"
            labelCol={{ span: 10 }}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name={['pet', 'PhotoUrl']}
            label="URL da Foto"
          >
            <Input />
          </Form.Item>
        </div>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
          <ToastContainer/>
        </Button>
      </Form.Item>
    </Form>
    
  </div></>
  )
  };

export default NewPet;
