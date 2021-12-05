<template>
	<view class="">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header>
		<view class="itemsBoxs">
			<view class="itemsnav" v-if="dataObject.length > 0" v-for="(item,index) in dataObject" @click="goMyevalution(item,item.exerciseStatus)">
				<view class="itemstitle">
					<!-- 2021寒假初二物理安徽-精品班1班 -->
					{{item.courseExercise.ename}}-{{item.courseExercise.edesc}}
				</view>
				<view class="itemstime">
					<image src="../../static/images/home/timer.png" mode="" class="timeImgs"></image>
					<text>{{item.courseExercise.eclassEndTime[1]}}月{{item.courseExercise.eclassEndTime[2]}}日结课</text>
				</view>
				<view class="itemsmap">
					<view class="itemsmap_left">
						<image src="../../static/images/home/fixed.png" mode="" class="timeImgs"></image>
						<text>{{item.courseClassAddress.aname}}{{item.courseClassAddress.aadress}}</text>
					</view>
					<view class="itemsmap_right">
							<view class="itemsMap_right_box" v-if="item.exerciseStatus == 3">
								<text>已评价</text>
							</view>
							<view class="itemsMap_right_color" v-else >
								<text>去评价</text>
							</view>
					</view>

				</view>
			</view>
			
			<doudi v-if="dataObject.length == 0" :url="url"></doudi>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import util from '@/utils/util.js';
	import doudi from '@/components/doudi.vue';
	export default {
		components: {
			navBar,
			customHeader,
			doudi
		},
		data() {
			return {
				title: '课程评价',
				dataObject: [],
				url:'/static/images/doudi/doudi_1.png',
			}
		},
		onShow() {
			this.getEvalutionList();
		},
		methods: {
			goMyevalution(prop,type) {
				if(type == 3){
					uni.navigateTo({   // 已评价
						url: './evluationPage?evlationId='+prop.id+'&type=01'+'&name='+prop.courseExercise.ename+'&desc='+prop.courseExercise.edesc
					})
				}else{ 
					uni.navigateTo({  //去评价
						url: './evluationPage?evlationId='+prop.id+'&type=02'+'&name='+prop.courseExercise.ename+'&desc='+prop.courseExercise.edesc
					})
				}
				
			},
			// 获取 评价列表
			getEvalutionList() {
				let that = this;
				this.$request({
					url: '/course/comment/queryCommentlist',
					data: {
						pageNo: 1,
						pageSize: 100
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result;
						for (let item of datalist) {
							// item.courseExercise.eclassBeginsTime = util.split_time(item.courseExercise.eclassBeginsTime);
							item.courseExercise.eclassEndTime = util.split_time(item.courseExercise.eclassEndTime)
						}
						that.dataObject = datalist;

					}
				}).catch(err => {
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.itemsBoxs {
		width: 100%;
		min-height: 175rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;

		.itemsnav {
			width: 100%;
			min-height: 175rpx;
			border-radius: 12rpx;
			background-color: #FFFFFF;
			padding: 30rpx 0 30rpx 30rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;

			.itemstitle {
				width: 454rpx;
				height: 28rpx;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
				color: #666;
			}

			.itemstime {
				width: 100%;
				height: 25rpx;
				margin-top: 15rpx;

				.timeImgs {
					width: 24rpx;
					height: 23rpx;
					// background: #5D5DFF;
					opacity: 1;
				}

				text {
					width: 250rpx;
					height: 24rpx;
					margin-left: 10rpx;
					font-size: 24rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 24rpx;
					color: #5D5DFF;
				}
			}

			.itemsmap {
				width: 100%;
				height: 50rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				// margin-bottom: 10rpx;
				.itemsmap_left {
					flex: 1;
					height: 100%;

					.timeImgs {
						width: 28rpx;
						height: 28rpx;
						// background: #5D5DFF;
						opacity: 1;
					}

					text {
						width: 250rpx;
						height: 24rpx;
						margin-left: 10rpx;
						font-size: 24rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 24rpx;
						color: #7D7D7D;
					}
				}

				.itemsmap_right {
					flex: 1;
					height: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					.itemsMap_right_box {
						width: 110rpx;
						height: 42rpx;
						background: #FCD0C3;
						opacity: 1;
						border-radius: 8rpx 0 0 8rpx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							font-size: 24rpx;
							font-family: SourceHanSansCN-Regular;
							line-height: 42rpx;
							color: #FB501B;
						}
					}

					.itemsMap_right_color {
						width: 110rpx;
						height: 42rpx;
						background: #E8E8FF;
						opacity: 1;
						border-radius: 8rpx 0 0 8rpx;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							font-size: 24rpx;
							font-family: SourceHanSansCN-Regular;
							line-height: 42rpx;
							color: #5D5DFF;
						}
					}
				}
			}
		}
	}
</style>
