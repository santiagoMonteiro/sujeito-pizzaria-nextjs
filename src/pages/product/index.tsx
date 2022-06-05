import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import { setupApiClient } from "../../services/api";
import { toast } from "react-toastify";

type Category = {
  name: string;
  id: string;
};

interface CategoryProps {
  categories: Category[];
}

export default function Product({ categories }: CategoryProps) {
  const [productImg, setProductImg] = useState(null);
  const [productImgUrl, setProductImgUrl] = useState("");

  const [categoryList, setCategoryList] = useState(categories || []);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function handleImgFile(event: ChangeEvent<HTMLInputElement>) {
    const img = event.target.files[0];

    try {
      const url = URL.createObjectURL(img);
      setProductImg(img);
      setProductImgUrl(url);
    } catch (err) {
      return;
    }
  }

  function handleCategoryChange(event) {
    setSelectedCategoryIndex(event.target.value);
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (
        name === "" ||
        price === "" ||
        description === "" ||
        productImg === null
      ) {
        toast.error("Preencha todos os campos");
        return;
      }

      const data = new FormData();

      const category_id = categoryList[selectedCategoryIndex].id;

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", category_id);
      data.append("file", productImg);

      const api = setupApiClient();

      await api.post("/product", data);

      toast.success("Produto cadastrado com sucesso");

      setProductImg(null);
      setProductImgUrl("");
      setSelectedCategoryIndex(0);
      setName("");
      setPrice("");
      setDescription("");

    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar o produto");
    }
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Novo produto</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>Novo produto</h1>

        <form className={styles.form} onSubmit={handleFormSubmit}>
          <label className={styles.labelImg}>
            <span>
              <FiUpload size={30} color="#FFF" />
            </span>

            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImgFile}
            />

            {productImgUrl && (
              <img
                className={styles.imgPreview}
                src={productImgUrl}
                alt="Produto"
                width={250}
                height={250}
              />
            )}
          </label>

          <select value={selectedCategoryIndex} onChange={handleCategoryChange}>
            {categoryList.map((category, index) => {
              return (
                <option value={index} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            placeholder="Digite o nome do produto"
            className={styles.input}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Preço do produto"
            className={styles.input}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <textarea
            placeholder="Descreva seu produto..."
            className={styles.textarea}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <button className={styles.button} type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const api = setupApiClient(context);

  const response = await api.get("/category");

  const categories = response.data;

  return {
    props: {
      categories,
    },
  };
});
