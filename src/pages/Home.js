import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  
  return isLoading ? (<div>En cours de chargement...</div>) : (
    <div className="offers"> 
      {data.offers.map((offer, index) => {
        return (
            <Link className="product" style={{textDecoration: `none`}} 
           key={offer.id} to={`/offer/${offer._id}`}
          >
            <h3 className="title" >{offer.product_name}</h3>
            <img className="image"
            src={offer.product_image.secure_url} 
            alt={offer.product_name}
            />
            <p className="price" >{offer.product_price} €</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
