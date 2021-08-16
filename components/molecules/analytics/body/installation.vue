<template>
	<div class="installation">
		<div class="analytics__header">
			<span class="analytics__date">{{ installationData.datePick }}</span>
			<div class="analytics__devices">
				<span class="analytics__legend analytics__legend_ios">IOS</span>
				<span class="analytics__legend analytics__legend_android">Android</span>
			</div>
			<el-tabs class="analytics__switch">
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive(1)">День</span></el-tab-pane>
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive(7)">Неделя</span></el-tab-pane>
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive(30)">Месяц</span></el-tab-pane>
			</el-tabs>
		</div>
		<div class="installation__chart">
			<span class="installation__value">{{ installationData.download }} </span>
			<span class="installation__label">установок</span>
			<client-only>
				<div class="preview__preloader preview__preloader_items" v-if="!is_loaded">
					<div class="preview__preloader-b1" :style="`background-color: #0380ff`"></div>
					<div class="preview__preloader-b2" :style="`background-color: #0380ff`"></div>
					<div class="preview__preloader-b3" :style="`background-color: #0380ff`"></div>
				</div>
				<BarChart v-else :chart-data="installationData" :options="installationOptions" class="installation__graph"></BarChart>
			</client-only>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
	name: 'installation',
	components: {
		BarChart: () => import('~/components/atoms/charts/bar-chart')
  },
	data: () => ({
		installationData: {},
		time: 1,
		datePick: null,
		is_loaded: false,
		activeItem: 0,
		installationOptions:{
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
	fetch() {
    this.setActive(1)	 
  },
	computed: {
	  ...mapGetters ({
      installation: 'analytics/getInstallation'
    })
  },
	methods: {
		...mapActions ({
			getInstallation: 'analytics/getInstallationData'
		}),
  	isActive (menuItem) {
      return this.activeItem === menuItem
    },
    async setActive (menuItem) {
			if (this.activeItem === menuItem) {
				return false
			} else {
				this.is_loaded = false
				this.activeItem = menuItem
				switch (this.activeItem) {
					case 1:
						this.datePick = this.$moment().format('Сегодня, ' + 'D MMMM' )
						break;
					case 7:
						this.datePick = this.$moment().add(-7, 'day').format('C D MMM - ') + this.$moment().format('по D MMM')
						break;
					case 30:
						this.datePick = this.$moment().format('За ' +'MMMM')
						break;
					default:
						break;
				}
				await this.getInstallation(menuItem).then(() => {
					this.installationData = {
						download: this.installation.count,
						datePick: this.datePick,
						labels: this.installation.ios.label,
						datasets:[
							{
								label: 'IOS',
								data: this.installation.ios.data,
								backgroundColor: '#884DFF',
							},
							{
								label: 'Android',
								data: this.installation.android.data,
								backgroundColor: '#FAB8C4',
							}
						],
					}
					this.is_loaded = true
				})
			}
    },
  },
}
</script>
