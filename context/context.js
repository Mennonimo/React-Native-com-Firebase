// Importa funções do React para manipular estado, contexto e efeitos colaterais
import { createContext, useContext, useEffect, useState } from "react";

// Importa funções de autenticação do Firebase
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Importa as instâncias de autenticação e banco de dados do Firebase configuradas previamente
import { auth, db } from "../firebaseConfig";

// Importa funções do Firestore para manipular documentos
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Cria um contexto de autenticação que poderá ser usado em outros componentes
export const AuthContext = createContext();

// Componente que fornece os valores de autenticação para os componentes filhos
export const AuthContextProvider = ({children}) => {
    // Estado que guarda os dados do usuário logado
    const [user, setUser] = useState(null);
    
    // Estado que indica se o usuário está autenticado ou não
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    // Efeito que escuta mudanças no estado de autenticação do Firebase
    useEffect(() => {
        // Registra o listener que será disparado sempre que houver mudança de login/logout
        const unsub = onAuthStateChanged(auth, (user) => {
            // console.log('got user: ', user);
            if(user){
                // Se o usuário está logado, atualiza os estados de autenticação
                setIsAuthenticated(true);
                setUser(user);
                // Atualiza os dados adicionais do usuário no estado
                updateUserData(user.uid);
            } else {
                // Se o usuário não está logado, limpa os estados
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        // Remove o listener quando o componente for desmontado
        return unsub;
    }, []);

    // Função que busca os dados adicionais do usuário no Firestore
    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId); // Referência ao documento do usuário
        const docSnap = await getDoc(docRef); // Busca os dados do documento

        if(docSnap.exists()){ // Se o documento existe
            let data = docSnap.data(); // Extrai os dados
            // Atualiza o estado do usuário com as informações adicionais
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    }

    // Função de login com email e senha
    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password); // Faz login
            return { success: true }; // Retorna sucesso
        } catch(e) {
            let msg = e.message;
            // Trata mensagens de erro específicas e retorna mensagem amigável
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/invalid-credential)')) msg='E-mail ou Senha errada'
            return { success: false, msg };
        }
    }

    // Função para logout do usuário
    const logout = async () => {
        try {
            await signOut(auth); // Faz logout
            return { success: true };
        } catch(e) {
            // Retorna erro em caso de falha
            return { success: false, msg: e.message, error: e };
        }
    }

    // Função para registrar um novo usuário
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password); // Cria novo usuário
            console.log('response.user :', response?.user);

            // Cria um documento com dados adicionais no Firestore
            await setDoc(doc(db, "users", response?.user?.uid), {
                username, 
                profileUrl,
                userId: response?.user?.uid
            });

            return { success: true, data: response?.user }; // Retorna sucesso
        } catch(e) {
            let msg = e.message;
            // Trata mensagens de erro específicas e retorna mensagem amigável
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/email-already-in-use)')) msg='Esse e-mail já está em uso'
            return { success: false, msg };
        }
    }

    // Retorna o provider com os dados e funções de autenticação
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
    const value = useContext(AuthContext); // Acessa o contexto

    // Se o hook for usado fora do AuthContextProvider, lança erro
    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value; // Retorna os dados do contexto
}