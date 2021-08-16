<template>
	<div class="session">
		<div class="analytics__header">
			<span class="analytics__date">{{ sessionData.datePick }}</span>
			<div class="analytics__devices">
				<span class="analytics__legend analytics__legend_ios">IOS</span>
				<span class="analytics__legend analytics__legend_android">Android</span>
			</div>
			<el-tabs class="analytics__switch">
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive('Day');fillData()">День</span></el-tab-pane>
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive('Week');fillData()">Неделя</span></el-tab-pane>
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive('Month');fillData()">Месяц</span></el-tab-pane>
			</el-tabs>
		</div>
		<div class="session__chart">
			<client-only>
				<LineChart :chart-data="sessionData" :options="sessionOptions" class="session__graph"></LineChart>
			</client-only>
		</div>
		<div class="analytics__footer">
			<div class="session__statistics">
				<span class="session__label">Количество человек за {{ sessionData.units }}:</span>
				<span class="session__value">{{ sessionData.persons }}</span>
			</div>
			<div class="session__statistics">
				<span class="session__label">Среднее время в приложении:</span>
				<span class="session__value">{{ sessionData.time }} минуты</span>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	name: 'session',
	components: {
		LineChart: () => import('~/components/atoms/charts/line-chart')
	},
	data: () => ({
		sessionData: {},
		activeItem: 'Day',
		sessionOptions:{
			maintainAspectRatio: false,
			legend: { display: false },
			scales: {
				yAxes: [
					{
						ticks: { min: 0, beginAtZero:true }
          }
				]
			},
			elements: {
				line: { tension: 0},
				point: { radius: 0}
			}
		}
	}),
	mounted () {
    //this.getSessions(1)
    this.fillData()

  },

  computed: {
	  ...mapGetters ({
      sessions: 'analytics/getSessions'
    })
  },

	methods: {
	  isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },

		fillData () {
			if (this.activeItem == 'Day'){
				this.sessionData = {
					units: 'день',
					datePick: this.$moment().format('Сегодня, ' + 'D MMMM' ),
					persons: 15,
					time: 23,
					labels:['0:00', '2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','0:00'],
					datasets:[
						{
							label: 'IOS',
							data: [4, 2, 2, 3, 5, 6, 5.5, 8, 5, 6, 7, 6, 8],
							backgroundColor: 'rgba(0, 0, 0, 0.0)',
							borderColor: '#0A84FF',
						},
						{
							label: 'Android',
							data: [7, 4, 3, 4, 6, 7.2, 8.2, 10, 7, 9, 8, 8, 7],
							backgroundColor: 'rgba(0, 0, 0, 0.0)',
							borderColor: '#884DFF',
						}
					],
				}
			} else if (this.activeItem == 'Week') {
				this.sessionData = {
					units: 'неделя',
					datePick: this.$moment().add(-7, 'day').format('C D MMM - ') + this.$moment().format('по D MMM'),
					persons: 75,
					time: 63,
					labels:['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
					datasets:[
						{
							label: 'IOS',
							data: [8, 8.2, 10, 8, 7, 9, 8],
							backgroundColor: 'rgba(0, 0, 0, 0.0)',
							borderColor: '#0A84FF',
						},
						{
							label: 'Android',
							data: [7, 10, 9, 10, 9, 12, 6],
							backgroundColor: 'rgba(0, 0, 0, 0.0)',
							borderColor: '#884DFF',
						}
					],
				}
			} else if (this.activeItem == 'Month') {
				this.sessionData = {
					units: 'месяц',
					datePick: this.$moment().format('За ' +'MMMM'),
					persons: 195,
					time: 60,
					labels:['1', '2','3','4','5','6','7','8','9','10','11', '12','13','14','15','16','17','18','19','20','21', '22','23','24','25','26','27','28','29','30','31'],
					datasets:[
						{
							label: 'IOS',
							data: [33, 33, 37, 40, 43, 43, 48, 48, 58, 58, 53, 44, 35, 40, 44, 30, 40, 42, 52, 50, 53, 60, 50, 41, 44, 44, 61, 58, 50, 41, 39],
							backgroundColor: 'rgba(0, 0, 0, 0.0)',
							borderColor: '#0A84FF',
						},
						{
							label: 'Android',
							data: [43, 23, 57, 30, 33, 33, 48, 78, 38, 48, 33, 54, 25, 20, 34, 30, 30, 42, 54, 54, 54, 50, 70, 71, 74, 64, 51, 58, 56, 51, 59],
							backgroundColor: 'rgba(0, 0, 0, 0.0)',
							borderColor: '#884DFF',
						}
					],
				}
			} else {
				this.sessionData = {}
			}
		},
  }
}
</script>
