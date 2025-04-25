// Importa os componentes necessários do React Native
import { Text, View } from 'react-native'; // Importa componentes de texto e layout do React Native

// Importa o MenuOption da biblioteca react-native-popup-menu para criar opções de menu
import { MenuOption } from 'react-native-popup-menu'; // Importa o componente MenuOption que cria uma opção dentro de um menu pop-up

// Importa funções para adaptar os tamanhos de tela com base na porcentagem da tela 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Utiliza funções para tornar o layout responsivo com base na largura e altura da tela

// Define o componente MenuItem, que recebe texto, ação, valor e ícone como props
export const MenuItem = ({ text, action, value, icon }) => {
    return (
        // Componente MenuOption que cria uma opção no menu e executa a ação quando selecionado
        <MenuOption onSelect={() => action(value)}>
            {/* Contêiner para o item de menu com padding e alinhamento de itens */}
            <View className="px-4 py-1 flex-row justify-between items-center">
                {/* Exibe o texto do item de menu, com estilo responsivo e texto em negrito */}
                <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">
                    {text} {/* O texto do item passado como prop */}
                </Text>
                {/* Exibe o ícone se fornecido */}
                {icon} {/* O ícone do item, se fornecido como prop */}
            </View>
        </MenuOption>
    );
}
