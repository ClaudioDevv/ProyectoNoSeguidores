#ifndef INFO_H
#define INFO_H

#include <string>
#include <unordered_set>
#include <vector>
#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>

using namespace std;

class Info
{
private:
    unordered_set<string> seguidores; // Cambiado a unordered_set
    unordered_set<string> seguidos;   // Cambiado a unordered_set
    vector<string> noseguidores;      // Se mantiene como vector para el resultado

public:
    Info();
    ~Info();
    Info(const Info &orig);
    Info interseccion();
    bool load(const string &archivoSeguidos, const string &archivoSeguidores);
    friend ostream &operator<<(ostream &flujo, const Info &info);
};

#endif // INFO_H