import React from 'react';
import { Button, Form, Input } from 'antd';
import api from '../../../../../../src/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  },
};

const onFinish = async (values) => {
  try {
    const data = {
      ...values.user,
      Uid: sessionStorage.getItem("user"),
    };

    await updateUser(data);
  } catch (error) {
    console.log(error);
    notifyErro(); // Notifica erro
  }
};

const updateUser = async (data) => {
  try {
    const response = await api.patch(`user/updateUser`, data);
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

const EditPerfilUser = () => (
  <div className='editPerfilUser' style={{height : '100%'}}>
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
        <div style={{ marginRight: '24px', overflow: 'hidden', width: '150px', height: '150px', borderRadius: '50%', border: '1px solid #ddd'  }}>
          <img
            src="https://static.thenounproject.com/png/638636-200.png"
            alt="Imagem Ilustrativa"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <Form.Item
            name={['user', 'Nome']}
            label="Nome"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'Email']}
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'photoURL']}
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
  </div>
);

export default EditPerfilUser;
