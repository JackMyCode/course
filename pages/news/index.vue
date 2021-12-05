<template>
	<view class="content">
		<view class="mySearchBox">
			<view class="searchBox">
				<view class="input_box">
					<image src="../../static/images/home/serach.png" mode="" class="serachicon"></image>
					<input type="text" @confirm="getInput" v-model="inputVlaue" placeholder="请输入关键词" />
				</view>
				<view class="btn" @click="getnewsList">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="itemsBoxs" v-if="dataList.length > 0" @click="goNewDesc(item.id)" v-for="(item, index) in dataList"
			:key="index">
			<view class="left">
				<view class="title">
					<text>{{item.newsTitle}}</text>
				</view>
				<view class="desc">
					<text>{{item.newsSub}}</text>
				</view>
				<view class="time">
					<text>{{item.createTime}}</text>
				</view>
			</view>
			<view class="right">
				<image :src="item.newsImg" mode="aspectFill" class="imgs"></image>
			</view>
		</view>
		<doudi v-if="dataList.length == 0"></doudi>
	</view>
</template>

<script>
	import customHeader from '@/components/custom-header/custom-header.vue';
	import navBar from '../../components/nav-bar.vue';
	import util from '../../utils/util.js'
	import doudi from '@/components/doudi.vue';
	export default {
		data() {
			return {
				title: '活动快报',
				dataList: [],
				inputVlaue: ''
			}
		},
		computed: {
			getStausBarHeight() {
				try {
					const res = uni.getSystemInfoSync();
					return res.statusBarHeight + 'px';
				} catch (e) {}
			}
		},
		components: {
			customHeader,
			doudi,
			navBar
		},
		onLoad() {

			this.getnewsList();
		},
		methods: {
			getInput(e) {
				this.inputVlaue = e.target.value;
				this.getnewsList();
			},
			// 获取 资讯列表
			getnewsList() {
				let that = this;
				this.$request({
					url: 'course/v2/news/list',
					data: {
						key: that.inputVlaue,
						pageNo: '1',
						pageSize: '20'
					},
					method: 'get'
				}).then(res => {

					if (res.data.success) {
						let dataList = util.handleMultipleImgs(res.data.result.records, '')
						that.dataList = res.data.result.records;
					}
				}).catch(err => {
				})
			},
			goNewDesc(prop) {
				uni.navigateTo({
					url: "./newsDetail?prop=" + prop
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background-color: #F1F1F1;
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		align-items: center;
		justify-content: flex-start;

		.mySearchBox {
			width: 100%;
			height: auto;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			// background: linear-gradient(to right, #8101FB, #475EFF);
			display: flex;
			justify-content: center;
			align-items: center;

			.searchBox {
				width: 100%;
				height: 85rpx;
				opacity: 0.82;
				border-radius: 42rpx;
				background: #EBEBEB;
				margin-top: 10rpx;
				padding: 0rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;


				.input_box {
					width: 400rpx;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.serachicon {
						width: 31rpx;
						height: 31rpx;
						// background-color: #f40;
						margin-right: 10rpx;
					}

					.defult {
						color: #AFAFAF;
					}

					input {

						font-size: 28rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 54rpx;
						color: #333;
						// letter-spacing: 120px;
						opacity: 1;
					}

				}

				.btn {
					width: 128rpx;
					height: 60rpx;
					opacity: 1;
					border-radius: 42rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 29rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						line-height: 53rpx;
						color: #3E8BF3;
						opacity: 1;
					}
				}
			}
		}

		.itemsBoxs {
			width: 720rpx;
			height: 165rpx;
			margin-top: 20rpx;
			background: #FFFFFF;
			box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 20rpx;
			box-sizing: border-box;

			.left {
				width: 495rpx;
				height: 100%;

				.title {
					width: 100%;
					height: 50rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: #333333;
					opacity: 1;
				}

				.desc {
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 30rpx;
					color: #999;
					opacity: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.time {
					width: 100%;
					height: 45rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
					color: #999;
					opacity: 1;
				}
			}

			.right {
				width: 200rpx;
				height: 150rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.imgs {
					width: 180rpx;
					height: 135rpx;
				}
			}
		}
	}
</style>
