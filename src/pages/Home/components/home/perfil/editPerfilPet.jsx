import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import api from '../../../../../../src/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importe o locale para português do Brasil

moment.locale('pt-br'); // Defina o locale para português do Brasil

const EditPerfilPet = (dataPet) => {
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

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  
  const onFinish = async (values) => {
    try {
      const data = {
        ...values.pet,
        Uid: sessionStorage.getItem("pet"),
      };
  
      //data.id = idPet;
      await updatePet(data);
    } catch (error) {
      console.log(error);
      notifyErro(); // Notifica erro
    }
  };
  
  const updatePet = async (data) => {
    try {
      data.Id = dataPet.dataPet.Id;
      console.log(data);
      const response = await api.patch(`pet/updatePet`, data);
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
  

  //console.log("dataPet::",dataPet);
  console.log("dataPet.id::",dataPet.dataPet.Id);

  return ( 
  
    <><div style={{ display: 'flex', flexDirection: 'column', marginBottom: '500px', marginLeft: '400px', marginTop: '150px' }}>
    {/* Adiciona um marginLeft de 20px para distanciar da esquerda */}
 
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginBottom: '16px',
      }}
      validateMessages={validateMessages}
    >
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        {/* Adiciona a imagem ao lado de todos os campos */}
        <div style={{ marginRight: '24px', borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }}>
          <img
            src="https://static.vecteezy.com/ti/vetor-gratis/p3/7120890-ilustracao-de-uma-silhueta-de-um-cao-e-gato-vetor.jpg"
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

export default EditPerfilPet;
