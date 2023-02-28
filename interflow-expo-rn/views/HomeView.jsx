import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useUser } from "../contexts/UserContext";
import HomeHorizontalList from "../components/home/HomeHorizontalList";

const events = [
  {
    id: 1,
    title: "Doodles Party",
    image:
      "https://nftnow.com/wp-content/uploads/2021/12/Doodles-Featured-1200x449.jpg",
    date: "March 20, 2023",
    location: "Central Park, NY",
    price: "$50",
  },
  {
    id: 2,
    title: "Flovatar Art Exhibition",
    image:
      "https://nftnow.com/wp-content/uploads/2021/12/Doodles-Featured-1200x449.jpg",
    date: "April 5, 2023",
    location: "MoMA, NY",
    price: "$25",
  },
  {
    id: 3,
    title: "Flowverse Fest",
    image:
      "https://nftnow.com/wp-content/uploads/2021/12/Doodles-Featured-1200x449.jpg",
    date: "May 15, 2023",
    location: "Brooklyn, NY",
    price: "$35",
  },
];

const reveals = [
  {
    id: 1,
    title: "Genesis Box",
    uri: "https://cdn.discordapp.com/attachments/1073306606005145692/1079121507487322242/lootnegro.gif",
  },
  {
    id: 2,
    title: "Genesis Box",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676912495/genbox_eivvgz.gif",
  },
  {
    id: 3,
    title: "Genesis Box",
    uri: "https://doodles.app/images/Dooplicator.gif",
  },
];

const games = [
  {
    id: 1,
    title: "Metarace",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676916768/metarace_2_xmo7mh.png",
  },
  {
    id: 2,
    title: "Flobrawl",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676916768/metarace_2_xmo7mh.png",
  },
  {
    id: 3,
    title: "Doodlery",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676916768/metarace_2_xmo7mh.png",
  }, {
    id: 4,
    title: "Metarace",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676916768/metarace_2_xmo7mh.png",
  },
  {
    id: 5,
    title: "Flobrawl",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676916768/metarace_2_xmo7mh.png",
  },
  {
    id: 6,
    title: "Doodlery",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676916768/metarace_2_xmo7mh.png",
  },
];

const interDrops = [
  {
    id: 1,
    title: "PSG x Doodles",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png",
  },
  {
    id: 2,
    title: "Nike x Flovatar",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png",
  },
  {
    id: 3,
    title: "Doodlery",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png",
  }, {
    id: 4,
    title: "Metarace",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png",
  },
  {
    id: 5,
    title: "Flobrawl",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png",
  },
  {
    id: 6,
    title: "Doodlery",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677594710/Interdrop-removebg-preview_cpvsgj.png",
  },
];

export default function HomeView({ navigation }) {
  const { user } = useUser();

  const handleNav = () => {
    navigation.navigate("RevealDetails");
  };

  const handleGameNav = () => {
    navigation.navigate("GameDetails");
  };

  const handleEventNav = () => {
    navigation.navigate("EventDetails");
  }; 
  
  const handleInterNav = () => {
    alert("Coming Soon!");
  };

  const Divider = ({ height }) => <View style={{ height: height }} />;

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: "white",
    }}>
      <Divider height={20} />
      <HomeHorizontalList items={events} type="events" onPress={handleEventNav} />
      <Divider height={20} />
      <HomeHorizontalList items={reveals} type="reveals" onPress={handleNav} />
      <Divider height={20} />
      <HomeHorizontalList items={games} type="games" onPress={handleGameNav} />
      <Divider height={20} />
      <HomeHorizontalList items={interDrops} type="interdrops" onPress={handleInterNav} />
      <Divider height={20} />
    </ScrollView>
  );
}
