<template>
	<view class="content">
		<view class="myBox">
			<image src="../../static/images/auth/auth.png" mode="" class="mybg"></image>
		</view>
		<view class="my_nav">
			<view class="mybottom">
               <image :src="avater" mode="" class="mybottom_avter"></image>
			</view>
		</view>
		<view class="my_content">
			<view class="my_navBox">
				<view class="nav_title">
					请完成个人信息填写
				</view>
				<view class="input_box">
					<input type="number" v-model="name" placeholder="请输入姓名" />
					<view class="input_right">
						<!-- <image src="../../static/images/auth/phone.png" mode="" class="phone"></image> -->
					</view>
				</view>
				<view class="input_box">
					<input type="number" v-model="phone" placeholder="请输入手机号" />
					<view class="input_right">
						<!-- <image src="../../static/images/auth/phone.png" mode="" class="phone"></image> -->
					</view>
				</view>
			</view>
		</view>
		<view class="loginBtn">
			<view class="loginBox"  @click="getItemList()">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avater:'',
				arrayClass:['女','男'],
				index:1,
				name:'',
				sex:'',
				phone:''
			}
		},
		onLoad() {
			let that = this;
             const value = uni.getStorageSync('userInfo');
			 that.avater = value.avatar;
			 that.phone = value.mobile;
			 that.name = value.nickname;
		},
		methods: {
			getHome() {
				   uni.switchTab({
				   	url: '../home/index'
				   })
			},
			// 修改 个人信息
			getItemList() {
				let that = this;
				this.$request({
					url: '/course/users/edit',
					data: {
						"avatar": that.avater,
						"mobile": that.phone,
						"nickname": that.name,
						"usex": that.index
					},
					method: 'put'
				}).then(res => {
					if (res.data.success) {
						uni.showToast({
							title: '成功',
							icon: 'none'
						});
						let userObj = {
							nickname: that.name,
							mobile: that.phone,
							avatar: that.avater
						}
						uni.setStorage({
							key: 'userInfo',
							data: userObj,
							success: function() {
								that.getHome();
							}
						});

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
		background-color: #668BFE;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.myBox {
			width: 100%;
			height: 320rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to right, #8101FB, #475EFF);

			.mybg {
				width: 100%;
				height: 320rpx;
			}
		}

		.my_nav {
			width: 100%;
			height: 80rpx;
			margin-top: -40rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.mybottom {
				width: 520rpx;
				// height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.mybottom_avter{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					border: 1rpx solid #FFFFFF;
					box-shadow: 0px 6rpx 12rpx rgba(53, 77, 233, 0.4);
				}
			}
		}

		.my_content {
			width: 100%;
			min-height: 500rpx;
			padding: 0 75rpx;
			box-sizing: border-box;
			margin-top: 50rpx;

			.my_navBox {
				width: 600rpx;
				min-height: 482rpx;
				background: rgba(255, 255, 255, 0.3);
				box-shadow: 0px 12rpx 12rpx rgba(53, 77, 233, 0.6);
				// opacity: 0.3;
				border-radius: 8rpx;
				padding: 40rpx;
				box-sizing: border-box;

				.nav_title {

					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					line-height: 40rpx;
					color: #666666;
				}

				.input_box {
					width: 520rpx;
					height: 80rpx;
					margin-top: 30rpx;
					border-bottom: 2rpx solid #C9C9C9;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;

					input {
						width: 320rpx;
						height: 40rpx;
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;

						color: #333;
					}

					.input_right {
						width: 190rpx;
						height: 100%;
						display: flex;
						justify-content: flex-end;
						align-items: flex-end;
						margin-bottom: 10rpx;

						.phone {
							width: 25rpx;
							height: 30rpx;
							// background-color: #f40;
						}

						.getinfo {
							max-width: 190rpx;
							height: 40rpx;
							background: linear-gradient(90deg, #7C09FB 0%, #334FE9 100%);
							opacity: 1;
							border-radius: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 0 10rpx;

							// box-sizing: border-box;
							text {
								font-size: 24rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								line-height: 40rpx;
								color: #FFFFFF;
							}
						}

						.gettimer {
							font-size: 20rpx;
							font-family: Source Han Sans CN;
							font-weight: 300;
							line-height: 40rpx;
							color: #AEAEAE;
						}
					}
				}
			}
		}

		.loginBtn {
			width: 100%;
			height: 90rpx;
			padding: 0 75rpx;
			box-sizing: border-box;
			margin-top: 82rpx;

			.loginBox {
				width: 600rpx;
				height: 80rpx;
				background: linear-gradient(90deg, #7C09FB 0%, #334FE9 100%);
				box-shadow: 0px 6rpx 12rpx rgba(53, 77, 233, 0.6);
				opacity: 1;
				border-radius: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					font-size: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
