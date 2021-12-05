<template>
	<view>
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;"  :title="title"></navBar>
		<custom-header></custom-header>
		<view class="contentBox">
			<view class="title_box">
				<text>{{notices[prop].newsTitle}}</text>
				<text class="lineText">{{notices[prop].newsSub}}</text>
			</view>
			<view class="title_content">
				<view class="" v-html="notices[prop].newsContent">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	import navBar from '../../components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	export default {
          components:{
			navBar,
			customHeader
		},
		data() {
			return {
				title:'公告详情',
				notices:[],
				prop:0
			}
		},
		onLoad(options) {
	      this.prop= options.type;
		  this.notices = uni.getStorageSync('notice');
		}
	}
</script>

<style lang="scss" scoped>
	.contentBox{
		width: 100%;
		background-color: #FFFFFF;
		.title_box{
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #000;
			font-weight: 600;
			padding:0 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F1F1F1;
			.lineText{
				font-size: 24rpx;
				color: #C0C0C0;
				margin-left: 20rpx;
			}
		}
		.title_content{
			width: 100%;
			min-height: 200rpx;
			padding: 30rpx;
			box-sizing: border-box;
		}
	}
</style>
