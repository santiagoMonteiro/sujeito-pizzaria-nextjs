import Head from "next/head";
import Image from "next/image";

import styles from "./home.module.scss";

import logoImg from "../../public/logo.svg";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>

      <div className={styles.container}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.formContainer}>
          <form>
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Sua senha" type="password" />
            <Button type="submit">
              Acessar
            </Button>
          </form>

          <a className={styles.registrationLink}>
            Não possui uma conta? Cadastre-se
          </a>
        </div>
      </div>
    </>
  );
}
