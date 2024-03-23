import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import db from "../firebaseFile";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlanScreen = () => {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error has occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51OxQ78D2f7NLskKCB0gjfhsjQPFhmo4VKfp0r3qFD4JjlKcQaUZ3sIFT7OwvTm0j27gziHodOeMS69gsPnI9jpfe00cGyV3hlS"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      {subscription && (
        <p>
          Your Plan renews at:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}{" "}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`planScreen__plan ${
              isCurrentPackage && "plan__disabled"
            }`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              className="planScreen__button"
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
