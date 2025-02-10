//
// Created por Claudio Rivas
//
#include <string>
#include <fstream>
#include <vector>
#include <iostream>
#include <nlohmann/json.hpp>

#ifndef INFO_H
#define INFO_H

using namespace std;

class Info {
private:
    vector<string> seguidores;
    vector<string> seguidos;
    vector <string> noseguidores;

public:
    Info();
    ~Info();
    Info(const Info& orig);
    Info interseccion();
    void load(const string& archivoSeguidos, const string& archivoSeguidores);
    friend ostream& operator<<(ostream& flujo, const Info& info);
};
#endif //INFO_H
