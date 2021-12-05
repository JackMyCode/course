<template>
	<view class="content">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header>
		<view class="itemBox" v-for="i in 4" :key="i" @click="goDetail">
			<view class="left">
				<view class="title">
					复旦大学儿童教育专家讲座
				</view>
				<view class="time">
					<text>12月30日</text>
					<text style="margin-left: 20rpx;">14:00-16:00</text>
				</view>
				<view class="map">
					<text>双岗小学</text>
					<text style="margin-left: 20rpx;">多媒体教师</text>
				</view>
			</view>
			<view class="right">
				<image src="" mode="" class="imgs"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import navBar from '../../components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import util from "@/utils/util.js"
	export default {
		components: {
			navBar,
			customHeader
		},
		data() {
			return {
				title: '活动快报',

			}
		},
		onLoad(options) {


		},
		methods: {
			goStudentDetail() {
				uni.navigateTo({
					url: '/pages/home/excellentStudentDetail'
				})
			},
			goDetail(){
				uni.navigateTo({
					url: '/pages/home/expressDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100vh;
		background-color: #F3F3F3;
		overflow: hidden;
	}

	.content {
		width: 100%;
		height: 100vh;
		background-color: #F3F3F3;
        .itemBox{
			width: 100%;
			height: 200rpx;
			background-color: #FFFFFF;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content:space-between;
			align-items: center;
			border-bottom:1rpx solid #F3F3F3;
			.left{
				width: 515rpx;
				height:100%;
				display: flex;
				align-items:flex-start;
				justify-content: center;
				flex-flow: column;
				.title{
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: #333333;
					opacity: 1;
				}
				.time{
					margin-top: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: #5D5DFF;
					opacity: 1;
				}
				.map{
					
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40rpx;
					color: #333333;
					opacity: 1;
					margin-top: 10rpx;
				}
			}
			.right{
				width:180rpx;
				height: 100%;
				display: flex;
				align-items: center;
				.imgs{
					width: 180rpx;
					height: 160rpx;
					background: #E6E6E6;
					opacity: 1;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>
