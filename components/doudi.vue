<template>
	<view class="">
		<view class="doudiBox">
			<image :src="url" mode="" class="icon"></image>
			<text>暂无相关信息</text>
		</view>
	</view>
</template>

<script>
	export default {
	    props: {
	        /**
	         * 背景图片
	         */
			url:{
				type:[String],
				default:'/static/images/doudi/doudi_1.png'
			}
	    },
	}
</script>

<style lang="scss" scoped>
	.doudiBox{
		width: 100%;
		height:350rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: fixed;
		left: 0;
		top: calc(50% - 275rpx);
		.icon{
			width: 324rpx;
			height: 286rpx;
			
		}
		text{
			font-size: 28rpx;
			font-family: SourceHanSansCN-Regular;
			line-height: 38rpx;
			color: #BABABA;
			margin-top: -40rpx;
			// margin-top: 46rpx;
		}
	}
</style>
