// importa componentes essenciais do React Native para estrutura da interface do usuário
import { View, Text } from 'react-native'
// Importa React e o hook useEffect para gerenciar efeitos colaterais no ciclo de vida do componente
import React, { useEffect } from 'react'
// Importa Slot para renderizar o conteúdo da rota atual, useRouter para navegação e useSegements para monitorar segmentos da rota
import { Slot, useRouter, useSegments } from 'expo-router';
// Importa o arquivo de estilo global(CSS) para estilizar o aplicativo
import "../global.css";
// Importa o contexto de autenticação e o provider para gerenciar o estado de autenticação no aplicativo
import { AuthContextProvider, useAuth } from '../context/authContext';
// Importa MenuProvider para fornecer suporte a menus pop-up em todo aplicativo
import { MenuProvider } from 'react-native-popup-menu';

// Componente principal que gerencia a navegação e autenticação do usuário

const MainLayout = () => {
    // Obtém o estado de autenticação do usuário a partir do contexto de autenticação
    const { isAuthenticated } = useAuth();
    // Obtem os segmentos de rotas atuais
    const segments = useSegments();
    // hook para navegação entre rotas 
    const router = useRouter();

    //useEffect que é executado sempre que o estado de autenticação muda
    useEffect(() => {
        // Verifica se o estado de autenticação está indefinido
        if (typeof isAuthenticated == 'undefined') return;

        // Verifica se o estado dele está em uma rota dentro da aplicação (app)
        const inApp = segments[0] == '(app)';

        // Se o usuário está atutneticado e não está em uma rota dentro da aplicação, redireciona para a rota 'home'
        if (sAuthenticated && !inApp) {
            router.replace('home');
        }
        //se o usuário não está autenticado, redireciona para rota de login (signIn)
        else if (isAuthenticated ==  false)
        router.replace('signIn');

    }, [isAutehnticated]) // Hook é executado novamente se 'isAuthenticated' mudar

    // Retorna o Slot, que renderiza a rota ativa com base no roteamento do expo router
    return <Slot />
}

// Componente raiz que envolve o aplicativo com provedores de contexto
export default function RootLayout() {
    return (
        // MenuProvider oferece suporte a menus pop-up em todo o aplicativo
        <MenuProvider>
            {/*AuthcontextProvider oferece o contexto de autenticação para todo o aplicativo*/}
            <AuthContextProvider>
                {/* MainLayout gerencia a navegação baseada na autenticação*/}
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}