import Head from "next/head";
import Image from "next/image";

import styles from "../home.module.scss";

import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu cadastro</title>
      </Head>

      <div className={styles.container}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.formContainer}>

        <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Sua senha" type="password" />

            <Button type="submit">Cadastrar</Button>
          </form>

          <Link href="/">
            <a className={styles.registrationLink}>
              Já possui uma conta? Faça login
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
