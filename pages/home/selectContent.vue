<template>
	<view class="content">
    <view class="sticky-box">
      <view style="text-align: center;width: 100%"><text class="textcenter">{{ tipMsg }}</text></view>
    </view>
		<view class="mySearchBox">
			<view class="searchBox">
				<view class="input_box">
					<image src="../../static/images/home/serach.png" mode="" class="serachicon"></image>
					<input type="text" @confirm="getInput" v-model="value" placeholder="搜索课程" />
				</view>
				<view class="btn" @click="init">
					<text>搜索</text>
				</view>
			</view>
		</view>

		<view class="itemsContent" v-if="exerciseList.length > 0">
			<view class="itemscommon" v-for="(item,index) in exerciseList" :key="item"
				@click="goSelectClassDetail(item.exercise_id,item.receive_id,index)">
				<image v-if="item.eimg == '' || item.eimg == null" src="/static/images/home/noimgs.png"
					mode="aspectFill" class="imgs"></image>
				<image v-else :src="item.eimg" mode="aspectFill" class="imgs"></image>
<!--				<view class="overhead" v-if="item.course_top == 1">-->
<!--					<text>顶置</text>-->
<!--				</view>-->
				<view class="title" style="text-align: left;padding-left: 20rpx;">
					{{item.ename}}
				</view>
				<view class="rate">
					<view class="rateBox">
						<text class="rateStart" style="margin-right: 7rpx;">报名人数</text>
						<view class="progress">
							<progress-line :isDotX='item.isShow' activeColor="#3E8BF3" :levlNow="item.enlist_count"
								:levlEnd="item.enlist_total"></progress-line>
						</view>
						<text class="rateStart" style="margin-left: 9rpx;"> {{item.enlist_count}} /{{item.enlist_total}}</text>
					</view>
				</view>
				<image v-if="item.enlist_count == item.enlist_total" src="/static/images/home/allStudent.png" mode="" class="allStudent"></image>
			</view>
		</view>
      <block v-else>
      <doudi  :url="nullImg"></doudi>
    </block>
	</view>
</template>
<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import rate from '@/components/rate.vue';
	import progressLine from "@/components/progress-line.vue"
  import doudi from '@/components/doudi.vue';
	export default {
		components: {
			navBar,
			customHeader,
			rate,
			progressLine,
      doudi
		},
		data() {
			return {
        tipMsg : '', // 当isCurrent为false显示此提示信息
				exerciseList: [],
        value:'', // 搜索关键字
        nullImg : '/static/images/doudi/doudi_1.png'
			}
		},
		onShow() {
			this.exerciseList = [];
			this.init();
		},
		methods: {

			// 获取课程列表
			init() {
				let that = this;
				that.$request({
					url: 'course/v2/enlist/exercise/enlistCenter',
					data: {
						key: that.value,
					},
					method: 'get',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
						"X-Access-Token": wx.getStorageSync("token")
					}
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result;
						if (datalist.code == 1 || datalist.code == 2 || datalist.code == 3){
						  // 当前存在选课信息
              this.exerciseList = datalist.exercise;
              // 提示信息变更
              this.tipMsg = datalist.date + "开设课程"
            }else{
              this.tipMsg = '暂无选课信息，请稍后再进行访问'
            }
					}else{
            this.exerciseList = []
          }
				}).catch(err => {
				})
			},
      // 跳转到选课中心的课程详情页面
      goSelectClassDetail(exerciseId, receiveId, index) {
        uni.navigateTo({
          url: '/pages/home/selectClassDetail?clssid=' + exerciseId + '&ids=' + receiveId + '&start=' + this.exerciseList[index]
              .enlist_count + '&end=' + this.exerciseList[index].enlist_total + '&isClass=' + '1001'
        })
      },
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
  .sticky-box {
    /* #ifndef APP-PLUS-NVUE */
    display: flex;
    position: -webkit-sticky;
    /* #endif */
    position: sticky;
    top: var(--window-top);
    z-index: 99;
    flex-direction: row;
    margin: 0px;
    padding: 10rpx 0 10rpx 0;
    background-color: #AFCDFF;
    //border-bottom-style: solid;
    //border-bottom-color: #E2E2E2;
  }

	.content {
		width: 100%;
		height: 100%;
		background-color: #F3F3F3;

		.mySearchBox {
			width: 100%;
			height: auto;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			// background: linear-gradient(to right, #8101FB, #475EFF);
			display: flex;
			justify-content: center;
			align-items: center;

			.searchBox {
				width: 100%;
				height: 85rpx;
				opacity: 0.82;
				border-radius: 42rpx;
				background: #EBEBEB;
				margin-top: 10rpx;
				padding: 0rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;


				.input_box {
					width: 400rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.serachicon {
						width: 31rpx;
						height: 31rpx;
						// background-color: #f40;
						margin-right: 10rpx;
					}

					.defult {
						color: #AFAFAF;
					}

					input {

						font-size: 28rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 54rpx;
						color: #333;
						// letter-spacing: 120px;
						opacity: 1;
					}

				}

				.btn {
					width: 128rpx;
					height: 60rpx;
					opacity: 1;
					border-radius: 42rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 29rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						line-height: 53rpx;
						color: #3E8BF3;
						opacity: 1;
					}
				}
			}
		}

		.itemsContent {
			width: 100%;
			height: auto;
			padding: 20rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			background-color: #FFFFFF;

			.itemscommon {
				width: 342rpx;
				height: 316rpx;
				margin-top: 20rpx;
				position: relative;
				padding-bottom: 20rpx;
				background: #FFFFFF;
				box-shadow: 6rpx 6rpx 12rpx rgba(0, 0, 0, 0.08);
				opacity: 1;
				border-radius: 8rpx;

				.imgs {
					width: 100%;
					height: 192rpx;
					display: block;
					margin: 10rpx auto;
				}

				.title {
					text-align: center;
					width: 310rpx;
					font-size: 30rpx;
					font-weight: 500;
					line-height: 38rpx;
					color: #2A2A2A;
					opacity: 1;
					margin-top: 10rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					// display: -webkit-box;
					// -webkit-box-orient: vertical;
					// -webkit-line-clamp: 3;
					// overflow: hidden;
				}

				.desc {
					width: 288rpx;
					height: 34rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 38rpx;
					color: #666666;
					opacity: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.rate {
					width: 100%;
					height: 40rpx;

					margin-top: 25rpx;
					padding-left: 10rpx;
					box-sizing: border-box;

					.rateBox {
						width: 306rpx;
						height: 40rpx;
						background: #E6E6E6;
						opacity: 1;
						border-radius: 14rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.progress {
							width: 180rpx;
							height: 15rpx;
							// display: flex;
							// justify-content: center;
							// align-items: center;
						}

						.rateStart {
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 38rpx;
							color: #333;
							opacity: 1;
						}
					}

				}

				.allStudent {
					width: 75rpx;
					height: 75rpx;
					position: absolute;
					right: 30rpx;
					bottom: 80rpx;
					z-index: 2;
				}
			}

		}
	}
</style>
