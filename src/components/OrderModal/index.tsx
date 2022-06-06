import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";

import { OrderItem } from "../../pages/dashboard";

interface OrderModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  orderDetails: OrderItem[];
  handleFinishOrder: (orderId: string) => Promise<void>;
}

export function OrderModal({
  isOpen,
  onRequestClose,
  orderDetails,
  handleFinishOrder,
}: OrderModalProps) {
  const table = orderDetails[0].order.table;
  const orderId = orderDetails[0].order_id;

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(29, 29, 46, 0.7)",
    },
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "0",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
      borderRadius: "0.5rem",
      border: "none",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={onRequestClose}
          className={`react-modal-close ${styles.closeButton}`}
        >
          <FiX size={45} color="#f34748" />
        </button>

        <h2>Detalhes do pedido</h2>

        <span className={styles.table}>
          <h3>Mesa: {table}</h3>
        </span>

        <ul>
          {orderDetails.map((orderItem) => {
            return (
              <li key={orderItem.id} className={styles.item}>
                <span>
                  {orderItem.amount} - <strong>{orderItem.product.name}</strong>
                </span>
                <span className={styles.description}>
                  {orderItem.product.description}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          className={styles.addButton}
          onClick={() => handleFinishOrder(orderId)}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
