/*Compilar con:
g++ -o tu_programa main.cpp ./src/*.cpp -I ./include -static
*/

#include <iostream>
#include "Info.h"
#include <fstream>
using namespace std;

int main(int argc, char *argv[])
{
    // Comprobar número de argumentos, error nº1
    if (argc != 3)
    {
        cerr << "Error: Número incorrecto de argumentos." << endl;
        return 1;
    }

    Info informacion;

    // Cargar los archivos, error nº3
    if (!informacion.load(argv[1], argv[2]))
    {
        cerr << "Error: Fallo al cargar los archivos." << endl;
        return 3;
    }

    // Realizar la intersección entre following and followers
    informacion.interseccion();
    // Es un vector de strings
    cout << informacion << endl;

    return 0;
}