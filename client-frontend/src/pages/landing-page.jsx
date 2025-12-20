import React from "react";
import Hero from "../components/hero";
import Services from "../components/services";
import Motivation from "../components/motivation";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../features/user-slice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);
  console.log("ana f landing", currentUser);
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <Services />
      <Motivation />
      <Footer />
    </div>
  );
};

export default LandingPage;
