// Importa os componentes necessários do React Native
import { View, Text, TouchableOpacity } from 'react-native' // Importa componentes essenciais para layout e interação com o usuário

// Importa o React, necessário para criar componentes no React Native
import React from 'react' // Importa o React para construir o componente ChatRoomHeader

// Importa a funcionalidade de navegação da biblioteca expo-router
import { Stack } from 'expo-router' // Importa o componente Stack para configurar a navegação de telas dentro de um stack (pilha)

// Importa ícones das bibliotecas Entypo e Ionicons para uso no cabeçalho
import { Entypo, Ionicons } from '@expo/vector-icons' // Importa ícones para serem usados nos botões de navegação e chamadas

// Importa funções para adaptar os tamanhos de tela com base na porcentagem da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Para tornar o layout responsivo, adaptando aos tamanhos da tela

// Importa o componente Image da biblioteca expo-image para renderizar imagens de maneira otimizada
import { Image } from 'expo-image'; // Importa o componente de imagem otimizado para desempenho

// Função que representa o cabeçalho da tela de chat, recebendo o usuário e o roteador como props
export default function ChatRoomHeader({user, router}) {
  return (
    // Configura as opções do cabeçalho da tela usando o componente Stack.Screen
    <Stack.Screen
        options={{
            title: '', // Título do cabeçalho (aqui está vazio)
            headerShadowVisible: false, // Desativa a sombra do cabeçalho
            // Define o conteúdo do lado esquerdo do cabeçalho
            headerLeft: () => (
                <View className="flex-row items-center gap-4"> {/* Contêiner para os itens à esquerda do cabeçalho, com espaçamento entre os itens */}
                    <TouchableOpacity onPress={() => router.back()}> {/* Botão para voltar à tela anterior */}
                        <Entypo name="chevron-left" size={hp(4)} color="#737373" /> {/* Ícone de seta para a esquerda (voltar) */}
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3"> {/* Contêiner para o avatar do usuário e nome */}
                        <Image 
                            source={user?.profileUrl} // A URL da imagem do perfil do usuário (se existir)
                            style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}} // Estilos para a imagem (altura proporcional, aspecto quadrado e borda arredondada)
                        />
                        <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium"> {/* Exibe o nome do usuário com estilo */}
                            {user?.username} {/* Exibe o nome do usuário (se existir) */}
                        </Text>
                    </View>
                </View>
            ),
            // Define o conteúdo do lado direito do cabeçalho
            headerRight: () => (
                <View className="flex-row items-center gap-8"> {/* Contêiner para os ícones à direita do cabeçalho */}
                    <Ionicons name="call" size={hp(2.8)} color={'#737373'} /> {/* Ícone de chamada */}
                    <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} /> {/* Ícone de videocam */}
                </View>
            )
        }}
    />
  )
}
