import { View, Text, ScrollView } from "react-native";
import React from "react";
import GamesHorizontalList from "../components/games/GamesHorizontalList";

const gameCategories = [
  {
    title: 'Next Ones',
    games: [
      { name: 'Fortnite', uri: 'https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png' },
      { name: 'Call of Duty', uri: 'https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png' },
      { name: 'Overwatch', uri: 'https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png' },
      { name: 'Minecraft', uri: 'https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png' },
      { name: 'Rocket League', uri: 'https://www.rocketleague.com/' },
      { name: 'Among Us', uri: 'https://www.innersloth.com/gameAmongUs.php' }
    ]
  },
  {
    title: 'Featured',
    games: [
      { name: 'Assassin\'s Creed', uri: 'https://www.ubisoft.com/en-us/game/assassins-creed' },
      { name: 'The Legend of Zelda', uri: 'https://www.zelda.com/' },
      { name: 'Dark Souls', uri: 'https://www.bandainamcoent.com/games/dark-souls' },
      { name: 'Super Mario Bros.', uri: 'https://www.nintendo.com/games/detail/super-mario-bros-switch/' },
      { name: 'Sekiro: Shadows Die Twice', uri: 'https://www.sekirothegame.com/' },
      { name: 'The Witcher 3: Wild Hunt', uri: 'https://thewitcher.com/en/witcher3' }
    ]
  },
  {
    title: 'New Ones',
    games: [
      { name: 'Tetris', uri: 'https://tetris.com/' },
      { name: 'Candy Crush', uri: 'https://www.king.com/game/candycrush' },
      { name: 'Sudoku', uri: 'https://www.sudoku.com/' },
      { name: 'Minesweeper', uri: 'https://www.microsoft.com/en-us/p/minesweeper/9wzdncrfhwcn' },
      { name: '2048', uri: 'https://play2048.co/' },
      { name: 'Bejeweled', uri: 'https://www.ea.com/games/bejeweled/bejeweled-3' }
    ]
  }
];


export default function DropsView() {
  const Divider = ({ height }) => <View style={{ height: height }} />;

  return (
    <ScrollView>
      <Divider height={20} />
      <GamesHorizontalList categories={gameCategories} drops />
      <Divider height={20} />
    </ScrollView>
  );
}
