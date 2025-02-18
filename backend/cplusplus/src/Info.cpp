//
// Created por Claudio Rivas
//
#include "Info.h"
#include <iostream>

using namespace std;
using json = nlohmann::json;

Info :: Info(){

}

Info :: ~Info() {

}

Info::Info(const Info &orig) {
    seguidores = orig.seguidores;
    seguidos = orig.seguidos;
    noseguidores = orig.noseguidores;
}

Info Info::interseccion() {
    for (const auto& seguido : seguidos) {
        if (find(seguidores.begin(), seguidores.end(), seguido) == seguidores.end()) {
            noseguidores.push_back(seguido);
        }
    }
    return *this;
}

ostream& operator<<(ostream& flujo, const Info& info) {
    for (int i = 0; i < info.noseguidores.size(); i++) {
        flujo << info.noseguidores[i] << endl;
    }
    return flujo;
}

void Info :: load(const string& archivoSeguidos, const string& archivoSeguidores) {
    // Cargar el archivo de seguidos
    ifstream archivo1(archivoSeguidos);
    if (archivo1.is_open()) {
        json j;
        archivo1 >> j;
        for (const auto& item : j["relationships_following"]) {
            if (!item["string_list_data"].empty()) {
                seguidos.push_back(item["string_list_data"][0]["value"].get<string>());
            }
        }
        archivo1.close();
    } else {
        cerr << "Error al abrir el archivo de seguidos: " << archivoSeguidos << endl;
    }

    // Cargar el archivo de seguidores
    ifstream archivo2(archivoSeguidores);
    if (archivo2.is_open()) {
        json j;
        archivo2 >> j;
        for (const auto& item : j) {
            if (!item["string_list_data"].empty()) {
                seguidores.push_back(item["string_list_data"][0]["value"].get<string>());
            }
        }
        archivo2.close();
    } else {
        cerr << "Error al abrir el archivo de seguidores: " << archivoSeguidores << endl;
    }
}