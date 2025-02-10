#include <iostream>
#include "Info.h"
#include <fstream>
using namespace std;

int main(int argc, char *argv[])
{

    if (argc != 3)
    {
        cerr << "Mal uso, tienes que introducir dos archivos, primero el archivo de seguidos, luego el archivo de seguidores" << endl;
    }
    else
    {
        Info informacion;
        informacion.load(argv[1], argv[2]);
        informacion.interseccion();
        cout << informacion << endl;
    }

    return 0;
}
