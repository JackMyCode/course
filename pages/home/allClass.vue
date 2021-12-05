<template>
	<view class="content">
		<view class="mySearchBox">
			<view class="searchBox">
				<view class="input_box">
					<image src="../../static/images/home/serach.png" class="serachicon"></image>
					<input type="text" v-model="inputVlaue" placeholder="请输入课程" />
				</view>
				<view class="btn" @click="getBtnserch">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="itemsContent">
			<view class="itemscommon" v-for="item in list" :key="item" @click="goClassDetail(item.id)">
				<image v-if="item.eimg == '' || item.eimg == null" src="/static/images/home/noimgs.png"
					mode="aspectFill" class="imgs"></image>
				<image v-else :src="item.eimg" mode="aspectFill" class="imgs"></image>
<!--				<view class="overhead" v-if="item.courseTop == 1">-->
<!--					<text>顶置</text>-->
<!--				</view>-->
				<view class="title" style="text-align: left;padding-left: 20rpx;">
					{{item.ename}}
				</view>
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
				title: '选课中心',
				list: [],  //页面展示数据
				inputVlaue: '', // 搜索值
				hasNextPage: true, // 是否有下一页
				pages: 1, //第几页
        pageSize: 50, //每页的个数
			}
		},
		onLoad(options) {
			this.getClassList();
		},
		onReachBottom() {
			if (this.hasNextPage) {
				this.pages++
				this.getClassList();
			}
		},
		methods: {
			getBtnserch() {
				this.list = [];
				this.getClassList();
			},
			goClassDetail(classid) {
				uni.navigateTo({
					url: './allDetail?clssid=' + classid + '&ids=' + '' + '&start=' + '' + '&end=' + '' +
						'&isClass=' + '1002'
				})
			},
			// 获取课程列表
			getClassList() {
				let that = this;
				that.$request({
					url: 'course/v2/exercise/list',
					data: {
						key: that.inputVlaue,
						pageNo: this.pages,
						pageSize: this.pageSize,
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result.records;
						if (datalist.length < this.pageSize) {
							that.hasNextPage = false;
						}
						that.list = that.list.concat(datalist);
					}
				}).catch(err => {
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #F3F3F3;

		.mySearchBox {
			width: 100%;
			height: auto;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
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
						font-size: 28rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 54rpx;
						color: #3E8BF3;
						opacity: 1;
					}
				}
			}
		}

		.itemsContent {
			width: 100%;
			height: auto;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			background-color: #FFFFFF;

			.itemscommon {
				width: 342rpx;
				height: 247rpx;
				position: relative;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				background: #FFFFFF;
				box-shadow: 6rpx 6rpx 12rpx rgba(0, 0, 0, 0.08);
				opacity: 1;
				border-radius: 10rpx;

				.imgs {
					width: 342rpx;
					height: 192rpx;
					display: block;
					margin: 0 auto;
				}

				.title {
					text-align: center;
					width: 310rpx;
					font-size: 30rpx;
					font-weight: 500;
					line-height: 38rpx;
					color: #2A2A2A;
					opacity: 1;
					margin-top: 10rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.desc {
					width: 288rpx;
					height: 34rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 38rpx;
					color: #666666;
					opacity: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

			}

		}
	}
</style>
