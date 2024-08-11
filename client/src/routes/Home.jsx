
import React from "react";
import Header from "../components/Header";
import AddMall from "../components/AddMall";
import MallList from "../components/MallList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddMall />
      <MallList />
    </div>
  );
};

export default Home;