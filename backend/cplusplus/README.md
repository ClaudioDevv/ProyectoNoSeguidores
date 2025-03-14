Explicación del programa en C++.
Este programa recibe dos argumentos, following.json y followers_1.json.
Estos dos archivos los cargamos con la función load utilizando la librería nlohmann.
Los insertamos en dos unordered_set ya que es una estructura implementada con hashing y se inserción y búsqueda es O(1).
Hacemos una búsqueda en la estructura seguidores comprobando que estén los seguidos. El seguido que no esté en seguidores será enviado al vector que se imprimirá.
Por último si no ha habido error se imprime el vector noseguidores.
