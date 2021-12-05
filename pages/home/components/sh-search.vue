<template>
	 
	<view class="search x-c" style="background:linear-gradient(90deg,rgba(124,144,255,1) 0%,rgba(93,93,255,1) 100%);" >
		<view class="title-left">
			<text>{{addressCity}}</text>
		</view>
		<view class="search-box x-c shopro-selector-rect" @click="jump('/pages/goods/list')">
			<image src="../../../static/img/search-img.png" mode="widthFix" style="width: 32rpx;height: 32rpx;margin-right: 6rpx;"></image>
			<input type="text" disabled>
			<text class="search-val">搜索</text>
		</view>
		<!-- <image src="../../../static/img/scan-code.png" mode="widthFix" style="width: 40rpx;height: 40rpx;margin: 26rpx;" @click="scanCode()"></image> -->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
			};
		},
		props: {
			detail: {
				type: Object,
				default: null
			},
			addressCity: {
				type: String,
				default: '爱德帮'
			}
		},
		create(){

		},
		computed: {},
		methods: {
			scanCode(){
				let that = this;
				if (uni.getStorageSync('type') == 3){
					uni.scanCode({
						success: function (res) {
							that.jump("/pages/index/scanCodeDetail",{'order_id':res.result})
						}
					});
				}

			},
			jump(path, params) {
				this.$Router.push({
					path: path,
					params: params
				});
			}
		}
	};
</script>

<style lang="scss">
	.title-left {
		display: flex;
		justify-content: center;
		width: 180rpx;
		color: #FFFFFF;
		.address-img {
			margin-right: 8rpx;
			width: 30rpx;
			height: 40rpx;
		}
	}

	.active {
		transition: all linear 0.3s;
	}

	.search {
		height: 120rpx;
		width: 100%;
		background: #fff;
		transition: all linear 0.3s;
	}

	.search-box {
		height: 64rpx;
		width: 100%;
		background: #f5f5f5;
		border-radius: 60rpx;
		background: #C8CEFE;
		.cuIcon-search {
			font-size: 36rpx;
			margin-right: 20rpx;
		}

		.search-val {
			font-size: 30rpx;
			color: #FFFFFF;
		}
		input{
			width: 340rpx;
			color: #FFFFFF;
		}

	}
</style>
