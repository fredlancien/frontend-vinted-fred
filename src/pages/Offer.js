import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (<div>En cours de chargement...</div>) : 
  (
    <div className="offer">
      <h3 className="name" >{data.product_name}</h3>
      <div>
      <img className="img" src={data.product_image.secure_url} alt="produit"/>
      </div>
      <ul>
        {data.product_details.map((elem, index) => {
          const keys = Object.keys(elem);
          return (
            <li key={index}>
              <div className="detailsname">{keys[0]}</div>
              <div className="details">{elem[keys[0]]}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Offer;