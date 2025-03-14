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
    unordered_set<string> seguidores;
    unordered_set<string> seguidos;
    vector<string> noseguidores;

public:
    Info();
    ~Info();
    Info(const Info &orig);
    void interseccion();
    bool load(const string &archivoSeguidos, const string &archivoSeguidores);
    friend ostream &operator<<(ostream &flujo, const Info &info);
};

#endif // INFO_H