
# react-keycloak-context
[![package version](https://img.shields.io/npm/v/react-keycloak-context.svg?style=flat-square)](https://npmjs.org/package/react-keycloak-context)
[![package downloads](https://img.shields.io/npm/dm/react-keycloak-context.svg?style=flat-square)](https://npmjs.org/package/react-keycloak-context)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/react-keycloak-context.svg?style=flat-square)](https://npmjs.org/package/react-keycloak-context)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> A Keycloak provider for React

## Table of Contents

- [Usage](#usage)
- [Install](#install)
- [Contribute](#contribute)
- [License](#License)

## Usage

```js
import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

import {
  Provider as KeycloakProvider,
  Consumer as KeycloakConsumer
} from 'react-keycloak-context'

const keycloakConfig = {
  realm: 'master',
  clientId: 'example',
  url: 'https://foobarbaz.com/auth',
  'ssl-required': 'external',
  'public-client': true,
  'confidential-port': 0
}

class Example extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx })
    }

    return { pageProps }
  }

  handleKeycloakInit = kc => {
    console.log('keycloak', kc)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>Example project</title>
        </Head>

        <KeycloakProvider
          initOptions= {{
            onLoad: 'login-required',
            promiseType: 'native'
          }}
          config={keycloakConfig}
          tokenKey={'kc-token'}
          refreshTokenKey={'kc-refresh'}
          onInit={this.handleKeycloakInit}
        >
          <KeycloakConsumer>
            {kc => <Component keycloak={kc} {...pageProps} />}
          </KeycloakConsumer>
        </KeycloakProvider>
      </Container>
    )
  }
}

export default Example

```


## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com).

```sh
$ npm install react-keycloak-context
$ # OR
$ yarn add react-keycloak-context
```

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT © [[object Object]]([object Object])
