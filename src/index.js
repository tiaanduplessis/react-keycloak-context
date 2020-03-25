import React, { Component, createContext } from 'react'

const KeycloakContext = createContext(null)

class KeycloakProvider extends Component {
  state = {
    kc: { loading: true }
  }

  static defaultProps = {
    onError: console.error,
    onInit: () => { },
    config: {},
    initOptions: {
      onLoad: 'login-required',
      promiseType: 'native'
    },
    refreshTokenKey: 'kc_refreshToken',
    tokenKey: 'kc_token'
  }

  componentDidMount () {
    import('keycloak-js')
      .then(this.handleSetupKeycloak)
      .catch(this.props.onError)
  }

  handleSetupKeycloak = Keycloak => {
    const {
      config,
      initOptions,
      refreshTokenKey,
      tokenKey,
      onInit,
      storage = window.localStorage // We only do the default assignment here otherwise Next.js dies
    } = this.props
    const kc = Keycloak.default(config)
    const token = storage.getItem(tokenKey)
    const refreshToken = storage.getItem(refreshTokenKey)

    if (
      token &&
      token !== 'undefined' &&
      refreshToken &&
      refreshToken !== 'undefined'
    ) {
      initOptions.token = token
      initOptions.refreshToken = refreshToken
    }

    return kc.init(initOptions).then(authenticated => {
      storage.setItem(tokenKey, kc.token)
      storage.setItem(refreshTokenKey, kc.refreshToken)

      onInit(kc)

      this.setState({
        kc
      })
    })
  }

  render () {
    return (
      <KeycloakContext.Provider value={this.state.kc}>
        {this.props.children}
      </KeycloakContext.Provider>
    )
  }
}

export const Provider = KeycloakProvider
export const Consumer = KeycloakContext.Consumer
