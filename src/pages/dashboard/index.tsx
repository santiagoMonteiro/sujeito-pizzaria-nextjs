import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";

import { setupApiClient } from "../../services/api";
import { useState } from "react";

import { OrderModal } from "../../components/OrderModal";

import Modal from "react-modal";
import { toast } from "react-toastify";

type Order = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
};

export type OrderItem = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: Product;
  order: Order;
};

interface DashboardProps {
  orders: Order[];
}

export default function Dashboard({ orders }: DashboardProps) {
  const [orderList, setOrderList] = useState(orders || []);

  const [orderDetails, setOrderDetails] = useState<OrderItem[]>();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function handleCloseModal() {
    setModalIsVisible(false);
  }

  async function handleOpenOrder(orderId: string) {
    const api = setupApiClient();

    const response = await api.get("/order/detail", {
      params: {
        order_id: orderId,
      },
    });

    setOrderDetails(response.data);
    setModalIsVisible(true);
  }

  async function handleRefreshOrders() {
    const api = setupApiClient();

    const response = await api.get("orders");

    setOrderList(response.data);
  }

  async function handleFinishOrder(orderId: string) {
    try {
      const api = setupApiClient();

      await api.patch("order/finish", {
        order_id: orderId,
      });

      await handleRefreshOrders();

      toast.success("Pedido concluido");
    } catch {
      toast.error("Não foi possível concluir o pedido");
    }

    setModalIsVisible(false);
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>SujeitoPizza - Dashboard</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.titleContainer}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefreshOrders}>
            <FiRefreshCcw size={25} color="#3fffa3" />
          </button>
        </div>

        <section className={styles.orderContainer}>
          {orderList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado...
            </span>
          )}

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

      {modalIsVisible && (
        <OrderModal
          isOpen={modalIsVisible}
          onRequestClose={handleCloseModal}
          orderDetails={orderDetails}
          handleFinishOrder={handleFinishOrder}
        />
      )}
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
