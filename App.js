import React, { useEffect, useState } from 'react';
import { TextInput, ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellido] = useState('');


  // const getUsers = async () => {
  //    try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false); //para que se deje de ver cargando la app cuando lleguen los datos del json
  //   }
  // }


  //   const getUserById = async (id) => {
  //     try {
  //      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  //      const json = await response.json();
  //      setData(json);
  //      if(json.name != null){setName(json.name); setEmail(json.email)}
  //      else{ alert ("el id del usuario no existe, Intente nuevamente...")}
  //    } catch (error) {
  //      console.error(error);
  //    } finally {
  //      setLoading(false); //para que se deje de ver cargando la app cuando lleguen los datos del json
  //    }
  //  }

  const saveCliente = async () => {
    if (!nombre.trim() || apellidos.trim()) {
      alert("Nombre y apellidos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://172.16.61.42:3000/api/clientes`, {
        nombre,
        apellidos,
      });
      alert("Cliente agregado correctamente...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id) => {
    if (!nombre.trim() || apellidos.trim()) {
      alert("Nombre y apellidos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://172.16.61.42:3000/api/clientes/${id}`, {
        nombre,
        apellidos,
      });
      alert("Cliente actualizado correctamente...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    setLoading(true);
    try {
      if (confirm("Esta seguro de eliminar el cliente?")) {
        const response = await axios.delete(`http://172.16.61.42:3000/api/clientes/${id}`);
        alert("Cliente eliminado correctamete")
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };



  const getClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://172.16.61.42:3000/api/clientes`);
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }


  const getClientePorId = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://172.16.61.42:3000/api/clientes/${id}`);
      setData(response.data);
      if (response.data.nombre != null) {
        //Actualizar los estados de nombre y apellidos
        setNombre(response.data.nombre);
        setApellido(response.data.apellidos);
      }
      else {
        alert("Id del cliente no existe, inténtelo con otro.")
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    //getUsers();//se ejecutará este metodo al iniciar por primera vez el componente.
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>

      <TextInput
        style={styles.inputs}
        placeholder="Ingrese el id del usuario que deseas buscar"
        onChangeText={idsearch => setIdsearch(idsearch)}
        value={idsearch} />

      <TextInput
        style={styles.inputs}
        onChangeText={nombre => setNombre(nombre)}
        value={nombre} />

      <TextInput
        style={styles.inputs}
        onChangeText={apellidos => setApellido(apellidos)}
        value={apellidos} />

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'green' }]}
        onPress={() => saveCliente()}
      >
        <Text style={{ color: 'yellow' }}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'orange' }]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ color: 'yellow' }}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'red' }]}
        onPress={() => deleteCliente(idsearch)}
      >
        <Text style={{ color: 'yellow' }}>eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'aguamarine' }]}
        onPress={() => getClientePorId(idsearch)}
      >
        <Text style={{ color: 'red' }}>Buscar por Id</Text>
      </TouchableOpacity>

      <Text>Listado de clientes</Text>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'green' }]}
        onPress={() => getClientes()}
      >
        <Text style={{ color: 'yellow' }}>listar Clientes</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size="large" color="red" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.touchables, { backgroundColor: 'orange' }]}
              onPress={() => {
                if (confirm(`Esta seguro de borrarl el cliente:${item.nombre}`)) {
                  alert("Se ha borrado el cliente Exitosamente..");
                }
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.nombre} {item.apellidos}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  touchables: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 10
  },
  inputs: {
    borderColor: 'green',
    borderRadius: '8',
    borderWidth: 1,
    marginTop: 10,
    textAlign: 'Center',
    padding: 5


  }

});