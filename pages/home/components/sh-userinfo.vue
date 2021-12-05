<template>
	<view>
		<view class="sh-userinfo-box" >
			<view class="head-wrap pad">
				<view class="titleNav ">
					<view class="status-bar"></view>
				</view>
				<view class="user-head x-bc" >
					<view class="x-f">
						<!-- 微信小程序 -->
						<view class="info-box">
							<view class="x-f">
								<view class="head-img-wrap">
									<image class="head-img" @tap.stop="jump('/pages/user/info')" :src="detail.headimg || '/static/imgs/base_avatar.png'" mode="aspectFill"></image>
								</view>
								<text @tap.stop="jump('/pages/user/info')" class="user-name one-t">{{ detail.nickname || '请登录~' }}
									<view style="display: flex;">
										<view class="shop-box">
											手机号：{{detail.phone}}
										</view>

									</view>
								</text>

							</view>
						</view>
					</view>
<!--					<button class="cu-btn code-btn" v-if="detail.headimg" @tap.stop="jump('/pages/public/poster/index', { posterType: 'user' })">-->
<!--						<text class="cuIcon-qr_code"></text>-->
<!--					</button>-->
				</view>
				<view class="wallet-box" v-if="0">
					<view class="wallet-line"></view>
					<view class="wallet-content">
						<text>{{detail.userMoney||'0.00'}}</text>
						<p>余额</p>
					</view>
					<view class="wallet-content">
						<text>{{detail.rewardMoney||'0.00'}}</text>
						<p>收益</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			userInfo:{
			},
			isRefresh: false //更新
		};
	},
	computed: {

	},

	props: {
		detail: {
			type: Object,
			default: null
		},
		token:{
			type:String,
			default:null
		}
	},
	methods: {
		jump(path, query) {
			if(!this.token || this.token == null){
				path = '/pages/public/login'
			}
			this.$Router.push({
				path: path,
				query: query
			});
		},
		// 更新信息
		onRefresh() {
			const that = this;
			that.isRefresh = true;
			setTimeout(() => {
				that.isRefresh = false;
			}, 200);
		}
	}
};
</script>

<style lang="scss">
.sh-userinfo-box {
	position: relative;
	height: 260rpx;
	background: linear-gradient(180deg,rgba(124,144,255,1) 0%,rgba(100,100,255,1) 100%);
	border-radius: 0px 0px 60px 0px;
	.user-bg {
		width: 100%;
		height: 320rpx;
	}
	.head-wrap {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		z-index: 9;
		top: 0;
		.nav-title {
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fff;
		}
		.status-bar {
			// #ifndef H5
			height: var(--status-bar-height);
			// #endif
			// #ifdef H5
			height: 50rpx;
			// #endif
			width: 750rpx;
		}
	}

	.user-head {
		padding-top: 50rpx;
		.info-box {
			// padding: 0 20rpx;
			.head-img-wrap {
				position: relative;
				.refresh-btn {
					position: absolute;
					padding: 0;
					background: none;
					width: 34rpx;
					height: 34rpx;
					border-radius: 50%;
					background: #c9912c;
					top: 0;
					right: 20rpx;
					.cuIcon-refresh {
						color: #fff;
						font-size: 24rpx;
					}
					.refresh-rotate {
						transform: rotate(360deg);
						transition: all 0.2s;
					}
				}
			}
			.head-img {
				width: 94rpx;
				height: 94rpx;
				border-radius: 50%;
				background: #ccc;
				margin-right: 25rpx;
				overflow: hidden;
			}

			.user-name {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
				line-height: 30rpx;
				width: 360rpx;
			}
		}
		.tag-box {
			background: rgba(0, 0, 0, 0.2);
			border-radius: 21rpx;
			line-height: 38rpx;
			padding-right: 10rpx;
			margin-left: 10rpx;
			.cuIcon-refresh {
				color: #fff;
				margin: 0 10rpx;
			}
			.tag-img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 6rpx;
				border-radius: 50%;
			}

			.tag-title {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 20rpx;
			}
		}
		.code-btn {
			background: none;
			.cuIcon-qr_code {
				font-size: 50rpx;
				color: #fff;
			}
		}
	}
	.wallet {
		font-size: 20rpx;
		padding-left: 140rpx;
		.money {
			margin-right: 40rpx;
		}
	}
}
// 绑定微信公众号
.notice-box {
	width: 750rpx;
	height: 70rpx;
	background: rgba(253, 239, 216, 1);
	padding: 0 35rpx;

	.notice-detail {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(204, 149, 59, 1);
	}

	.bindPhone {
		width: 135rpx;
		height: 52rpx;
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		border-radius: 26rpx;
		padding: 0;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}
.wallet-box{
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	line-height: 50rpx;
	position: relative;
	.wallet-content{
		width: 50%;
		text-align: center;
		color: #FFFFFF;
	}
	.wallet-line{
		height: 40rpx;
		width: 1px;
		position: absolute;
		top: 50%;
		left: 50%;
		background: #fff;
		transform: translate(-50%,-50%);
	}
}
.shop-box{
	font-size: 26rpx;
	font-weight: 700;
	opacity:1;
	border-radius:16rpx;
	margin: 12rpx 20rpx 0 0;
}
</style>
