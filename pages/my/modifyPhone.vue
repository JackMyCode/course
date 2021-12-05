<template>
	<view class="">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header>
		<view class="tips">
			<text>当前手机号:1365555666</text>
			<text>更换手机号后，下次登录可使用新手机号</text>
		</view>
		<view class="myfamliy_items">
			<view class="items_input">
				<input type="text" v-model="dataObject.nickname" placeholder="请输入新手机号" />
			</view>
		</view>
		<view class="myfamliy_items">
			<view class="items_input">
				<input type="text" v-model="dataObject.nickname" placeholder="请输入验证码" />
			</view>
			<view class="items_name">
				<view class="itemsBox">
					获取验证码
				</view>
			</view>
		</view>
		<view class="buttonBox">
			<view class="bottom_btn" @click="getMyclick()">
				<text>确认</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import doudi from '@/components/doudi.vue';
	export default {
		components: {
			navBar,
			customHeader,
			doudi
		},
		data() {
			return {
				title: '修改手机号',
				url: '/static/images/doudi/doudi_2.png',
				dataObject: {},
				avater: '',
				name: '',
				sex: '',
				phone: '',
				arrayClass: ['女', '男'],
				index: 0
			}
		},
		onLoad(options) {
			this.avater = options.avater;
			this.name = options.name;
			this.sex = options.sex;
			this.phone = options.phone;
			this.index = options.sex
		},
		onShow() {},
		methods: {
			getCheck(e) {

				this.index = e.target.value
			},
			goMyevalution() {
				uni.navigateTo({
					url: './evluationPage'
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
								uni.navigateBack()
							}
						});

					}
				}).catch(err => {
				})
			},
			// 获取头像
			getAvater() {
				let that = this;
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						// 预览图片
						// that.avater = res.tempFilePaths[0];
						that.upLond(res.tempFilePaths[0])
					}
				});
			},
			// 修改 个人信息
			upLond(path) {
				let that = this;
				that.$httpAvater({
					url: "/course/common/upload",
					data: path,
					type: 'course'
				}).then(res => {

					that.avater = res;
				}).catch(err => {
					uni.showToast({
						title: '网络异常 请稍后重试~',
						icon: 'none'
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tips {
		width: 100%;
		height: 180rpx;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
		padding: 0 30rpx;
		box-sizing: border-box;

		text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 40rpx;
			color: #333333;
			opacity: 1;
		}
	}

	.myfamliy_items {
		width: 100%;
		height: 120rpx;
		background: #FFFFFF;
		opacity: 1;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #eee;

		.items_input {
			flex: 4.3;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			input {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 40rpx;
				color: #666;
			}
		}

		.items_name {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.itemsBox {
				width: 185rpx;
				height: 70rpx;
				background: #7575FF;
				opacity: 1;
				border-radius: 36rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 70rpx;
				color: #FFFFFF;
				opacity: 1;
			}
		}
	}

	.buttonBox {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		position: fixed;
		bottom: 0;
		left: 0;

		.bottom_btn {
			width: 600rpx;
			height: 72rpx;
			background: #7575FF;
			opacity: 1;
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 40rpx;
				color: #F8F4F4;
			}
		}
	}
</style>
