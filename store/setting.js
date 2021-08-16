export const state = () => ({
  selectedWindow: 'Index',
})

export const getters = {
  getSelectedWindow: (state) => {
    return state.selectedWindow
  }
}

export const mutations = {
  setSelectedWindow: (state, window) => {
    state.selectedWindow = window
  }
}

export const actions = {
  async integrationСonnection({}, settingForm) {
    console.log(settingForm)
    return await this.$axios.$post(`https://rest.yelm.io/api/integration/iiko/organization`, settingForm).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async sendOrgamization({}, organization) {
    console.log(organization)
    return await this.$axios.$post(`https://rest.yelm.io/api/integration/iiko/menu`, {
      organization_id: organization
    }).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async integrationDeactivate({}, ) {
    return await this.$axios.$put(`https://rest.yelm.io/api/integration/iiko/disable`, {})
  },
  async changePayment({}, paymentForm) {
    return await this.$axios.$post(`https://rest.yelm.io/api/payment-setting`, {
      form: paymentForm
    }).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async changeDelivery({}, deliveryForm) {
    return await this.$axios.$post(`https://rest.yelm.io/api/delivery`, deliveryForm).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async changePersonalization({}, personalizationForm) {
    return await this.$axios.$post(`https://rest.yelm.io/api/personalization`, personalizationForm).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async changeSite({}, site) {
    return await this.$axios.$post(`https://rest.yelm.io/api/site-setting`, {site: site}).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
      if (e.response.status === 403) return 403;
    })
  },

  //  Интеграция с Yandex Go

  async сheckYandexIntegration({}, settingForm) {
    console.log(settingForm)
    return await this.$axios.$post(`https://rest.yelm.io/api/integration/yandex/checkout `, settingForm).then( () => {
      return 200;
    }).catch(e => {
      if (e.response.status === 401) return 401;
    })
  },
  async connectionYandexIntegration({}, organizationForm) {
    return await this.$axios.$post(`https://rest.yelm.io/api/integration/yandex/enable `, {data: organizationForm}).then( () => {
      return 200;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async deactivateYandexIntegration({}, ) {
    return await this.$axios.$put(`https://rest.yelm.io/api/integration/yandex/disable`, {})
  },

}
