import { FormEvent, useContext, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../home.module.scss";

import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);

    const credentials = { name, email, password };

    await signUp(credentials);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu cadastro</title>
      </Head>

      <div className={styles.container}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.formContainer}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
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
              Cadastrar
            </Button>
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
