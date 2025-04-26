# React-Native-com-Firebase

## Análise de código e refatoração

- ### context.js
Em context possui funções básicas para servir para o sistema de autentícação, analisando se o usuário está logado ao iniciar a tela, se há dados adicionais armazenados em relação a o usuário e vai retornar como contesto para as outras telas usarem como validaçào.
Necessariamente não possuis funções necessárias para refatorar diretamente, já que suas funçòes não mexem conectivamente com interface, loopings e etc. E sim mexem com funções centradas na lógica da autenticação.

- ### ChatList.js
No ChatList isso tem um probleminha com relação a definição da key no keyExtractor onde a definição dela está ocorrendo por math.random() onde nào é necessariamente a opção mais viável, podendo ser algo mais bem solido pra chave e não um número aleatório

`keyExtractor={item => item.id.toString()}`

Outra observação é no `noBorder` onde a função dentro está como: `index + 1 == users.length` porém o mais correto ou melhor implementado seria:
`noBorder={index == isers.lenght - 1}`

- ### ChatRoomHeader.js
Nesse código algo que poderia ser feito para ficar mais legível e mais usável para situações futuras seria a separação do headerLeft e o headerRight para funções fora do ChatRoomHeader onde podem futuramente talvez serem usadas em outras partes do código e serem mais fáceis de ler.
```
function HeaderLeft({ user, router }) {
  return (
    <View className="flex-row items-center gap-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
      </TouchableOpacity>
      <View className="flex-row items-center gap-3">
        <Image
          source={user?.profileUrl}
          style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
        />
        <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-medium">
          {user?.username}
        </Text>
      </View>
    </View>
  );
}

function HeaderRight() {
  return (
    <View className="flex-row items-center gap-8">
      <Ionicons name="call" size={hp(2.8)} color="#737373" />
      <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
    </View>
  );
}
```


- ### CustomMenuItems.js
Nesse CustomMenuItems um grande problema encontrado foi a mistura do style junto de Tailwind onde há o uso misturado de ambos porém com um style isolado tentando sobrepor o tailwind.
No campo

`<Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">`.

Tailwind/NativeWind aplica estilos com otimizações internas. Quando você usa style={{}}, você sai desse sistema e com isso pode surgir problemas como:
- Perder cache e otimizações do Tailwind/NativeWind a qual o próprio faz.
- Podea acabar gerando um layout inconsistente em diferentes dispositivos.

Um dos principais motivos também é o conflito de styles entre o style={{}} e usando o tailwind. O tailwind pode acabar tendo suas próprias confgurações as quais podem ser adaptadas melhor usando ele do que configurando diretamente nele.
Casos assim são salvos em situações onde é realmente necessária a customização por conta própria e de maneira separada pelo style.

Para ficar mais legivel em relação ao tailwind e poder ser reutilizado esse mesmo estilo em outras telas oque pode ser feito é separar o style e ao invés de colocar o estilo diretamente na View, Component, o correto é colocar em um styleSheet e depois aplicar toda vez que necessário.
Como nesse exemplo:
```
const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.7),
  },
});
```

Assim chamando dessa forma no código:

`<Text style={styles.text} className="font-semibold text-neutral-600">`
