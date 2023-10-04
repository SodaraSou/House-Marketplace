import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFetcher, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longtitude: 0,
  });

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
      } else {
        navigate("/signin");
      }
    });
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  return <div>CreateListing</div>;
}

export default CreateListing;
