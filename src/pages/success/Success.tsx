import { Clock3, DollarSign, MapPin } from "lucide-react";
import styles from "./Success.module.css";
import deliveryImg from "../../assets/delivery.svg";

export function Success() {
  return (
    <main className={styles["success-container"]}>
      <section className={styles["success-texts"]}>
        <div className={styles["success-texts-title"]}>
          <h2>Uhu! Pedido confirmado</h2>
          <p>Agora é só aguardar que logo o café chegará até você</p>
        </div>

        <div className={styles["success-texts-delivery-info"]}>
          <div className={styles["success-texts-delivery-address"]}>
            <span className={`${styles["icon-circle"]} ${styles["icon-map"]}`}>
              <MapPin
                size={16}
                color="#FAFAFA"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
            </span>
            <div>
              <p>
                Entrega em <strong>Rua Coronel Auris Coelho, 970</strong>
              </p>
              <p>Lagoa Nova - Natal, RN</p>
            </div>
          </div>

          <div className={styles["success-texts-delivery-address"]}>
            <span
              className={`${styles["icon-circle"]} ${styles["icon-clock"]}`}
            >
              <Clock3
                size={16}
                color="#FAFAFA"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
            </span>
            <div>
              <p>Previsão de entrega</p>
              <strong>20min - 30min</strong>
            </div>
          </div>

          <div className={styles["success-texts-delivery-address"]}>
            <span
              className={`${styles["icon-circle"]} ${styles["icon-dollar"]}`}
            >
              <DollarSign
                size={16}
                color="#FAFAFA"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
            </span>
            <div>
              <p>Pagamento na entrega</p>
              <strong>Cartão de crédito</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles["success-image"]}>
        <img
          src={deliveryImg}
          alt="Imagem de uma moto saindo para entrega do pedido"
        />
      </section>
    </main>
  );
}
