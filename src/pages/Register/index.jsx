
import { useState } from 'react';
import { Envelope, Lock, Eye, EyeSlash } from 'phosphor-react'
import { auth } from "../../services/firebase";
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import "./styles.scss";
import api from '../../api';



export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const [userFirebase, setUser] = useState(null);

  //caso o usuario ja esteja logado na aplicação
  auth.onAuthStateChanged(user => {
    if (user) {
      getFirebase()
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


  const handleClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }

 const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignOut(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  if(user){
    getFirebase()
    return console.log(user)
  }

  
  return (
    <div className="container">

      <div className="primary-field">
        <div className="login">
          <div className="login-logo">
            <h1>Pet Solution</h1>
            <img src="https://gifs.eco.br/wp-content/uploads/2023/05/imagens-de-patinha-de-cachorro-png-2.png"
              alt="Login App"></img>
          </div>

          <div className="login-camp">
            <h1>CADASTRO</h1>
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
        
            <button onClick={handleSignOut} type="submit">
              Cadastrar
            </button>

            <div className="login-inscricao">
              <h4>Você já tem uma conta?</h4>
              <Link to="/" className="link-inscricao">
                Acesse sua conta aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}