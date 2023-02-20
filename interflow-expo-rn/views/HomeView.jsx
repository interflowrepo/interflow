import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useUser } from "../contexts/UserContext";
import HomeHorizontalList from "../components/home/HomeHorizontalList";

const events = [
  {
    id: 1,
    title: "Doodles Festival",
    image:
      "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png",
    date: "March 20, 2023",
    location: "Central Park, NY",
    price: "$50",
  },
  {
    id: 2,
    title: "Flovatar Art Exhibition",
    image:
      "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png",
    date: "April 5, 2023",
    location: "MoMA, NY",
    price: "$25",
  },
  {
    id: 3,
    title: "Another one",
    image:
      "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png",
    date: "May 15, 2023",
    location: "Brooklyn, NY",
    price: "$35",
  },
];

const reveals = [
  {
    id: 1,
    title: "Genesis Box",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676912495/genbox_eivvgz.gif",
  },
  {
    id: 2,
    title: "Genesis Box",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676912495/genbox_eivvgz.gif",
  },
  {
    id: 3,
    title: "Genesis Box",
    uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676912495/genbox_eivvgz.gif",
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
  },
];

export default function HomeView() {
  const { user } = useUser();

  const Divider = ({ height }) => <View style={{ height: height }} />;

  return (
    <ScrollView>
      <Divider height={20} />
      <HomeHorizontalList items={events} type="events" />
      <Divider height={20} />
      <HomeHorizontalList items={reveals} type="reveals" />
      <Divider height={20} />
      <HomeHorizontalList items={games} type="games" />
      <Divider height={20} />
    </ScrollView>
  );
}
