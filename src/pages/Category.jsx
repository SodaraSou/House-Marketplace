import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Create reference to listings collection
        const listingRef = collection(db, "listings");
        // Create a query
        const q = query(
          listingRef,
          where("type", "==", categoryName),
          // orderBy("timestamp", "desc"),
          limit(10)
        );
        // Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    };

    fetchListing();
  }, [categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {categoryName === "rent" ? "Place for rent" : "Place for sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <ul className="categoryListings">
            {listing.map((listing) => (
              <ListingItem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No Listings for {categoryName}</p>
      )}
    </div>
  );
}

export default Category;
