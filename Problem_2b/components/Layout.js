import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';


const Layout = (props) => {
  return (
    <div>
      <Container>
          <form action="/send-data-here" method="post">
              <label htmlFor="first">First name:</label>
              <input type="text" id="first" name="first"/>
              <label htmlFor="last">Last name:</label>
              <input type="text" id="last" name="last"/>
              <button type="submit">Submit</button>
          </form>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link>
            <title>Page title</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};
export default Layout;
