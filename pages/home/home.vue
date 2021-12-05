<template>
	<view class="content">
		<view class="serchBox" @click="goSerch">
			<image src="/static/images/home/serach.png" mode="aspectFit" class="serchIcon"></image>
			<text class="icontext">搜索课程/资讯</text>
		</view>
		<view class="swiperBox">
      <image v-if="bannerList.length == 1" :src="bannerList[0].url" mode="aspectFill" style="width: 706rpx;height: 280rpx" @click="navclick(bannerList[0].link,bannerList[0].type)"></image>
			<swiper v-else class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerList" :key="index" >
					<image :src="item.url" mode="" class="swiper-item" @click="navclick(item.link,item.type)"></image>
				</swiper-item>
				<!-- <swiper-item>
					<image src="/static/images/home/banner2.png" mode="" class="swiper-item"></image>
				</swiper-item> -->
			</swiper>
		</view>
		<view class="itemBox" @click="allClass">
			<image v-if="configValue.length > 0" :src="configValue[0]" mode="" class="itembg"></image>
			<image v-else src="https://image.course.ahbsh.top/temp/1_1621485885171.png" mode="" class="itembg"></image>
		</view>
		<view class="itemBox" @click="selectClass">
			<image v-if="configValue.length > 0" :src="configValue[1]" mode="" class="itembg"></image>
			<image v-else src="https://image.course.ahbsh.top/temp/2_1621485895245.png" mode="" class="itembg"></image>
		</view>
		<view class="itemBox" @click="goStudent">
			<image v-if="configValue.length > 0" :src="configValue[2]" mode="" class="itembg"></image>
			<image v-else src="https://image.course.ahbsh.top/temp/3_1621511054858.png" mode="" class="itembg"></image>
		</view>
		<view class="itemBox" @click="goExpress">
			<image v-if="configValue.length > 0" :src="configValue[3]" mode="" class="itembg"></image>
			<image v-else src="https://image.course.ahbsh.top/temp/4_1621485907031.png" mode="" class="itembg"></image>
		</view>
		<view class="popcover" v-if="tipsCode">
			<view class="mycontent1">
				<view class="notice">
					<image src="/static/images/my/notics.png" mode="aspectFit" class="icon"></image>
				</view>
				<view class="textcent">
					<!-- <text class="bgText">未在选课时间内</text> -->
					<text>{{tipsmessage}}</text>
				</view>
				<view class="btnBox">
					<view class="btnName" @click="goClear" style="background-color: #3E8BF3;">
						<text>知道了</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { shareMixins} from '@/mixins'

	export default {
    mixins: [ shareMixins],
		data() {
			return {
				tipsCode: false,
				tipsmessage: '',
				bannerList: [],
				configValue: [],
				startTime: '',
				endTime: '',
				isTeacherCode: false,
        shareData: {
          title: '庐阳校外',
          path: '/pages/index/index' // 分享的页面路径
        },
        userType : 1,
			}
		},
		onLoad() {
			this.getBanner();
		},
		onShow() {
      let dataType = uni.getStorageSync('userType') ;
      this.userType == dataType;
      if(dataType == 2 ){
        this.isTeacherCode = true;
      }else{
        this.isTeacherCode = false;
      }
		},
		methods: {
			getBanner() {
				let that = this;
				this.$request({
					url: 'course/v2/index/index',
					data: {},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datainfo = res.data.result;
						that.bannerList = datainfo.banners
						if (res.data.config == null) {
							that.startTime = datainfo.config.startTime;
							that.endTime = datainfo.config.endTime;
							let bgImgs = datainfo.config.configValue
							that.configValue = JSON.parse(bgImgs);
						}

					}
				}).catch(err => {
					console.error('获取家庭列表异常', err);
				})
			},
			goClear() {
				this.tipsCode = !this.tipsCode;
			},
			allClass() {
				uni.navigateTo({
					url: '/pages/home/allClass'
				})
			},
			selectClass() {
			  // 直接进入选课中心页面
        uni.navigateTo({
          url: '/pages/home/selectContent'
        })
			},
			goSerch() {
				uni.navigateTo({
					url: '/pages/home/search'
				})
			},
			goStudent() {
				uni.navigateTo({
					url: '/pages/home/excellentStudents'
				})
			},
			goExpress() {
				uni.navigateTo({
					url: '/pages/news/index'
				})
			},
      navclick(id,type){
			  if (type==0){
          uni.navigateTo({
            url: "/pages/news/newsDetail?prop=" + id
          })
        }else{
          uni.navigateTo({
            url:'/pages/home/allDetail?clssid='+id+'&ids='+'' +'&start='+''+'&end='+''+'&isClass='+'1002'
          })
        }

      }
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}

	.content {
		width: 750rpx;
		height: 100vh;
		background-color: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;

		.serchBox {
			width: 705rpx;
			height: 72rpx;
			margin-top: 20rpx;
			background: #F1F1F1;
			opacity: 0.82;
			border-radius: 85rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.serchIcon {
				width: 22rpx;
				height: 23rpx;
				// background-color: #f40;
			}

			.icontext {
				margin-left: 10rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 54rpx;
				color: #999999;
				opacity: 1;
			}
		}

		.swiperBox {
			width: 750rpx;
			height: 300rpx;
			margin-top: 10rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.swiper {
				width: 706rpx;
				height: 280rpx;

				.swiper-item {
					width: 706rpx;
					height: 280rpx;
					// background-color: #f40;
				}
			}
		}

		.itemBox {
			width: 685rpx;
			height: 200rpx;
			// background-color: #A4C3FB;
			border-radius: 12rpx;
			position: relative;
			margin-top: 20rpx;

			.itembg {
				width: 685rpx;
				height: 260rpx;
			}

			.itemTitle {
				width: 245rpx;
				height: 90rpx;
				position: absolute;
				left: 60rpx;
				top: 32rpx;
				font-size: 80rpx;
			}

			.itemIcon {
				width: 245rpx;
				height: 125rpx;
				position: absolute;
				top: 38rpx;
				right: 45rpx;
			}

			.itemIcon2 {
				width: 165rpx;
				height: 178rpx;
				position: absolute;
				top: 15rpx;
				right: 85rpx;
			}

			.itemIcon3 {
				width: 165rpx;
				height: 165rpx;
				position: absolute;
				top: 24rpx;
				right: 72rpx;
			}

			.itemIcon4 {
				width: 112rpx;
				height: 167rpx;
				position: absolute;
				top: 22rpx;
				right: 110rpx;
			}
		}

		.popcover {
			width: 750rpx;
			height: 100vh;
			background-color: rgba(0, 0, 0, .56);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99999;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;

			.mycontent1 {
				width: 400rpx;
				height: 300rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 10rpx;

				.notice {
					//width: 600rpx;
					height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.icon {
						width: 65rpx;
						height: 65rpx;
					}
				}

				.textcent {
					width: 360rpx;
					height: 100rpx;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.bgText {
						font-size: 35rpx;
						font-family: Source Han Sans SC;
						font-weight: 500;
						line-height: 70rpx;
						color: #666666;
						// letter-spacing: 42rpx;
						opacity: 1;
					}

					text {
						font-size: 23rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						line-height: 31rpx;
						color: #999999;
						opacity: 1;
					}
				}

				.btnBox {
					width: 400rpx;
					height: 100rpx;
					margin-top: 10rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.btnName {
						width: 140rpx;
						height: 50rpx;
						background: #BEBEBE;
						opacity: 1;
						border-radius: 36rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							font-size: 25rpx;
							font-family: Source Han Sans SC;
							font-weight: 400;
							line-height: 72rpx;
							color: #FFFFFF;
							opacity: 1;
						}
					}
				}
			}

			.imgsBox {
				width: 100%;
				height: 60rpx;
				margin-top: 30rpx;

				.imgs {
					width: 60rpx;
					height: 60rpx;
					display: block;
					margin: 0 auto;
					border-radius: 50%;
					// background-color: #f40;
				}
			}
		}

	}
</style>
