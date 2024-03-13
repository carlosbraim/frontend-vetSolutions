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

const NewConsultation = () => {
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
        ...values.pet,     
        uid_dadosusuario_fk: decoded.uid,
      }; 
      await postConsultation(data);
    } catch (error) {
      console.log(error);
      notifyErro(); // Notifica erro
    }
  };
  
  const postConsultation = async (data) => {
    console.log("nova consulta",data)
    await api.post('pet/newConsultation', data)
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
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '500px', marginLeft: '400px', marginTop: '150px' }}>
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
          <div style={{ marginRight: '24px', borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1004/1004759.png"
              alt="Imagem Ilustrativa"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
          <Form.Item
            name={['pet', 'NomePet']}
            label="Nome do pet"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name={['pet', 'DataConsulta']}
            label="Data Consulta"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item
            name={['pet', 'DataRetorno']}
            label="Data Retorno"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item
            name={['pet', 'Tratamento']}
            label="Recebeu algum tratamento?"
            rules={[{ required: true, message: 'Por favor, selecione uma opção de tratamento!' }]}
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Sim</Radio>
                <Radio value={2}>Não</Radio>
            </Radio.Group>
            </Form.Item>

            {value === 1 && (
            <Form.Item
                name={['pet', 'QualTratamento']}
                label="Qual tratamento?"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                style={{ marginBottom: '8px' }}
            >
                <Input.TextArea />
            </Form.Item>
            )}

            <Form.Item
            name={['pet', 'Exame']}
            label="Exames"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <Input.TextArea />
            </Form.Item>

            <Form.Item
            name={['pet', 'Prescricao']}
            label="Prescrição"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: '8px' }}
            >
            <Input.TextArea />
            </Form.Item>

            <Form.Item
            name={['pet', 'Obsercacao']}
            label="Observações"
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

export default NewConsultation;
