<template>
	<view class="headerBot">
		<image src="/static/images/news/bg.png" mode="" class="headerBg"></image>
		<view class="custom-header-container" >
			<view class="custom-header-status-bar" :style="{height:getStausBarHeight}"></view>
			<view class="custom-header-top-container" >
				<view style="flex:1; height: 44px;margin: 0;padding:0; border-radius: 0 !important;display: flex;align-items: center;justify-content:flex-start;" @tap="backTap">
					<image src="../static/images/back.png" mode="" style="width:21rpx;height: 38rpx;margin-left: 30rpx;"></image>
				</view>
				<view class="custom-header-title" style="margin-left: 0; font-size: 36rpx;font-family: SourceHanSansCN-Regular;color: #FFFFFF;">
					<text>{{title}}</text>
				</view>
				<view class="" style="flex: 1;">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    props: {
	        /**
	         * 导航文字
	         */
	        title: String,

	    },
	    computed: {
	        getStausBarHeight(){
	        	try {
	        		const res = uni.getSystemInfoSync();
	        		return res.statusBarHeight + 'px';
	        	} catch (e) {
	        	}
	        }
	    },
	    methods: {
	        backTap(e) {
	            uni.navigateBack()
	        }
	    }
	}
</script>

<style>
	
	.headerBot {
		width: 100%;
		height: auto;
		position: relative;
		background: linear-gradient(to right, #8101FB, #475EFF);
	}
	.headerBg {
		width: 100%;
		position: absolute;
		height: 50px;
		left: 0;
		bottom: 0;
	}
	.custom-header-top-container{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		width: 100%;
	}
	.custom-header-back-btn{
		height: 44px;
		width: 38px;
		margin: 0;
		padding: 0;
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.custom-header-container{
		z-index: 1;
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 0;
		
	}
	.custom-header-status-bar{
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 100;
	}
	.custom-header-title{
		height: 44px;
		/* align-self: center; */
		flex: 1;
		/* margin-left: 30upx; */
		line-height: 44px;
		font-size: 15px;
		text-align: center;
	}
</style>
