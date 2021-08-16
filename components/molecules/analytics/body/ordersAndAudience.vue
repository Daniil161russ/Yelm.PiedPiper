<template>
	<div class="orders">
		<div class="orders__body">
			<div class="analytics__header">
				<span class="analytics__date">{{ 'Количество совершенных заказов ' + ordersData.datePick }}</span>
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
			<div class="orders__chart">
				<span class="orders__value">{{ ordersData.order }} </span>
				<span class="orders__label">заказов</span>
				<client-only>
					<BarChart :chart-data="ordersData" :options="ordersOptions" class="orders__graph"></BarChart>
				</client-only>
			</div>
		</div>
		<span class="orders__audience">Активная аудитория за 15-21 марта</span>
		<table class="orders__tabel">
			<tr class="table__label">
				<th>Номер телефона</th>
				<th>Адрес</th>
				<th>Система</th>
				<th>Количество заказов</th>
				<th>Сумма</th>
			</tr>
			<tr class="table__value">
				<th><a href="tel:+">{{ phone }}</a></th>
				<th>Москва, Конаковский проезд, 125656</th>
				<th>Android</th>
				<th>16</th>
				<th>6800</th>
			</tr>
			<tr class="table__value">
				<th><a href="tel:+">{{ phone }}</a></th>
				<th>Москва, Конаковский проезд, 125656</th>
				<th>Android</th>
				<th>16</th>
				<th>6800</th>
			</tr>
			<tr class="table__value">
				<th><a href="tel:+">{{ phone }}</a></th>
				<th>Москва, Конаковский проезд, 125656</th>
				<th>Android</th>
				<th>16</th>
				<th>6800</th>
			</tr>
			<tr class="table__value">
				<th><a href="tel:+">{{ phone }}</a></th>
				<th>Москва, Конаковский проезд, 125656</th>
				<th>Android</th>
				<th>16</th>
				<th>6800</th>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'ordersAndAudience',
	components: {
		BarChart: () => import('~/components/atoms/charts/bar-chart')
  },
	data: () => ({
		ordersData: {},
		activeItem: 'Day',
		phone: '79811441910',
		ordersOptions:{
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
	mounted() {
    this.getPhoneMask()
		this.fillData()
  },
	methods: {
		isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
		getPhoneMask() {
			this.phone = '+'+this.phone[0]+' ('+this.phone[1]+this.phone[2]+this.phone[3]+') '+this.phone[4]+this.phone[5]+this.phone[6]+' '+this.phone[7]+this.phone[8]+'-'+this.phone[9]+this.phone[10]
		},
		fillData () {
			if (this.activeItem == 'Day'){
				this.ordersData = {
					order: 40,
					datePick: 'за сегодня',
					labels:['0:00', '2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','0:00'],
					datasets:[
						{
							label: 'IOS',
							data: [14, 12, 32, 23, 45, 26, 15, 18, 25, 36, 27, 16, 8],
							backgroundColor: '#2041B3',
						},
						{
							label: 'Android',
							data: [11, 22, 32, 43, 55, 26, 25, 18, 15, 26, 37, 6, 11],
							backgroundColor: '#B6DBFF',
						}
					],
				}
			} else if (this.activeItem == 'Week') {
				this.ordersData = {
					order: 40,
					datePick: this.$moment().add(-7, 'day').format('c D MMM - ') + this.$moment().format('по D MMM'),
					labels:['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
					datasets:[
						{
							label: 'IOS',
							data: [90, 130, 500, 90, 350, 100, 65],
							backgroundColor: '#2041B3',
						},
						{
							label: 'Android',
							data: [65, 200, 65, 140, 75, 42, 88],
							backgroundColor: '#B6DBFF',
						}
					],
				}
			} else if (this.activeItem == 'Month') {
				this.ordersData = {
					order: 140,
					datePick: this.$moment().format('за ' +'MMMM'),
					labels:['1', '2','3','4','5','6','7','8','9','10','11', '12','13','14','15','16','17','18','19','20','21', '22','23','24','25','26','27','28','29','30','31'],
					datasets:[
						{
							label: 'IOS',
							data: [80, 150, 72, 190, 65, 80, 88, 140, 57, 700, 90, 250, 75, 360, 170, 120, 10, 100, 70, 90, 65, 180, 470, 70, 120, 40, 150, 90, 68, 200, 77],
							backgroundColor: '#2041B3',
						},
						{
							label: 'Android',
							data: [60, 120, 42, 150, 75, 40, 188, 240, 87, 50, 190, 200, 45, 60, 120, 220, 50, 100, 50, 60, 165, 80, 270, 120, 120, 100, 750, 190, 58, 150,55],
							backgroundColor: '#B6DBFF',
						}
					],
				}
			} else {
				this.ordersData = {}
			}
		}
	}
}
</script>
