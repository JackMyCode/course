<template>
	<view class="">
		<view class="mySearchBox">
			<view class="searchBox">
				<view class="textBox" :class="[type == 2 ? 'textBoxactive':'']">
					<text @click="goSeleCode">{{typeList[type]}}</text>
					<image src="../../static/images/home/arrow_up.png" mode="" class="arrow_up"></image>
					<cover-view class="foolBox" v-if="typeCode">
						<cover-view class="text" :class="type == index ? 'active' :''" v-for="(item,index) in typeList"
							@click="seleType(index)">
							{{item}}
						</cover-view>
					</cover-view>
				</view>
				<view class="input_box">
					<image src="../../static/images/home/serach.png" mode="" class="serachicon"></image>
					<input type="text" focus="true" @confirm="getInput" v-model="value" placeholder="请输入关键词" />
				</view>
				<view class="btn" @click="getClassList">
					<text>搜索</text>
				</view>
			</view>
		</view>

		<!-- </view> -->
		<view class="navContent" v-if="type == 0">
			<view class="itemscommon" v-for="item in selectList" :key="item" @click="goClassDetail(item.id)">
        <image v-if="item.eimg == '' || item.eimg == null" src="/static/images/home/noimgs.png"
               mode="aspectFill" class="imgs"></image>
        <image v-else :src="item.eimg" mode="aspectFill" class="imgs"></image>
        <view class="overhead" v-if="item.courseTop == 1">
          <text>顶置</text>
        </view>
        <view class="title" style="text-align: left;padding-left: 20rpx;">
          {{item.ename}}
        </view>
			</view>
		</view>
		<view class="itemsBoxs" v-if="type == 1" @click="goNewDesc(item.id)" v-for="(item, index) in selectList"
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

		<doudi v-if="selectList.length == 0" :url="url"></doudi>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import doudi from '@/components/doudi.vue';
	import rate from '@/components/rate.vue'
	export default {
		components: {
			navBar,
			customHeader,
			doudi,
			rate
		},
		data() {
			return {
				type: 0,
				typeList: ['课程', '资讯'],
				typeCode: false,
				title: '搜索课程',
				url: '/static/images/doudi/doudi_1.png',
				value: '',
				pages: 1,
				selectList: [],
			}
		},
		methods: {
			goStudentDetail(ids) {
				uni.navigateTo({
					url: '/pages/home/excellentStudentDetail?id=' + ids
				})
			},
			seleType(prop) {
				this.type = prop;
				this.selectList = [];
				this.typeCode = !this.typeCode;

				// this.getClassList()
			},
			goSeleCode() {
				this.selectList = [];
				this.typeCode = !this.typeCode;
			},
			// 键盘回车 搜索
			getInput(e) {
				this.value = e.detail.value;
				this.getClassList()
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
				that.selectList = [];
				var obj = {};
				if (that.type == '0') {
					obj = {
						url: 'course/v2/exercise/list',
						data: {
							key: that.value,
							pageNo: that.pages,
							pageSize: 20,
						},
						method: 'get'
					}
				} else if (that.type == '1') {
					obj = {
						url: 'course/v2/news/list',
						data: {
							key: that.value,
							pageNo: that.pages,
							pageSize: 20,
						},
						method: 'get'
					}
				} else if (that.type == '2') {
					obj = {
						url: 'course/v2/citation/list',
						data: {
							key: that.value,
							pageNo: that.pages,
							pageSize: 20,
						},
						method: 'get'
					}
				}
				that.$request(obj).then(res => {
					if (res.data.success) {
						let datalist = res.data.result.records;
						that.selectList = that.selectList.concat(datalist);
						that.getCode = true;
					}
				}).catch(err => {
				})
			},
			goNewDesc(prop) {
				uni.navigateTo({
					url: "/pages/news/newsDetail?prop=" + prop
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			width: 686rpx;
			min-height: 85rpx;
			background: #EBEBEB;
			opacity: 0.82;
			border-radius: 42rpx;
			margin-top: 10rpx;
			padding: 0rpx 30rpx 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.textBox {
				width: 100rpx;
				min-height: 80rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;

				// overflow: hidden;
				.arrow_up {
					width: 18rpx;
					height: 10rpx;
					margin-left: 6rpx;
				}

				.foolBox {
					width: 120rpx;
					min-height: 120rpx;
					background: #FFFFFF;
					box-shadow: 0px 6rpx 12rpx rgba(130, 130, 130, 0.16);
					opacity: 1;
					border-radius: 4rpx;
					position: absolute;
					bottom: -150rpx;
					left: 0;
					z-index: 99;

					.text {
						text-align: center;
						width: 100%;
						height: 54rpx;
						font-size: 28rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 54rpx;
						color: #676767;
						opacity: 1;
					}

					.active {
						color: #7575FF;
					}
				}

				text {
					font-size: 28rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 30rpx;
					color: #676767;
					// letter-spacing: 120px;
					opacity: 1;
				}
			}

			.textBoxactive {
				width: 160rpx;
			}

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
					font-size: 28rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 54rpx;
					color: #3E8BF3;
					opacity: 1;
				}
			}
		}
	}

	.navContent {
		width: 100%;
		height: auto;
		padding: 0 20rpx 20rpx;
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

      .overhead {
        position: absolute;
        left: 8rpx;
        top: 10rpx;
        width: 42rpx;
        height: 26rpx;
        background: #6685FC;
        border: 1rpx solid #6685FC;
        opacity: 1;
        border-radius: 4rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          font-size: 14rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 60rpx;
          color: #FFFFFF;
          opacity: 1;
        }
      }

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

	.itemsBox {
		width: 100%;
		height: 305rpx;
		padding: 22rpx;
		padding-bottom: 0;
		padding-top: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-top: 20rpx;

		.title_1 {

			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			line-height: 40rpx;
			color: #666666;
		}

		.title_2 {
			width: 100%;
			height: 40rpx;

			.time_icon {
				width: 24rpx;
				height: 23rpx;
				margin-right: 10rpx;
				// background-color: #f40;
			}

			text {
				font-size: 24rpx;
				font-family: SourceHanSansCN-Regular;
				line-height: 36rpx;
				color: #5D5DFF;

			}
		}

		.title_3 {
			width: 100%;
			height: 40rpx;
			margin-top: 10rpx;

			.time_icon {
				width: 24rpx;
				height: 23rpx;
				// background-color: #f40;
			}

			text {
				font-size: 24rpx;
				font-family: SourceHanSansCN-Regular;
				line-height: 36rpx;
				color: #7D7D7D;
				margin-left: 10rpx;
			}
		}

		.title_4 {
			width: 100%;
			height: 120rpx;
			// background-color: #F1F1F1;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 10rpx;

			.title_4left {
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.title_avater {
					width: 80rpx;
					height: 80rpx;
					border: 2rpx solid #5D5DFF;
					border-radius: 50%;
				}

				.title_text {
					display: flex;
					flex-flow: column;
					margin-left: 22rpx;
				}

				.text1 {
					font-size: 30rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 45rpx;
					color: #000000;
				}

				.text2 {
					font-size: 22rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 38rpx;
					color: #909090;
				}
			}

			.title_4right {
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.titleButtom {
					width: 200rpx;
					height: 56rpx;
					background: #5D5DFF;
					opacity: 1;
					border-radius: 28rpx;
					text-align: center;
					font-size: 30rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 56rpx;
					color: #FFFFFF;
				}
			}
		}
	}

</style>
