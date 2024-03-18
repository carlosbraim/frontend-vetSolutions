import './perfilUser.scss'
import api from '../../../../../../src/api'
import { useState, useEffect } from 'react';
import { auth } from "../../../../../services/firebase";
import EditPerfilUser from '../perfil/editPerfilUser';
import { EditOutlined } from '@ant-design/icons'

function PerfilUser() {
    const [userDados, setUserDados] = useState(null);
    const [editing, setEditing] = useState(false); // Adiciona o estado 'editing'

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid } = user;
                const data = {
                    "uid": uid
                };

                getUser(uid);
            } else {
                setUserDados(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const getUser = async (uid) => {
        try {
            const response = await api.get(`user/getUser?uid=${uid}`);
            const data = response.data;
            setUserDados(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    // Aqui você pode adicionar mais lógica para navegar de volta à página de perfil se necessário
    const handleCancelEdit = () => {
        setEditing(false);
    };

    if (editing) {
        return (
            <EditPerfilUser onCancelEdit={handleCancelEdit} />
        );
    }

    return (
        <div className="container-perfilUser">
            <div className="header">
                <img className='imgPerfilUser' src={userDados?.PhotoURL}
                    width={100}
                    height={100}
                />
            </div>
            <div className="infosUser">
                <div>
                    <h1>Perfil</h1>
                    <div className='BtnEdit'>
                        <EditOutlined onClick={handleEditClick} />
                    </div>
                    <h2>Foto </h2>
                </div>
                <ul>
                    <li>
                        <h3>Dados do Usuario</h3>
                    </li>
                    <br></br>
                    <li>
                        <p><strong>Nome:</strong>{userDados?.Nome}</p>
                    </li>
                    <li>
                        <p><strong>Email:</strong> {userDados?.Email}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PerfilUser;
