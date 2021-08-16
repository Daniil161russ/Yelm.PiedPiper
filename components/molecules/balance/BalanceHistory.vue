<template>
  <div>
    <el-dialog  :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="showBalanceHistoryModal" custom-class="balanceHistory" :append-to-body="true" width="70%" >
      <template slot="title">
        <div class="balanceHistory__header-left">
          <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Баланс и платежи</div>
          <div class="text text__secondary-200">История платежей</div>
        </div>
        <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
          <v-icon name="Close" slot="icon" fill="" color="primary" />
        </v-button>
      </template>
      <el-table class="balance-table" :data="balanceHistoryData" >
        <el-table-column :sortable="column.sortable" v-for="(column, index) in balanceHistory" :key="index" :prop="column.prop" :label="column.title"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import button from '~/components/atoms/button'
import icon from '~/components/atoms/icon'
  export default {
    name: 'BalanceHistory',
    components: {
      'v-button': button,
      'v-icon': icon,
    },
    mounted() {
     this.$axios.$get('/history').then(response => {
        response.map(data => {
          this.balanceHistoryData.push({
            ID: data.id,
            Amount: data.amount,
            payData: this.$moment(data.created_at).format('YYYY-MM-DD'),
            payType: data.type,
            oldBalance: data.old_balance,
            newBalance: data.new_balance,
          })
        })
      })
    },
    data:() => ({
      balanceHistoryData: [],
      balanceHistory: [
        { title: `Номер`, prop: 'ID',},
        { title: 'Сумма', prop: 'Amount', sortable: true},
        { title: 'Дата', prop: 'payData', sortable: true},
        { title: 'Тип', prop: 'payType' },
        { title: 'Баланс (стар.)', prop: 'oldBalance' },
        { title: 'Баланс (нов.)', prop: 'newBalance' },
      ],
      showBalanceHistoryModal: true
    })
  }
</script>
