import React, { } from 'react';
import './styles.scss'

export function Nutrition(){

    return (
        <div className="container-nutrition">        
        <p className='p-nutrition'>Bem-vindo à <strong>NOVA</strong> prescrição do seu veterinário para seus Pet!</p>
            <div className="primary-field-nutrition">
            <div className="infos-nutrition">              
                <ul>
                  <br></br>
                  <li>
                    <p><strong>1:</strong> Ração de Qualidade Premium </p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>2:</strong> Proteínas Magras </p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>3:</strong> Vegetais Frescos</p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>4:</strong> Frutas Moderadas </p>
                  </li>
                  <br></br>
                  <li>
                    <p><strong>5:</strong> Suplementos Nutricionais </p>
                  </li>
                  <br></br>
                </ul>
            </div>       
            </div>        
        </div>        
    )    
}
export default Nutrition;
