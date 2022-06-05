import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

export default function Category() {
  const [category, setCategory] = useState<string>("");

  async function handleCategorySubmit(event: FormEvent) {
    event.preventDefault();

    if (category === "") {
      return;
    }

    await api.post("/category", {
      name: category,
    });

    toast.success("Categoria cadastrada com sucesso");

    setCategory("");
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Nova categoria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Cadastrar categorias</h1>

        <form className={styles.form} onSubmit={handleCategorySubmit}>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            className={styles.input}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
