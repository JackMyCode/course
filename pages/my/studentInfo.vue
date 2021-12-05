<template>
	<view class="">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header>
		<!-- <doudi :url="url"></doudi> -->
		<view class="myavater"  @click="getAvater">
			<image v-if="avatar == null || avatar == '' " src="/static/images/my/myavate.png" mode="aspectFill" class="avater"></image>
			<image v-else :src="avatar" mode="aspectFill" class="avater"></image>
			 <image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
		</view>
		<view class="myfamliy_items">
			<view class="items_name">
				<text>昵称：</text>
			</view>
			<view class="items_input">
				<input type="text"  v-model="dataObject.nickname" placeholder="请输入姓名" />
			</view>
		</view>
		<view class="myfamliy_items" @click="goModify">
			<view class="items_name">
				<text>手机号：</text>
			</view>
			<view class="items_input">
				<input type="number"  disabled="disabled" v-model="dataObject.mobile" placeholder="请输入家庭角色" />
				 <image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
			</view>
		</view>

		<view class="buttonBox">
			<view class="bottom_btn" @click="getMyclick()">
				<text>修改</text>
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
				title: '个人信息',
				url: '/static/images/doudi/doudi_2.png',
				dataObject: {},
				avatar: ''
			}
		},
		onLoad() {},
		onShow() {
			let that = this;
			const value = uni.getStorageSync('userInfo');
			that.avatar = value.avatar
			this.getItemList();
		},
		methods: {
			goModify(){
				uni.navigateTo({
					url:'./modifyPhone'
				})
			},
			goMyevalution() {
				uni.navigateTo({
					url: './evluationPage'
				})
			},
			// 获取 个人信息
			getItemList() {
				let that = this;
				this.$request({
					url: '/course/users/queryById',
					data: {},
					method: 'get'
				}).then(res => {

					if (res.data.success) {
						that.dataObject = res.data.result;
						if (res.data.result.avatar != 'null') {
							that.avatar = res.data.result.avatar
						}

					}
				}).catch(err => {
				})
			},
			getMyclick() {
				let dataList = this.dataObject;
				uni.navigateTo({
					url: './studentEdtil?name=' + dataList.nickname + '&sex=' + dataList.usex + '&phone=' + dataList.mobile +
						'&avater=' + this.avatar
				})
			},
			// 获取头像
			getAvater() {
				let that = this;
				uni.showActionSheet({
				    itemList: ['相册', '拍照'],
				    success: function (res) {
						let carmer = 'album';
						if(res.tapIndex  == 1){
						  carmer = 'camera';
						}
						uni.chooseImage({
							count: 6,
							sizeType: ['original', 'compressed'],
							sourceType: [carmer],
							success: function(res) {

								that.upLond(res.tempFilePaths[0])
							}
						});
				    },
				    fail: function (res) {
				    }
				});
				
			},
			// 修改 个人信息
			upLond(path) {
				let that = this;
			    that.$httpAvater({
					url:"/course/common/upload",
					data:path,
					type:'course'
				}).then(res=>{

					that.avater = res;
				}).catch(err=>{

					uni.showToast({
						title:'网络异常 请稍后重试~',
						icon:'none'
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.myavater {
		width: 100%;
		height: 144rpx;
		background: #FFFFFF;
		opacity: 1;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #eee;
		// margin-bottom: 20rpx;
		// margin-top: 20rpx;

		.arrow {
			width: 18rpx;
			height: 28rpx;
		}

		.avater {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
			border: 1rpx solid #eee;
		}
	}

	.myfamliy_items {
		width: 100%;
		height: 120rpx;
		background: #FFFFFF;
		opacity: 1;
		// border-radius: 12rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		// flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #eee;

		.items_name {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 40rpx;
				color: #333;
			}
		}

		.items_input {
			flex: 4.3;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			input {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 40rpx;
				color: #666;
			}
           .arrow {
           	width: 18rpx;
           	height: 28rpx;
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
