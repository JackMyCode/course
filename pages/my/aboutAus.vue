<template>
	<view class="boxid">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;"  :title="title"></navBar>
		<custom-header></custom-header>
       <view class="itemsBoxs">
       	<view class="left">
       		<!-- <image src="/static/images/my/all.png" mode="" class="imgs"></image> -->
       		<text>系统消息</text>
       	</view>
       	<view class="right">
       		<image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
       	</view>
       </view>
       <view class="itemsBoxs" >
       	<view class="left">
       		<!-- <image src="/static/images/my/abous.png" mode="" class="imgs"></image> -->
       		<text>软件版本</text>
       	</view>
       	<view class="right">
       		<image src="/static/images/my/arrow.png" mode="" class="arrow"></image>
       	</view>
       </view>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	export default {
		components: {
			navBar,
			customHeader
		},
		data() {
			return {
				title: '关于我们'
			}
		},
		methods:{
			goMyevalution(){
				uni.navigateTo({
					url:'./evluationPage'
				})
			},
			goAbouts(){
				uni.navigateTo({
					url:'/pages/my/aboutAus'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.boxid {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: #FFFFFF;
        .itemsBoxs{
        	width: 100%;
        	height: 160rpx;
        	display: flex;
        	justify-content: center;
        	align-items: center;
        	background-color: #FFFFFF;
        	border-bottom: 1rpx solid #EEEEEE;
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
        			// background-color: #f40;
        		}
        		text{
        			
        			font-size: 32rpx;
        			font-family: PingFang SC;
        			font-weight: 500;
        			line-height: 54rpx;
        			color: #333333;
        			margin-left: 15rpx;
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
	}
</style>
