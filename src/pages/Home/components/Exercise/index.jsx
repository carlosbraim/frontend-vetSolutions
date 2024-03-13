import React, { } from 'react';
import './styles.scss'

export function Exercise(){

    return (


        <div className="container-exercise">        
        <p className='p-exercise'>Bem-vindo à recomendação de <strong>EXERCÍCIOS</strong> do seu veterinário para seus Pet!</p>
            <div className="primary-field-exercise">
            <div className="infos-exercise">              
                <ul>
                  <br></br>
                  <li>
                    <p><strong>1:</strong> Caminhadas ao Ar Livre </p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>2:</strong> Sessões de Brincadeiras Interativas </p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>3:</strong> Treinamento de Truques e Comandos</p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>4:</strong> Sessões de Carinho e Escovação </p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>5:</strong> Passeios de Carro </p>
                  </li>
                  <br></br>
                </ul>
            </div>        
            </div>        
        </div>        
    )    
}
export default Exercise;
