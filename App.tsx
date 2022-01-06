import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";

type pokemon = {
  name: string;
  attack: number;
  defense: number;
  speed: number;
  weight: number;
  image: string;
};

export default function App() {
  const [pokemons, setPokemons] = useState<pokemon[]>([]);
  const numberOfPokemons = Math.floor(Math.random() * 9) + 1;

  const fetchData = async () => {
    const pokemonIds = [];

    for (let i = 0; i < numberOfPokemons; i++) {
      pokemonIds.push(Math.floor(Math.random() * 800));
    }

    const pokemons = [];
    for (let i = 0; i < pokemonIds.length; i++) {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonIds[i]}`
      );

      const { name, stats, weight, sprites } = res.data;

      pokemons.push({
        name,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        speed: stats[5].base_stat,
        weight,
        image: sprites.front_default,
      });
    }

    setPokemons(pokemons);
  };

  const choosePokemon = (name: string): void => {
    setPokemons(pokemons.filter((pokemon) => pokemon.name === name));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        marginVertical: 50,
        flex: 1,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Pokemons
      </Text>
      <Image
        source={{
          uri: `https://www.techtastic.nl/wp-content/uploads/2019/06/Pokemon-Go-derde-verjaardag.jpg`,
        }}
        style={{ width: "100%", height: 160, marginBottom: 10 }}
      />
      <View style={{ width: "50%" }}>
        <Button title='Reset Pokemons' color='red' onPress={fetchData} />
      </View>
      <FlatList
        style={styles.list}
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pokemonCard}
            onPress={() => choosePokemon(item.name)}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
              {item.name}
            </Text>
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: 200, height: 160, marginBottom: 10 }}
            />
            <Text style={{ color: "white" }}>attack: {item.attack}</Text>
            <Text style={{ color: "white" }}>defense: {item.defense}</Text>
            <Text style={{ color: "white" }}>speed: {item.speed}</Text>
            <Text style={{ color: "white" }}>weight: {item.weight}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    maxWidth: "100%",
  },
  pokemonCard: {
    backgroundColor: "#333",
    margin: 10,
    padding: 20,
    borderRadius: 5,
    width: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
