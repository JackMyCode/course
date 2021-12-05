<template>
	<view class="content">
		<view class="itemsBoxs" @click="gomessages('1001')">
			<view class="left">
				<text>系统消息</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
			</view>
		</view>
		<view class="itemsBoxs" >
			<view class="left">
				<text>版本信息</text>
			</view>
			<view class="right">
				<text>{{version}}</text>
				<!-- <image src="/static/images/my/arrow.png" mode="" class="arrow"></image> -->
			</view>
		</view>
		<view class="itemsBoxs" @click="goPrivacy">
			<view class="left">
				<text>隐私协议</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
			</view>
		</view>
		<view class="itemsBoxs" @click="goUser">
			<view class="left">
				<text>用户协议</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
			</view>
		</view>
<!-- 		<view class="aboutsBox">
			<text class="myText" @click="goPrivacy">《隐私协议》</text>
			<text>和</text>
			<text class="myText" @click="goUser">《服务政策》</text>
		</view> -->
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	export default{
		components:{
			navBar,
			customHeader,
		},
		data(){
			return{
				version:''
			}
		},
		onLoad(options) {
			let that = this;
			this.$request({
				url: 'course/v2/common/query/version',
				data: {},
				method: 'get'
			}).then(res => {

				if(res.data.success){
				   that.version = res.data.result.configValue;
				}
			}).catch(err => {
			})
		},
		methods:{
			
			gomessages(){
				uni.navigateTo({
					url:'./messageList'
				})
			},
			goAboutUs(type){
				uni.navigateTo({
					url:'./version?type='+type
				})
			},
			goPrivacy(){
				uni.navigateTo({
					url:'./privacy_agreement'
				})
			},
			goUser(){
				uni.navigateTo({
					url:'./user_agreement'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 750rpx;
		height: 100vh;
		background-color: #F8F8F8;
	}
	.content{
		width: 750rpx;
		height: 100vh;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		background-color: #F8F8F8;
		.itemsBoxs{
			width: 750rpx;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			border-bottom:1rpx solid #F8F8F8;
			// box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;
			.left{
				flex: 4;
				height: 160rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content:flex-start;
				align-items: center;
				.imgs{
					width: 40rpx;
					height: 40rpx;
				}
				text{
					font-size: 35rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 56rpx;
					color: #333333;
					opacity: 1;
				}
				
			}
			.right{
				flex: 1;
				height: 160rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding-right: 30rpx;
				box-sizing: border-box;
				.arrow{
					width: 16rpx;
					height: 28rpx;
				}
			}
		}
	   .aboutsBox{
		   width: 100%;
		   height: 50rpx;
		   position: fixed;
		   bottom: 70rpx;
		   display: flex;
		   justify-content: center;
		   align-items: center;
		   text{
			   font-size: 28rpx;
			   font-family: Source Han Sans SC;
			   font-weight: 400;
			   line-height: 30rpx;
			   color: #666;
			   opacity: 1;
		   }
		   .myText{
			  color: #3E8BF3;
		   }
	   }
	}
	
</style>
