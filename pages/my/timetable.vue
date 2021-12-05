<template>
	<view class="content">
		<view class="daysTable">
			<Calendar :currentTime='currentDay' @dayChange='dayChange' :mark='mark' :rangeMode='rangeMode'
				:showLunar='false'>
			</Calendar>

		</view>
		<view class="doudi" v-if="!isExistEnlist">
			<view class="doudiBox">
				<image src="/static/images/doudi/doudi_1.png" mode="" class="icon"></image>
				<text>暂无相关信息</text>
			</view>
		</view>
		<view class="classDay" v-else>
			<view class="classTop" @click="goClass">
				<view class="timer">
					{{exerciseName}}
				</view>
				<view class="classInfo">
					<image src="/static/images/my/allPerson.png" mode="" class="icon"></image>
					<text class="text">学生人数:</text>
					<text class="text">{{enlistCount}}</text>
				</view>
				<view class="classInfo" v-for="(item,index) in enlistList" :key="index">
					<text class="text">{{item.sname}}</text>
					<text class="text">{{item.grade_value}}</text>
					<text class="text">{{item.sclass}}</text>
					<text class="text">{{item.student_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from '@/components/Li-Calendar/Li-Calendar.vue';
	export default {
		components: {
			Calendar
		},
		data() {
			return {
				isExistEnlist: false, //
				exerciseName: '', //课程名
				enlistList: '', // 选课学生列表
				enlistCount: '', //报名人数
				goodList: [],
				students: [],
				rangeMode: false,
				mark: [], //上课的人数

				currentDay: '', // 当天的日期
				currentMonth: '', // 当前月
			}
		},
		onLoad() {
			let timer = new Date();
			let month = timer.getMonth() + 1;
			this.currentMonth = timer.getFullYear() + '-' + (month > 9 ? month : '0' + month)
			this.currentDay = timer.getFullYear() + '-' + (month > 9 ? month : '0' + month) + '-' + timer.getDate();
			this.getEnlistCount();
			this.getEnlistList();

		},
		methods: {
			goClass() {
				uni.navigateTo({
					url: './courseDay?dayNum=' + this.currentDay
				})
			},
			dayChange(e) {
				let month = (e.month) > 9 ? (e.month) : "0" + (e.month)
				let currentDay = e.year + '-' + month + '-' + e.day;
				let currentMonth = e.year + '-' + month;
				if (currentMonth != this.currentMonth) {
					this.currentMonth = currentMonth
					this.getEnlistCount()
				}
				if (this.currentDay != currentDay) {
					this.currentDay = currentDay
					this.getEnlistList()
				}
			},
			getEnlistCount() {
				let that = this
				this.$request({
					url: 'course/v2/teacher/current/month/enlistCount',
					data: {
						date: that.currentMonth
					},
					header: {
						"content-type": "application/x-www-form-urlencoded;charset=UTF-8",
						"X-Access-Token": wx.getStorageSync("token")
					},
					method: 'post'
				}).then(res => {
					if (res.data.success) {
						let markList = [];

						res.data.result.forEach(item => {
							markList.push({
								time: item.rdate,
								text: item.count + "人",
								markPoint: true,
								markTextColor: 'blue',
								pointText: '课',
								pointTextColor: 'red'
							})
						})
						this.mark = markList
					} else {
						uni.showToast({
							title: "本月没有课程安排~！",
							icon: 'none'
						});
					}
				})
			},
			getEnlistList() {
				let that = this
				this.$request({
					url: 'course/v2/teacher/current/day/enlists',
					data: {
						date: that.currentDay
					},
					header: {
						"content-type": "application/x-www-form-urlencoded;charset=UTF-8",
						"X-Access-Token": wx.getStorageSync("token")
					},
					method: 'post'
				}).then(res => {
					if (res.data.success) {
						that.enlistCount = res.data.result.length;
						if (that.enlistCount == 0) {
							that.isExistEnlist = false
						} else {
							that.isExistEnlist = true
						}


						res.data.result.forEach(item => {
							that.exerciseName = item.exercise_name
						})
						that.enlistList = res.data.result
					} else {
						that.isExistEnlist = false
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 750rpx;
		height: 100vh;
	}

	.content {
		width: 750rpx;
		height: 100vh;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;

		.doudi {
			width: 100%;
			height: 350rpx;
			position: relative;
			margin-top: 60rpx;

			.doudiBox {
				width: 100%;
				height: 350rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				position: absolute;
				left: 0;
				top: calc(50% -100rpx);

				.icon {
					width: 324rpx;
					height: 286rpx;
				}

				text {
					font-size: 28rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 38rpx;
					color: #BABABA;
					margin-top: -40rpx;
				}
			}
		}

		.daysTable {
			width: 690rpx;
			min-height: 660rpx;
			box-sizing: border-box;
			background-color: #f40;
			padding-bottom: 10rpx;
			overflow: hidden;
			margin-top: 20rpx;
			background: #FFFFFF;
			box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;

			.nameDay {
				width: 100%;
				box-sizing: border-box;
				margin-top: 30rpx;
				min-height: 500rpx;
			}
		}

		.classDay {
			width: 695rpx;
			//min-height: 235rpx;
			margin-top: 30rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;

			.classTop {
				width: 100%;
				min-height: 250rpx;
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #EEEEEE;

				.timer {
					font-size: 42rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 56rpx;
					color: #666666;
					opacity: 1;
				}

				.classInfo {
					width: 100%;
					height: 40rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-top: 10rpx;

					.icon {
						width: 36rpx;
						height: 22rpx;
					}

					.text {
						font-size: 25rpx;
						font-family: PingFang SC;
						font-weight: 500;
						margin-left: 20rpx;
						color: #999;
						opacity: 1;
					}
				}
			}
		}
	}
</style>
