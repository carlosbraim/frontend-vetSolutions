import { useState } from 'react';
import { Envelope, Lock, Eye, EyeSlash } from 'phosphor-react'
import { FcGoogle } from "react-icons/fc";
import { Link , useNavigate} from 'react-router-dom';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../../services/firebase'
import './styles.scss'

export function SignIn(){
    const navigate = useNavigate();
    //const [user, setUser] = useState({});

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show)    
    }

    //caso o usuario ja esteja logado na aplicação
    auth.onAuthStateChanged(user => {
        if (user) {
            sessionStorage.setItem('user',user.uid)
            window.location.href = "/home";
        }
      });

    function handleGoogleSignIn(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(() => { //.then((result) => {
            //setUser(result.user);
            navigate('/home');
    
        }).catch((error) => {
            console.log(error);
        });
    }

    const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

    function handleSignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
      }

      if (loading) {
        return <p>carregando...</p>;
      }
      if (user) {
        navigate('/home');
      }

      
  //ainda com erro deve ser corrigidos
      const recoverPassword = () => {
        if (email) {
          auth.sendPasswordResetEmail(email)
            .then(() => {
              alert("Email enviado com sucesso");
            })
            .catch((error) => {
              alert("Erro ao recuperar email", error);
            });
        } else {
          alert("Por favor, preencha o campo de e-mail.");
        }
      };      
    

    
    return (
        <div className="container-signin">        
            <div className="primary-field-signin">
                <div className="login">
                    <div className="login-logo">
                    <h1>Pet Solution</h1> 
                    <img src="https://gifs.eco.br/wp-content/uploads/2023/05/imagens-de-patinha-de-cachorro-png-2.png"
                        alt="Login App"></img>
                    </div>

                    <div className="login-camp">
                        <h1>LOGIN</h1>  
                        <div className="login-input-email">
                            <Envelope></Envelope>
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"   
                                value={email}      
                                onChange={e => setEmail(e.target.value)}                   
                            ></input>
                        </div>

                        <div className="login-input-password">
                            <Lock></Lock>
                            <input                                
                                    placeholder="Digite sua senha"    
                                    type={show ? "text" : "password"}
                                    value={password}      
                                    onChange={e => setPassword(e.target.value)}                         
                            ></input>     
                            <div className="login-eye">
                                {show ? (
                                    <Eye
                                        size={20}
                                        onClick={handleClick}
                                    ></Eye>
                                ) : (
                                    <EyeSlash
                                        size={20}
                                        onClick={handleClick}
                                    ></EyeSlash>
                                )}
                            </div>                   
                        </div>
                        <div className="remember">
                            <label>
                                <input type="checkbox"/> Salvar E-mail?
                            </label>
                            <a href="#" onClick={recoverPassword}>Esqueceu a Senha?</a>
                        </div>
                        <button type="submit"onClick={handleSignIn}>
                            Entrar
                        </button>
                        
                        <div className="login-inscricao">
                            <h4>Não tem uma conta?</h4>
                            <Link to="/register" className="link-inscricao">
                                Inscrever-se
                            </Link>
                        </div>

                        <div className="login-google">
                            <h4>Logar Com</h4>
                            <button type="button" className="button" onClick={handleGoogleSignIn}>
                                <FcGoogle />                        
                            </button> 
                        </div>                       
                    </div>
                </div>  
            </div>        
        </div>        
    )    
}

