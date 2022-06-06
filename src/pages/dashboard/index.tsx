import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";

import { setupApiClient } from "../../services/api";
import { useState } from "react";

type Order = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};
interface DashboardProps {
  orders: Order[];
}

export default function Dashboard({ orders }: DashboardProps) {
  const [orderList, setOrderList] = useState(orders || []);

  function handleOpenOrder(orderId: string) {
    alert(orderId);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Dashboard</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.titleContainer}>
          <h1>Últimos pedidos</h1>
          <button>
            <FiRefreshCcw size={25} color="#3fffa3" />
          </button>
        </div>

        <section className={styles.orderContainer}>
          {orderList.map((order) => {
            return (
              <article className={styles.orderItem} key={order.id}>
                <button onClick={() => handleOpenOrder(order.id)}>
                  <span>Mesa {order.table}</span>
                </button>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const api = setupApiClient(context);

  const response = await api.get("/orders");

  const orders = response.data;

  return {
    props: {
      orders,
    },
  };
});
