<template>
	<div class="promotion">
			<div class="promotion__content">
			<h3 class="promotion__title">Реклама</h3>
			<span class="promotion__description">
				Вы можете заказать продвижение для вашего приложения с помощью рекламы,
				 для этого заполните настройки цены и длительности и нажмите оформить
			</span>
			<div class="promotion__settings">
				<div class="promotion__params">
					<div class="box budget">
						<div class="box__head">
							<h4 class="box__title">Бюджет в день</h4>
							<span class="value">{{budgetVal}}р</span>
						</div>
						<div class="dragged">
								<el-slider v-model="budgetVal" :min="500" :max="20000" :step="500"></el-slider>
						</div>
						<div class="box__footer">
							<span class="value__initial">От 500р </span>
							<span class="end__initial">До 20 000р </span>
						</div>
					</div>
					<div class="box length">
						<div class="box__head">
							<h4 class="box__title">Длительность</h4>
							<span class="value">{{lengthVal}} дней</span>
						</div>
						<div class="dragged">
							<el-slider v-model="lengthVal" :min="5" :max="30" tooltip-class="dragged__tooltip"></el-slider>
						</div>
						<div class="box__footer">
							<span class="value__initial">5 дней</span>
							<span class="end__initial">30 дней</span>
						</div>
					</div>
				</div>
				<v-button round="" color="gradient-BlueToPurpleToRed" native="button" center="" class="settings__btn">Оформить</v-button>
			</div>	
		</div>
		<div class="charts">
			<h4 class="charts__title">Ваши показатели</h4>
			<VueSlickCarousel v-bind="settingsChart" class="charts__carousel">
				<div>
					<Card class="charts__card">
						<div class="charts-header">
							<span class="card__name">{{ clicksData.name }}</span>
							<span class="card__value">{{ clicksData.value + " " + clicksData.unit}}</span>
						</div>
						<div class="chart">
							<client-only >
								<LineChart :chart-data="clicksData" :options="clicksOption" class="promotion__graph"></LineChart>
							</client-only>
						</div>
					</Card>
				</div>
				<div>
					<Card class="charts__card">
						<div class="charts-header">
							<span class="card__name">{{ amountData.name }}</span>
							<span class="card__value">{{ amountData.value + " " + amountData.unit}}</span>
						</div>
						<div class="chart">
							<client-only >
								<BarChart :chart-data="amountData" :options="amountOptions" class="promotion__graph"></BarChart>
							</client-only>
						</div>
					</Card>
				</div>
				<div>
					<Card class="charts__card">
						<div class="charts-header">
							<span class="card__name">{{ coverageData.name }}</span>
							<span class="card__value">{{ coverageData.value + " " + coverageData.unit}}</span>
						</div>
						<div class="chart">
							<client-only>
								<LineChart :chart-data="coverageData" :options="coverageOptions" class="promotion__graph"></LineChart>
							</client-only>
						</div>
					</Card>
				</div>
				<div>
					<Card class="charts__card">
						<div class="charts-header">
							<span class="card__name">{{ amountData.name }}</span>
							<span class="card__value">{{ amountData.value + " " + amountData.unit}}</span>
						</div>
						<div class="chart">
							<client-only >
								<BarChart :chart-data="amountData" :options="amountOptions" class="promotion__graph"></BarChart>
							</client-only>
						</div>
					</Card>
				</div>
				<div>
					<Card class="charts__card">
						<div class="charts-header">
							<span class="card__name">{{ coverageData.name }}</span>
							<span class="card__value">{{ coverageData.value + " " + coverageData.unit}}</span>
						</div>
						<div class="chart">
							<client-only>
								<LineChart :chart-data="coverageData" :options="coverageOptions" class="promotion__graph"></LineChart>
							</client-only>
						</div>
					</Card>
				</div>
			</VueSlickCarousel>
		</div>	
		<table class="promotion__table">
			<tr class="table__label">
				<th>Date</th>
				<th>CTR</th>
				<th>Download</th>
				<th>Просмотры</th>
				<th>Охваты</th>
				<th>Клик</th>
			</tr>
			<tr class="table__value">
				<th>31.02</th>
				<th>0 - 10%</th>
				<th>45</th>
				<th>3069</th>
				<th>15 000</th>
				<th>516</th>
			</tr>
		</table>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import button from '@/components/atoms/button'

export default {
	name: 'promotion',
	components: {
		Card: () => import('~/components/Card'),
		BarChart: () => import('~/components/atoms/charts/bar-chart'),
		LineChart: () => import('~/components/atoms/charts/line-chart'),
    'v-button': button,
		VueSlickCarousel
  },
	data: () => ({
		budgetVal: 10000,
		lengthVal: 17,
		settingsChart:{
			arrows: true,
			dots: false,
			slidesToShow: 4,
			centerPadding: '25px',
			focusOnSelect: true,
			swipeToSlide: true,
			responsive:[ 
				{
					breakpoint: 1700,
					settings:{ slidesToShow: 3 }
				},
				{
					breakpoint: 1350,
					settings:{ slidesToShow: 2 }
				}
			]
		},
		clicksData: {
			name: 'Цена клика:',
			value: 10,
			unit: "руб",
			labels:['sep', 'oct', '04', '05', '06', '07'],
			datasets: [
        {
          data: [5, 10, 7, 15, 9, 8],
					backgroundColor: '#fff',
					borderColor: '#0A84FF',
        }
      ],
		},
		amountData: {
			name: 'Количество кликов:',
			value: 1000,
			unit: "шт",
			labels:['sep', 'oct', '04', '05', '06', '07'],
			datasets: [
        {
          data: [1500, 4700, 1000, 2000, 4500, 700, 5000, 4000, 1800, 4600, 1000, 5000],
					backgroundColor: '#FFAA01',
        }
      ],
		},
		coverageData: {
			name: "Охват:",
			value: 1000,
			unit: "чел",
			labels:['sep', 'oct', '04', '05', '06', '07'],
			datasets: [
        {
          data: [0, 500, 1500, 2500,4000, 5000],
					backgroundColor: 'rgba(10, 132, 255, 0.2)',
					borderColor: '#0A84FF',
					borderRadius: '10px',
        }
      ]
		},
		clicksOption: {
			maintainAspectRatio: false,
			legend: { display: false },
			scales: {
				xAxes: [ { gridLines: { drawOnChartArea: false }} ],
				yAxes: [
					{
						stacked: true,
            gridLines: { drawOnChartArea: false },
          }
				]
			},
			elements: {
				line: { tension: 0},
				point: { radius: 0}
			}
		},
		amountOptions: {
			maintainAspectRatio: false,
			legend: { display: false },
			scales: {
				xAxes: [ { gridLines: { drawOnChartArea: false }} ],
				yAxes: [ { gridLines: { drawOnChartArea: false }} ]
			}
		},
		coverageOptions: {
			maintainAspectRatio: false,
			legend: { display: false },
			scales: {
				xAxes: [ { gridLines: { drawOnChartArea: false }} ],
				yAxes: [ { gridLines: { drawOnChartArea: false }} ]
			},
			elements: { point: { radius: 0 } }
		},
	}),
}
</script>