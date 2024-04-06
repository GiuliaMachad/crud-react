import "./index.css";
import { useState } from "react";
import Swal from "sweetalert2";
import usuarioService from "../../services/usuario-service";

function Login(){
    
    const [email, setEmail] = useState("admin@admin.com");
    const [senha, setSenha] = useState("123456");

    const autenticar = () => {
        if(!email || !senha){
           Swal.fire({
            icon: 'error',
            text: "Os campos de e-mail e senha são obrigatórios, verifique!"
           });
        };

        usuarioService
        .autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            window.location = "/";
        })
        .catch(erro => {
            Swal.fire({
                icon: 'error',
                text: "Erro ao realizar a conexão de usuario!"
               });
        });
    };

    return (
    <div className="caixa-login"> 
    <div className="titulo-login">
        <h1>Login</h1>
    </div>

    <div className="grupo">
        <label for="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}  type="text" id="email" placeholder="Digite seu email"/>
    </div>

    <div className="grupo">
        <label for="senha">Senha</label>
        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" id="senha" placeholder="Digite sua senha"/>
    </div>

    <div className="esqueci-minha-senha">
        <a href="#">Esqueci minha senha</a>
    </div>

    <button id="btn-entrar" onClick={autenticar}>Entrar</button> 
</div>
 )
}

export default Login;