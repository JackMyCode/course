<template>
	<view class="">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header>
		<view class="myfamliy_box">
			<view class="myavater">
				<image src="../../static/images/my/famliy.png" mode="" class="avater_icon"></image>
			</view>
			<view class="myfamliy_items" v-for="(item, index) in dataList" :key="item.id" @click="getMyclick(item)">
				<view class="item_top">
					<view class="items_top_left">
						成员昵称: {{item.sname}}
					</view>
				</view>
				<view class="item_bottom">
					<view class="items_bottom_left">
						<text>年级: {{item.sysDictItem.itemText}}</text>
					</view>
					<view class="items_bottom_right">
						<text>学校：{{item.courseSchool.sname}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="buttonBox">
			<view class="bottom_btn" @click="getaddFaily()">
				<text>添加</text>
			</view>
		</view>
		<doudi  v-if="dataList.length == 0" :url="url"></doudi>
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
				title: '家庭成员',
				dataList:[],
				url:'/static/images/doudi/doudi_1.png',
			}
		},
		onShow() {
			this.getItemList();
		},
		methods: {
			goMyevalution() {
				uni.navigateTo({
					url: './evluationPage'
				})
			},
			getaddFaily(){
				uni.navigateTo({
					url:'./famliyadd'
				})
			},
			getMyclick(prop){
				uni.navigateTo({
					url:'./famliyadd?type=2'+'&id='+prop.id+'&name='+prop.sname+'&sex='+prop.ssex+'&phone='+prop.sphone+'&school='+prop.schoolId+'&class='+prop.sgrade
				})
			},
			// 获取 家庭列表
			getItemList(){
				let that = this;
				this.$request({
					url: '/course/users/users_student/queryByUid',
					data: {},
					method: 'get'
				}).then(res => {

					if(res.data.success){
					   that.dataList = res.data.result;
					}
				}).catch(err => {
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.myfamliy_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.myavater {
			width: 706rpx;
			height: 110rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.avater_icon {
				width: 88rpx;
				height: 82rpx;
				// background-color: #f40;
			}
		}
		.myfamliy_items {
			width: 706rpx;
			height: 144rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 12rpx;
			padding: 20rpx 0;
			box-sizing: border-box;
             display: flex;
			 flex-direction: column;
			 justify-content: space-between;
			 margin-bottom: 20rpx;
			.item_top {
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// margin-top: 25rpx;
				.items_top_left {
					width: 300rpx;
					height: 48rpx;
					font-size: 28rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
					font-family: Source Han Sans CN;
					font-weight: 500;
					line-height: 40rpx;
					color: #666666;
				}

				.items_top_right {
					width: 132rpx;
					height: 48rpx;
					background: #FFE2E2;
					opacity: 1;
					border-radius: 8rpx 0px 0px 8rpx;
					display: flex;
					justify-content: flex-start;
					align-items: flex-end;
					text {
						font-size: 24rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 40rpx;
						color: #FF5D5D;
					}
				}
			}

			.item_bottom {
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
                // margin-top: 20rpx;
				.items_bottom_left {
					width: 230rpx;
					height: 48rpx;
					padding-left: 20rpx;
					display: flex;
					justify-content:flex-start;
					align-items:flex-end;
					box-sizing: border-box;
					font-size: 24rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 36rpx;
					color: #5D5DFF;
				}

				.items_bottom_right {
					width: 300rpx;
					height: 48rpx;
					// background: #FFE2E2;
					opacity: 1;
					// border-radius: 8rpx 0px 0px 8rpx;
					display: flex;
					justify-content:flex-start;
					align-items:flex-end;
                     margin-left: 20rpx;
					text {
					font-size: 24rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 36rpx;
					color: #5D5DFF;
					}
				}
			}
		}

	}
	.buttonBox{
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		position: fixed;
		bottom: 0;
		left: 0;
		.bottom_btn{
			width: 600rpx;
			height: 72rpx;
			background: #7575FF;
			opacity: 1;
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 40rpx;
				color: #F8F4F4;
			}
		}
	}
</style>
