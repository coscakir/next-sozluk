import { useCallback, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

export default function Home() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const url = `${process.env.api}/oauth/token?grant_type=client_credentials`;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    })
      .then((res) => res.text())
      .then((json) => JSON.parse(json))
      .then((response) => {
        if (response.access_token) {
          localStorage.setItem("user", JSON.stringify(response));
          Router.push("/dashboard");
        } else {
          window.alert("Bad credentials");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Dictionary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="username" />
          </div>
          <div>
            <input type="password" name="password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    </div>
  );
}
