import {
  Clock3,
  Coffee,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import styles from "./Home.module.css";
import imgHero from "../../assets/coffeeLove_Hero.png";
import coffeeMenu from "../../data.json";

export function Home() {
  const { coffees } = coffeeMenu;

  return (
    <>
      <main className={styles.heroContainer}>
        <div className={styles.heroTexts}>
          <div className={styles.heroTitle}>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p>
              Com o Coffee Love você recebe seu café onde estiver, a qualquer
              hora.
            </p>
          </div>

          <div className={styles.heroPlus}>
            <p>
              <span>
                <ShoppingCart
                  size={16}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                />
              </span>
              Compra simples e segura
            </p>
            <p>
              <span>
                <Package
                  size={16}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                />
              </span>
              Embalagem mantém o café intacto
            </p>
            <p>
              <span>
                <Clock3
                  size={16}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                />
              </span>
              Entrega rápida e rastreada
            </p>
            <p>
              <span>
                <Coffee
                  size={16}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                />
              </span>
              O café chega fresquinho até você
            </p>
          </div>
        </div>

        <div className={styles.heroImage}>
          <img
            src={imgHero}
            alt="uma imagem com um copo de café e grãos de café espalhados"
          />
        </div>
      </main>

      <section className={styles.menu}>
        <h2>Nossos cafés</h2>
        <div className={styles["menu-grid"]}>
          {coffees.map((coffee) => (
            <div key={coffee.id} className={styles["menu-card"]}>
              <img src={coffee.img} alt={coffee.description} />
              <span className={styles["menu-category"]}>
                <p>{coffee.category}</p>
              </span>
              <h1 className={styles["menu-title"]}>{coffee.name}</h1>
              <p className={styles["menu-description"]}>{coffee.description}</p>
              <div className={styles["menu-contentPrice"]}>
                <p>
                  <span>R$ </span>
                  {coffee.price.toFixed(2)}
                </p>
                <div className={styles["menu-quantity"]}>
                  <div className={styles["menu-quantity-input"]}>
                    <span>
                      <Minus
                        size={14}
                        color="#8047F8"
                        strokeWidth={1.75}
                        absoluteStrokeWidth
                      />
                    </span>
                    <p>1</p>
                    <span>
                      <Plus
                        size={14}
                        color="#8047F8"
                        strokeWidth={1.75}
                        absoluteStrokeWidth
                      />
                    </span>
                  </div>
                  <div className={styles["menu-quantity-icon"]}>
                    <ShoppingCart
                      size={22}
                      color="#ffffff"
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
