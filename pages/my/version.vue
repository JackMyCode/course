<template>
	<view class="content">
		<view class="itemsBoxs" @click="goAboutUs" v-if="isShow">
			<view class="left">
				<!-- <image src="/static/images/my/banben.png" mode="" class="imgs"></image> -->
				<text>软件版本</text><text style="margin-left: 10rpx;">{{version}}</text>
			</view>
			<view class="right">
				<!-- <image src="/static/images/my/arrow.png" mode="" class="arrow"></image> -->
			</view>
		</view>
		
		<doudi v-if="!isShow" :url="url"></doudi>
	</view>
</template>

<script>
    import doudi from '@/components/doudi.vue';
	export default{
		components:{
			doudi
		},
       data(){
		   return{
			   version:'',
			   isShow:true,
			   url: '/static/images/doudi/doudi_1.png',
		   }
	   },
		onLoad(options) {
			if(options.type == '1001'){
				this.isShow = false;
				return;
			}
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
			goAboutUs(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 750rpx;
		height: 100vh;
	}
	.content{
		width: 750rpx;
		height: 100vh;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		.itemsBoxs{
			width: 690rpx;
			height: 160rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
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
	}
	
</style>
