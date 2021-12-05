<template>
	<view class="boxid">
		<view class="flex justify-between date-content horizontal">
			<view class="flex switch-date-btn">
				<view :class="currentTable == 1 ? 'active' : ''" @tap="changeTable(1)">课程</view>
				<view :class="currentTable == 2  ? 'active' : ''" @tap="changeTable(2)">学校</view>
			</view>
			<view class="common-datetime flex justify-center">
				<picker mode="multiSelector" :range="pickerList" :value="currentIndex" fields="year"
					@change="bindDateChange">
					{{currentYear}} 年 {{pickerList[1][currentIndex[1]]}}
				</picker>
				<view class="iconfont icon-right"></view>
			</view>
		</view>


		<view class="content">
			<view class="content-top">
				<image src="/static/images/excellent-top.png" class="imgs"></image>
			</view>
			<view class="content-table">
				<view class="content-table-list">
					<uni-table emptyText="暂无优秀学员数据" class="content-table">
						<!-- 表头行 -->
						<uni-tr>
							<uni-th align="center" width="40%" v-if="currentTable == 1">课程</uni-th>
							<uni-th align="center" width="40%" v-else>学校</uni-th>
							<uni-th align="center" width="30%">人数</uni-th>
							<!--        <uni-th align="center" width="30%">姓名</uni-th>-->
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr v-for="(item,index) in excellentList" :key="index">
							<uni-td align="center"><text @click="goExcellentDetail(item.name)">{{item.name}}</text>
							</uni-td>
							<uni-td align="center"><text @click="goExcellentDetail(item.name)">{{item.value}} 人</text>
							</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import doudi from '@/components/doudi.vue';
	export default {
		components: {
			doudi
		},
		data() {
			return {
				currentTable: 1, // 当前标签

				currentYear: 2021, //当前年份
				chineseSeason: '春',
				currentSeason: 0,

				pickerList: [
					[2020,2021, 2022, 2023, 2024],
					['春', '夏', '秋']
				],
				currentIndex: [10, 0],

				title: '优秀学员',
				inputVlaue: '',
				excellentList: [], // 统计数据
				url: '/static/images/doudi/doudi_1.png',

			}
		},
		onLoad(options) {

			let nowDate = new Date();
			this.currentYear = nowDate.getFullYear();

			let springStart = new Date(this.currentYear + "-02-01");
			let summerStart = new Date(this.currentYear + "-07-01");
			let autumnStart = new Date(this.currentYear + "-09-01");

			if (this.comparedate(springStart, nowDate)) {
				this.currentYear = this.currentYear - 1
				this.chineseSeason = '秋'
			} else if (this.comparedate(nowDate, springStart) && this.comparedate(summerStart, nowDate)) {
				this.currentYear = this.currentYear
				this.chineseSeason = '春'
			} else if (this.comparedate(nowDate, summerStart) && this.comparedate(autumnStart, nowDate)) {
				this.currentYear = this.currentYear
				this.chineseSeason = '夏'
			} else {
				this.currentYear = this.currentYear
				this.chineseSeason = '秋'
			}
			
			this.initPicker();
			this.init();
		},
		methods: {
			// 获取统计数据
			init() {
				let that = this;
				this.excellentList = []
				that.$request({
					url: 'course/v2/citation/excellentCount//v2',
					data: {
						type: that.currentTable,
						year: that.currentYear,
						seasonType: that.currentSeason,
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						this.excellentList = res.data.result;

					} else {
						this.excellentList = []
					}
				}).catch(err => {
					console.error('获取优秀学员列表异常', err);
				})
			},
			changeTable(tabeIndex) {
				this.currentTable = tabeIndex
				this.init()
			},
			getInput(e) {
				this.inputVlaue = e.target.value;
				this.excellentList = [];
				this.init();
			},
			bindDateChange: function(e) {
				this.currentIndex = e.detail.value
				this.currentYear = this.pickerList[0][this.currentIndex[0]]
				this.currentSeason = this.currentIndex[1]
				this.init()
			},
			// 打开课程详情页
			goExcellentDetail(keyname) {
				console.log('/pages/home/excellentStudentDetail?type=' + this.currentTable + '&year=' + this.currentYear +
					'&seasonType=' + this.currentSeason + '&keyname=' + keyname)
				uni.navigateTo({
					url: '/pages/home/excellentStudentDetail?type=' + this.currentTable + '&year=' + this
						.currentYear + '&seasonType=' + this.currentSeason + '&keyname=' + keyname
				})
			},
			// 比较日期大小
			comparedate(date1, date2) {
				if (date1.getTime() > date2.getTime()) {
					return true;
				} else {
					return false;
				}
			},
			initPicker() {
				let yearIndex = 0;
				for (let i = 0; i < this.pickerList[0].length; i++) {
					if (this.currentYear == this.pickerList[0][i]) {
						yearIndex = i
						break
					}
				}

				let seasonIndex = 0;
				for (let j = 0; j < this.pickerList[1].length; j++) {
					if (this.chineseSeason == this.pickerList[1][j]) {
						seasonIndex = j
						this.currentSeason = j
						break
					}
				}
				this.currentIndex = [yearIndex, seasonIndex]
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.boxid {
		width: 100%;
		height: 100vh;
		align-items: center;

		.content {
			margin-top: 20rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			background-color: #910000;

			.content-top {
				width: 100%;

				//height: 100vh;
				.imgs {
					width: 100%;
					height: 150rpx;
					//height: 100vh;
					//height:80vh;
				}
			}

			.content-table {
				width: 650rpx;
				background-color: #FFFAB1 !important;
				background: linear-gradient(to right, #FFFAB1, #f3cf13);
				margin-bottom: 40rpx;
				border-radius: 25px;
				padding-top: 30rpx;
				padding-bottom: 30rpx;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;


				.content-table-list {
					width: 600rpx;
				}
			}
		}
	}


	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKIAAsAAAAABkAAAAI9AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApMXwE2AiQDCAsGAAQgBYRtBy8bhAXIDiUJD4mAwwJAQDz8t/Z63+xsgFnlRAJqQBsFpCLUjwxXNUpVV5lq1tV//5cubVlTuDzPmEt1qTGTf/9u5wLborBgNM9XWFBgQbj6xL3TP4E+yKgHlONeNNakSV1AXRxIAe2NUWQllHHD2AUv8DGBBiNmZHbPboowJLNXBeLemiYMFUKyzLJ1Qk3DwSy+6FeXntIXPqLvxz/LMURSFuy6g8vTDhz8HHbyikq1ohIQwiCg4yUKLAGZOGlM7ckJxuU0pPpMgGNVBz+Hq9XAKY5qE+yvsyubwBCUP5PCWylAgscaqQPom3QJ0XH31k0fla7O+/PXx17D/oTP85+hi7390lQJFNBUd7q0YGdK0104wD9L39KvQPD5/NKrT67+H2rM4Md+71pkzYZ5qNuHO/gXioFd2VDZjpQ1RWN/0nGOhgYNqMK+Dv9Tzd0nzoU63RM8tYYzFOpMkZldQqnRCmrU2UCDRefHG3USOZHrseAVILT5RNLiOwptvsnM/qHUo4cabZFDg7PovLDRTNiRHaGmUgdbj2jbUciuS0fi6jyZW78peVXEl0lSG8XFuYVy9pxCkiW2pHdmSZWRJQrwDDxHvh9hLJFLbZ1zVOOt+XluetNcOwpgxA5BmhTpQC2PkNUWCXEwWI1UPp9HjFu+JunoqMuWEZGy46NFcxYGkOf6cFDHo7ySumMsUYohJiIBdAbmEZ8vguLmeS7SpuY4ExKxLfNOLx6qn9veGPzdIWhgW1I4MwrlgzWOAgAA') format('woff2');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-right:before {
		content: "\e609";
	}

	// 注：直接通过var（）来动态修改主题色，可省略组件进行传参
	$theme: #1890FF;
	//$theme: var(--theme);

	.flex {
		display: flex;
	}

	.justify-between {
		justify-content: space-between;
	}

	.date-content {
		margin: 20rpx 0;
		line-height: 70rpx;
		font-size: 26rpx;

		.iconfont {
			font-size: 32rpx;
		}
	}

	.common-datetime {
		color: #222222;
	}

	.switch-date-btn {
		width: 390rpx;
		border: 1rpx solid #CECECE;
		border-radius: 30rpx;
		margin: 0 auto;
	}

	.common-datetime,
	.switch-date-btn view {
		line-height: 60rpx;
	}

	.common-datetime>view {
		font-size: 20rpx;
	}

	.switch-date-btn view {
		padding: 2rpx 26rpx;
		border-radius: 30rpx;
		width: 130rpx;
		font-size: 32rpx;
		text-align: center;
	}

	.switch-date-btn>view.active {
		color: #FFFFFF;
		background: $theme;
	}

	//horizontal样式重置
	.horizontal {
		.common-datetime {
			line-height: 48rpx;
		}

		.switch-date-btn {
			margin: 0;
			border: none;

			&>view {
				line-height: 48rpx;
			}
		}

		.common-datetime {
			&>view {
				font-size: 30rpx;
			}

			.iconfont {
				font-size: 32rpx;
			}
		}

		.switch-date-btn {
			&>view {
				margin-right: 10rpx;
				padding: 2rpx 26rpx;
				border-radius: 30rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
