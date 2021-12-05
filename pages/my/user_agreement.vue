<template>
	<view class="">
<!-- 		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header> -->
		<doudi v-if="false" :url="url"></doudi>
		<view class="class_ad" v-else>
			<view class="title_box">
				<text>用户协议</text>
			</view>
         <!--   <view class="times">
            	<text>发布时间：</text><text>{{datacontent.createTime}}</text>
            </view> -->
			<view class="desc" style="background-color: #FFFFFF;padding: 20rpx;box-sizing: border-box; overflow: hidden;" >
				<view class="descTText" v-html="newsTitle"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '../../components/nav-bar.vue';
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
				title: '公告详情',
				datacontent: '',
				newsTitle: '',
				newsSub: '',
				url: '/static/images/doudi/doudi_1.png',
			}
		},
		onLoad(options) {
			let that = this;
			this.$request({
				url: 'course/v2/common/query/user_agreement',
				data: {
				},
				method: 'get'
			}).then(res => {

				if (res.data.success) {
					let congfing = res.data.result;
					that.newsTitle = congfing.configValue;
				}
			}).catch(err => {
			})
		}

	}
</script>

<style lang="scss" scoped>
	.class_ad {
		width: 100%;
		height: auto;
		border-radius: 12rpx;
		margin-bottom: 20rpx;

		.title_box {
			width: 100%;
			min-height: 80rpx;
			line-height: 45rpx;
			
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			opacity: 1;
			padding: 0 20rpx;
			box-sizing: border-box;
			border-radius: 10rpx 10rpx 0 0;
			background-color: #FFFFFF;
			display: flex;
			justify-content:center;
			align-items: center;

			.lineText {
				font-size: 24rpx;
				color: #C0C0C0;
				margin-left: 20rpx;
			}

		}
		.desc{
			width: 100%;
			height: auto;
			padding: 0 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 40rpx;
			color: #333333;
			opacity: 1;
			
			.descTText{
				width: 100%;
				height: auto;
				overflow: hidden;
			}
		}
         .times{
			 width: 100%;
			 height: 40rpx;
			 background-color: #FFFFFF;
			 padding-left: 20rpx;
			 box-sizing: border-box;
			 text{
				 font-size: 24rpx;
				 color: #C8C7CC;
			 }
		 }
		.class_ad_img {
			width: 706rpx;
			height: 100%;
		}
	}
</style>

