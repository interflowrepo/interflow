import { View, Text, ScrollView } from "react-native";
import React from "react";
import GamesHorizontalList from "../components/games/GamesHorizontalList";

const gameCategories = [
  {
    title: 'Multiplayer',
    games: [
      { name: 'Fortnite', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'Call of Duty', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'Overwatch', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'Minecraft', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'Rocket League', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'Among Us', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' }
    ]
  },
  {
    title: 'Solo',
    games: [
      { name: 'Assassin\'s Creed', uri: 'https://media.discordapp.net/attachments/997301818746994739/1080139926621917184/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_d1e9db29-64df-4752-a834-69c90a7bbe19.png' },
      { name: 'The Legend of Zelda', uri: 'https://media.discordapp.net/attachments/997301818746994739/1080139926621917184/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_d1e9db29-64df-4752-a834-69c90a7bbe19.png' },
      { name: 'Dark Souls', uri: 'https://media.discordapp.net/attachments/997301818746994739/1080139926621917184/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_d1e9db29-64df-4752-a834-69c90a7bbe19.png' },
      { name: 'Super Mario Bros.', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'Sekiro: Shadows Die Twice', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' },
      { name: 'The Witcher 3: Wild Hunt', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080137598992924763/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_86d6e692-e8ad-4205-bf24-2882c3c5fba9.png' }
    ]
  },
  {
    title: 'Puzzle',
    games: [
      { name: 'Tetris', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080141183365414974/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_95265ec1-95ca-4769-b250-404f937cc47d.png' },
      { name: 'Candy Crush', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080141183365414974/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_95265ec1-95ca-4769-b250-404f937cc47d.png' },
      { name: 'Sudoku', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080141183365414974/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_95265ec1-95ca-4769-b250-404f937cc47d.png' },
      { name: 'Minesweeper', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080141183365414974/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_95265ec1-95ca-4769-b250-404f937cc47d.png' },
      { name: '2048', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080141183365414974/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_95265ec1-95ca-4769-b250-404f937cc47d.png' },
      { name: 'Bejeweled', uri: 'https://cdn.discordapp.com/attachments/997301818746994739/1080141183365414974/ElZero_vertical_poster_of_3D_casual_videogames_with_stylized_ch_95265ec1-95ca-4769-b250-404f937cc47d.png' }
    ]
  }
];


export default function GamesView() {
  const Divider = ({ height }) => <View style={{ height: height }} />;

  return (
    <ScrollView>
      <Divider height={20} />
      <GamesHorizontalList categories={gameCategories}  />
      <Divider height={20} />
    </ScrollView>
  );
}
