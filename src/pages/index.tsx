import { FormEvent, useContext, useState } from "react";

import Head from "next/head";
import Image from "next/image";

import styles from "./home.module.scss";

import logoImg from "../../public/logo.svg";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { AuthContext } from "../contexts/AuthContext";

import Link from "next/link";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(event: FormEvent): Promise<void> {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("preencha os dados");
      return;
    }

    setLoading(true);

    const credentials = {
      email,
      password,
    };

    await signIn(credentials);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>

      <div className={styles.container}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.formContainer}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.registrationLink}>
              Não possui uma conta? Cadastre-se
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
