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

- ### ChatRoomHeader
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
Nesse CustomMenuItems um grande problema encontrado foi a mistura do style junto de Tailwind
