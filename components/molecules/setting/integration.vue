<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Интеграции</h2>
      </div>
    </div>
    <div class="grid__body-wrapper">
      <div class="integration">
        <ul class="integration__list">
          <li class="integration__item integration-box" v-for="(obj, key ) in integrations" :key="key">
            <div class="integration-box__header">
              <span class="integration-box__label">{{ loadingText(key) }}</span>
              <v-switch v-model="obj.status" @change="changeStatus(key, obj.status)" :disabled='integrationAble(key)' />
            </div>
            <div class="integration-box__logo">
              <img :src="loadingLogo(key)" alt="integration" class="integration-box__img">
            </div>
          </li>
        </ul>
      </div>
      <div>
        <component :is="integrationModal.Component" v-if="integrationModal.Component != null" @hide="hideModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from "@/components/atoms/Switch";
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    'v-switch': Switch,
  },
  data: () => ({
    activeSwitch: null,
    integrations: false,
    integrationModal: { Component: null },
  }),
  created () {
    this.getUserData()
    this.setIntegration()
    this.integrations = JSON.parse(JSON.stringify(this.getIntegration))
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'user/setIntegrations' || mutation.type === 'user/setIntegrationOne') this.integrations = JSON.parse(JSON.stringify(this.getIntegration))
    })

  },
  computed: {
    ...mapGetters({
      getIntegration: 'user/getIntegration'
    }),
  },
  methods: {
    updateMessage (e) {
      this.$store.commit('updateMessage', e.target.value)
    },
    ...mapActions({
      integrationDeactivate: 'setting/integrationDeactivate',
      deactivateYandexIntegration: 'setting/deactivateYandexIntegration',
      getUserData: 'user/getUserData'
    }),
    ...mapMutations({
      setIntegration: 'user/setIntegration',
      setIntegrations: 'user/setIntegrations',
      setIntegrationOne: 'user/setIntegrationOne'
    }),
    changeStatus(integration, status){
      if (status){
        this.activeSwitch = integration
        this.getIntegrationModal(integration)
      } else {
        this.openСonfirmation(integration);
      }
    },
    async getIntegrationModal(integration) {
      if ( integration === 'iiko'){
        this.integrationModal.Component = await require('~/components/molecules/setting/modal/iikoModal').default
      } else if ( integration === 'yandex_delivery' ) {
        this.integrationModal.Component = await require('~/components/molecules/setting/modal/yandexModal').default
      }
    },
    hideModal() {
      this.setIntegrationOne(this.integration, false);
      this.integrationModal.Component = null;
    },
    openСonfirmation(integration) {
      this.$confirm('Вы уверены что хотете отключить интеграцию? (после отключения все товары будут удалены)', 'Внимание', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.$notify.success({ title: 'Успешно', message: 'Интеграция отключена!', customClass: 'el-notification-success' })
        if (integration === 'iiko') {
          this.integrationDeactivate();
        } else if (integration === 'yandex_delivery') {
          this.deactivateYandexIntegration();
        }
      }).catch(() => {
        this.$notify.error({ title: 'Отклоненно', message: 'Вы отменили отключения интеграции!', customClass: 'el-notification-error', duration: 1000  })
      });
    },
    integrationAble(integration) {
      if (integration != 'iiko' && integration != 'yandex_delivery' ) {
        return true
      } else {
        return false
      }
    },
    loadingLogo(integration) {
      switch (integration) {
        case '1c':
          return require('~/assets/images/setting/integrations/logo_1c.png');
        case 'cdek':
          return require('~/assets/images/setting/integrations/logo_cdek.png');
        case 'iiko':
          return require('~/assets/images/setting/integrations/logo_iiko.png');
        case 'amo_crm':
          return require('~/assets/images/setting/integrations/logo_amoSRM.png');
        case 'boxberry':
          return require('~/assets/images/setting/integrations/logo_boxberry.png');
        case 'r_keeper':
          return require('~/assets/images/setting/integrations/logo_rkeeper.png');
        case 'y_clients':
          return require('~/assets/images/setting/integrations/logo_yclients.png');
        case 'yandex_delivery':
          return require('~/assets/images/setting/integrations/logo_yd.png');
        default:
          break;
      }
    },
    loadingText(integration) {
      switch (integration) {
        case '1c':
          return "1C";
        case 'cdek':
          return "CDEK";
        case 'iiko':
          return "iiko";
        case 'amo_crm':
          return "amoCRM";
        case 'boxberry':
          return "Boxberry";
        case 'r_keeper':
          return "r_keeper";
        case 'y_clients':
          return "Yclients";
        case 'yandex_delivery':
          return "Yandex GO";
        default:
          break;
      }
    }
  }
}
</script>
