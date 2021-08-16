<template>
	<div class="goods">
		<div class="analytics__header">
			<span class="analytics__date">{{ 'Популярные товары ' + datePick }}</span>
			<el-tabs class="analytics__switch">
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive('Day');fillData()">День</span></el-tab-pane>
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive('Week');fillData()">Неделя</span></el-tab-pane>
				<el-tab-pane><span class="analytics__pick" slot="label" @click.prevent="setActive('Month');fillData()">Месяц</span></el-tab-pane>
			</el-tabs>
		</div>
		<table class="goods__tabel">
			<tr class="table__label">
				<th>Название товара/артикул</th>
				<th>Изображение</th>
				<th>Стоимость</th>
				<th>Количество заказов</th>
				<th>Максимум в день</th>
			</tr>
			<tr class="table__value">
				<th>
					<p>Суп пюре из шампиньонов</p>
					<p>артикул: <i>890754760</i></p>
				</th>
				<th>
					<img src="~/assets/images/analytics/goods/soup.png" alt="soup">
				</th>
				<th>6800p</th>
				<th>80</th>
				<th>35</th>
			</tr>
			<tr class="table__value">
				<th>
					<p>Суп пюре из шампиньонов</p>
					<p>артикул: <i>890754760</i></p>
				</th>
				<th>
					<img src="~/assets/images/analytics/goods/burger.png" alt="burger">
				</th>
				<th>6800p</th>
				<th>80</th>
				<th>35</th>
			</tr>
			<tr class="table__value">
				<th>
					<p>Суп пюре из шампиньонов</p>
					<p>артикул: <i>890754760</i></p>
				</th>
				<th>
					<img src="~/assets/images/analytics/goods/coffie.png" alt="coffie">
				</th>
				<th>6800p</th>
				<th>80</th>
				<th>35</th>
			</tr>
			<tr class="table__value">
				<th>
					<p>Суп пюре из шампиньонов</p>
					<p>артикул: <i>890754760</i></p>
				</th>
				<th>
					<img src="~/assets/images/analytics/goods/salad.png" alt="salad">
				</th>
				<th>6800p</th>
				<th>80</th>
				<th>35</th>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'goods',
	data: () => ({
		activeItem: 'Day',
		datePick: null,
	}),
	mounted () {
    this.fillData()
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
				this.datePick = 'за сегодня'
			} else if (this.activeItem == 'Week'){
				this.datePick = this.$moment().add(-7, 'day').format('c D MMM - ') + this.$moment().format('по D MMM');
			} else if (this.activeItem == 'Month'){
				this.datePick = this.$moment().format('за ' +'MMMM');
			}
		}
  }
}
</script>