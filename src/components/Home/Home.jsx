/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
import Cart from "../Cart/Cart";

const Home = () => {
  const [allActors, setAllActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);
  // console.log(allActors);
  const handleSelectActor = (actor) => {
    // console.log(actor)
    const isExist = selectedActors.find((item) => item.id == actor.id);
    // console.log(isExist)

    // let count = 0;
    let count = actor.salary;

    if (isExist) {
      return alert("alrady booked");
    } else {
      selectedActors.forEach((element) => {
        count = count + element.salary;
      });
      // console.log(count)
      const totalRemaining = 20000 - count;

      if (count > 20000) {
        return alert("taka shas r hobe na");
      }
      setTotalCost(count);
      // console.log(totalRemaining)
      setRemaining(totalRemaining);
      setSelectedActors([...selectedActors, actor]);
    }
  };
  // console.log(selectedActors)
  return (
    <div className="container">
      <div className="phone-container">
        <div className="card-container">
          {allActors.map((actor) => (
            <div key={actor.id} className="card">
              <div className="card-img">
                <img className="photo" src={actor.image} alt="" />
              </div>
              <h2>{actor.name}</h2>
              <p>
                <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, quia?</small>
              </p>
              <div className="info">
                <p>{actor.salary}</p>
                <p>{actor.role}</p>
              </div>
              <button onClick={() => handleSelectActor(actor)} className="card-btn">
                Select
              </button>
            </div>
          ))}
        </div>
        <div className="cart">
          <Cart selectedActors={selectedActors} remaining={remaining} totalCost={totalCost}></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;
