/*Compilar con:
g++ -o tu_programa main.cpp ./src/*.cpp -I ./include -static
*/

#include <iostream>
#include "Info.h"
#include <fstream>
using namespace std;

int main(int argc, char *argv[])
{
    // Verificar número de argumentos
    if (argc != 3)
    {
        cerr << "Error: Número incorrecto de argumentos." << endl;
        return 1; // Código de error para número incorrecto de argumentos
    }

    // Cargar y procesar los archivos
    Info informacion;
    if (!informacion.load(argv[1], argv[2]))
    {
        cerr << "Error: No se pudieron cargar los archivos." << endl;
        return 3; // Código de error para fallo al cargar archivos
    }

    // Realizar la intersección y mostrar el resultado
    informacion.interseccion();
    cout << informacion << endl; // Salida del resultado

    return 0; // Éxito
}