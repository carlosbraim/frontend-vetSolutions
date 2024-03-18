import { useState } from 'react';
import { Envelope, Lock, Eye, EyeSlash } from 'phosphor-react'
import { FcGoogle } from "react-icons/fc";
import { Link , useNavigate} from 'react-router-dom';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../../services/firebase'
import './styles.scss'
import api from '../../api';

export function SignIn(){
    const navigate = useNavigate();
    //const [user, setUser] = useState({});

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState("")
    const [userFirebase, setUser] = useState(null);

    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show)    
    }

    //caso o usuario ja esteja logado na aplicação
    auth.onAuthStateChanged(user => {
        if (user) {
            getFirebase()
            sessionStorage.setItem('user',user.uid)
            window.location.href = "/home";
        }
      });

      const postAuthentication = async (data) => {
        console.log("Data", data)
        await api.post('user/authentication', data)
          .then(function(response){
            if(response.status == 200){
              console.log("Api executada com sucesso");
              console.log('response', response)          
              sessionStorage.setItem('token', response.data.token)
            }
          }).catch(function(error){
            console.log("Erro ao executar API" + error);
          });
      }


      const getFirebase = () => {
        const unsubscribe = auth.onAuthStateChanged((userFirebase) => {
          if (userFirebase) {
            const { uid, displayName, email, photoURL } = userFirebase;
            const data = {
              "uid": uid,
              "name": displayName,
              "email": email,
              "photoURL": photoURL
            }
    
            setUser(userFirebase);
            console.log(data);
            postAuthentication(data);
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe();
      };    




    function handleGoogleSignIn(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => { //.then((result) => {
            //setUser(result.user);
            console.log(result.user)
            getFirebase()
            navigate('/home');
            //sucesso
        }).catch((error) => {
            console.log(error);
            //mesagem de erro
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
        getFirebase()
        navigate('/home');
      }

      
  /*/ainda com erro deve ser corrigidos
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
      };      */
    
      /*function recuperarSenha (){
        auth.sendPasswordResetEmail(email).then(resultado => {
            setMsg("Email enviado com sucesso");
        }).catch(error => {
            setMsg("Erro ao recuperar email");
        })
      }*/


      function recoverPassword (){        
        if (email){
            sendResetPasswordEmail(email)
        } else {
            alert("Por favor, preencha o campo de e-mail.");
        }

        async function sendResetPasswordEmail(email) {
            try {
              await sendPasswordResetEmail(auth, email);
              console.log("success")
              alert("Email enviado com sucesso");
              return { error : null};
            } catch (error) {
              console.log(error)
              alert("Erro ao recuperar email", error);
              return { error}
            }
          }
        }
        

      
    
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
                            <span>{msg}</span>
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

