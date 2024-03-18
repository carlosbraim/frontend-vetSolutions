import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Radio } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importe o locale para português do Brasil
import './styles.scss';


import {jwtDecode} from 'jwt-decode';
import api from '../../../../api';

moment.locale('pt-br'); // Defina o locale para português do Brasil

const NewClient = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const notify = () => toast("Sucesso");
  const notifyErro = () => toast.error("Erro");

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
        ...values.user,     
        uid_dadosusuario_fk: decoded.uid,
      }; 
      await postClient(data);
    } catch (error) {
      console.log(error);
      notifyErro(); // Notifica erro
    }
  };
  
  const postClient = async (data) => {
    console.log("nova consulta",data)
    await api.post('client/newClient', data)
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
    <div className='newClient-div' style={{height : '100%'}}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{  overflow: 'hidden', width: '200px', height: '200px' }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3447/3447545.png"
              alt="Imagem Ilustrativa"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
          <Form.Item
            name={['user', 'Nome']}
            label="Nome"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name={['user', 'DataNascimento']}
            label="Data Nascimento"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>           

          

            {value === 1 && (
            <Form.Item
                name={['user', 'Endereco']}
                label="Endereço?"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                style={{ marginBottom: '8px' }}
            >
                <Input.TextArea />
            </Form.Item>
            )}

            <Form.Item
            name={['user', 'Telefone']}
            label="Telefone"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <Input.TextArea />
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
    </div>
  );
};

export default NewClient;
