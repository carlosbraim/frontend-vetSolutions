import { useState } from 'react';
import './styles.scss'
import EditPerfilUser from '../Home/components/home/perfil/editPerfilUser';

export function Setting(){
    
    

    const [editing, setEditing] = useState(false); // Adiciona o estado 'editing'
    
    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    if (editing) {
        return <EditPerfilUser onCancelEdit={handleCancelEdit} />;
    }

    return (
      
        <div className="primary-field-setting">
            <div className="setting">                  
                    <div className="setting-camp">
                         

                        <div className="box-container-setting">
                            <p className="box-text-setting">Aqui, você tem total controle sobre suas informações pessoais. Sinta-se à vontade para fazer as alterações necessárias e personalizar conforme suas preferências.</p>
                            <div className='img-perfil-user-setting'>
                                    <button className='transparent-button' onClick={handleEditClick}>
                                        <img
                                            className='imgPerfilPet'
                                            src="https://static.thenounproject.com/png/638636-200.png"
                                            alt="Perfil Usuario"
                                            width={150}
                                            height={150}
                                        />
                                    </button>
                                    <p>Perfil Usuario</p>
                                </div>                           
                        </div>                                      
                    </div>            
                </div>
        </div> 
    )    
}


export default Setting;