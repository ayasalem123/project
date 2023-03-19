import React from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Navbarvisitor from '../components/navbarvisitor';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import Carouselcomponent from '../components/carousel';
import Cardcomponent from '../components/card';
import { useSelector, useDispatch } from 'react-redux';
import Navbarsigned from '../components/navbarsigned';
import Navbaradmin from '../components/navbaradmin';
import { gettreatment } from '../redux/slices/UserReducer';
function Home() {
  const [carouselelement, setCarouselelement] = useState([]);
  const { userAuth } = useSelector((state) => state);
  //const {signeduser}=userAuth?.loggeduser
  const dispatch = useDispatch();
  const [treatmentelement, setTreatmentelement] = useState([]);
  let gettreatments = async () => {
    let {payload}  = await dispatch(gettreatment());
    console.log(payload)
    setTreatmentelement(payload);
  };
  useEffect(() => {
    gettreatments();
  }, []);
  let getcarousel = async () => {
    let { data } = await axios.get('http://localhost:5000/carousel');
    setCarouselelement(data);
  };

  useEffect(() => {
    getcarousel();
  }, []);

  return (
    <div>
      <ToastContainer />
      {!userAuth?.loggeduser?.signeduser ? (
        <Navbarvisitor />
      ) : userAuth?.loggeduser?.signeduser.Role == 'user' ? (
        <Navbarsigned />
      ) : (
        <Navbaradmin />
      )}
      {carouselelement?.length !== 0 ? (
        <Carouselcomponent carouselelement={carouselelement} />
      ) : (
        <div>loading</div>
      )}
      <h2>TOP 4 NEW ADVANCED SKIN TREATMENTS we OFFER IN 2023</h2>
      {treatmentelement?.length !== 0 ? (
        treatmentelement?.map((el) => <Cardcomponent el={el} />)
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Home;
