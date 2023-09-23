import React, { useEffect, useState } from "react";
import "./Book.css";
import logo from "../Assest/logo.png";
import name from "../Assest/KeazoNBOOKS.png";
import search from "../Assest/ant-design_search-outlined.png";
import heart from "../Assest/heart.png";
import notify from "../Assest/notification.png";
import premium from "../Assest/premium.png";
import pic from "../Assest/img.png";
import axios from "axios";
function Book() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
        );
        const res2 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"
        );

        let combinedData = [...res1.data.items, ...res2.data.items];
        console.log(combinedData);
        setData(combinedData);
      } catch {}
    };
    fetchData();
  }, []);

  const displayData = (volumeInfo) => {
    //   console.log(volumeInfo);
    setDisplay(volumeInfo);

    console.log(display);
  };
  return (
    <div className="book">
      <div className="navbar">
        {/* For logo and name */}
        <div className="logo">
          <img src={logo} alt="logo" />
          <img src={name} alt="name" />
        </div>

        {/* for search bar  */}

        <div className="searchBar">
          <img src={search} alt="search" />
          <input
            type="text"
            placeholder="Search for the book you want and read it now... Sherlock Holmes, Harry Pot..."
          />
          <button>Search</button>
        </div>
        {/* for icons  */}
        <div className="icons">
          <img src={heart} alt="heart" />
          <img src={notify} alt="notify" />
          <img src={premium} alt="premium" />
          <img src={pic} alt="pic" />
        </div>
      </div>
      <div className="detail">
        {display !== "" && (
          <div className="information">
            <div className="display-img">
              <img src={display.imageLinks.thumbnail} />
            </div>
            <div className="display-detail">
              <h1>{display.title}</h1>
              <p>{display.description}</p>
              <p className="para">
                <h4>Avg Rating : {display.averageRating}</h4>

                <h4>Publisher:{display.publisher}</h4>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        {data && (
          <div className="img-pic">
            {data.map((element) => (
              <div key={element.id} className="data">
                <img
                  src={element.volumeInfo.imageLinks.smallThumbnail}
                  onClick={() => displayData(element.volumeInfo)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
