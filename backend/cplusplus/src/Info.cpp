//
// Created por Claudio Rivas
//
#include "Info.h"
#include <iostream>

using namespace std;
using json = nlohmann::json;

// Constructor
Info ::Info()
{
}

// Destructor
Info ::~Info()
{
}

// Constructor de copia
Info::Info(const Info &orig)
{
}

// Intersección entre following and followers
void Info::interseccion()
{
    // Resevamos memoria para no tener que reservar cada x iteraciones
    noseguidores.reserve(seguidos.size());
    for (const auto &seguido : seguidos)
    {
        if (seguidores.find(seguido) == seguidores.end()) // Búsqueda O(1)
        {
            noseguidores.push_back(seguido);
        }
    }
}

// Imprimir los no followers
ostream &operator<<(ostream &flujo, const Info &info)
{
    for (int i = 0; i < info.noseguidores.size(); i++)
    {
        flujo << info.noseguidores[i] << endl;
    }
    return flujo;
}

// Cargar los archivos json
bool Info::load(const string &archivoSeguidos, const string &archivoSeguidores)
{
    // Cargar el archivo following
    ifstream archivo1(archivoSeguidos);
    if (archivo1.is_open())
    {
        json j;
        archivo1 >> j;
        for (const auto &item : j["relationships_following"])
        {
            if (!item["string_list_data"].empty())
            {
                seguidos.insert(item["string_list_data"][0]["value"].get<string>());
            }
        }
        archivo1.close();
    }
    else
    {
        cerr << "Error al abrir el archivo de seguidos: " << archivoSeguidos << endl;
        return false;
    }

    // Cargar el archivo followers_1
    ifstream archivo2(archivoSeguidores);
    if (archivo2.is_open())
    {
        json j;
        archivo2 >> j;
        for (const auto &item : j)
        {
            if (!item["string_list_data"].empty())
            {
                seguidores.insert(item["string_list_data"][0]["value"].get<string>());
            }
        }
        archivo2.close();
    }
    else
    {
        cerr << "Error al abrir el archivo de seguidores: " << archivoSeguidores << endl;
        return false;
    }

    return true;
}