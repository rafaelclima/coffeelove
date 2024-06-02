import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { MapPin, ShoppingCart } from "lucide-react";

interface locationProp {
  city: string | null;
  state: string | null;
}

export function Header() {
  const [actualCity, setActualCity] = useState<string | null>(null);
  const [actualState, setActualState] = useState<string | null>(null);

  async function getCity(
    lat: number | null,
    lngt: number | null
  ): Promise<locationProp | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lngt}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.address) {
        const city =
          data.address.city || data.address.town || data.address.village;
        const obtainState = data.address["ISO3166-2-lvl4"].split("-");
        const state = obtainState[1];
        const location: locationProp = {
          city,
          state,
        };
        // const setLocation({ city, state[1]})
        return location;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching data from Nominatim:", error);
      return null;
    }
  }

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    getCity(crd.latitude, crd.longitude).then((address) => {
      if (address) {
        setActualCity(address.city);
        setActualState(address.state);
      } else {
        console.log("City not found.");
      }
    });
  }

  function errors(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            alert(
              "Reconsidere nos dar permissão para obtermos sua localização. Isso é crucial para que possamos chegar até você com o seu pedido."
            );
          }
        });
    } else {
      alert("Infelizmente, seu navegador não suporta localização!!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={styles.rootHeader}>
      <NavLink to={"/"}>
        <img className={styles.rootLogo} src={logo} alt="Logomarca da loja" />
      </NavLink>
      <nav className={styles.rootNav}>
        <span className={styles.rootLocation}>
          <MapPin size={22} color="#8047f8" strokeWidth={2.5} /> {actualCity},{" "}
          {actualState}
        </span>
        <span className={styles.rootCart}>
          <ShoppingCart size={22} color="#C47F17" strokeWidth={1.75} />
        </span>
      </nav>
    </header>
  );
}
