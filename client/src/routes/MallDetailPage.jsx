import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MallsContext } from "../context/MallsContext";
import MallFinder from "../apis/MallFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const MallDetailPage = () => {
  const { id } = useParams();
  const { selectedMall, setSelectedMall } = useContext(
    MallsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MallFinder.get(`/${id}`);
        console.log(response);

        setSelectedMall(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedMall && (
        <>
          <h1 className="text-center display-1">
            {selectedMall.mall.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedMall.mall.average_rating} />
            <span className="text-warning ml-1">
              {selectedMall.mall.count
                ? `(${selectedMall.mall.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedMall.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default MallDetailPage;