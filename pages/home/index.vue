<template>
	<view class="content">
		<custom-header style="z-index: 10; position: fixed;top: 0;" :title="school" :backBtnClass="backBtnClass"
			:showBack="showBack" :containerStyle="containerStyle" :titleStyle="titleStyle" @backTap="backClick"
			ref="backTap"></custom-header>
		<custom-header></custom-header>
		<view class="swiperBox">
			<image src="../../static/images/home/header_bg.png" mode="" class="swiperBg"></image>
			<view class="swiperconten">
				<view class="searchBox">
					<view class="search" @click="goSearch">
						<image src="../../static/images/home/serach.png" mode="" class="searchIcon"></image>
						<text class="searchtext">搜索课程</text>
					</view>
				</view>
				<view class="swiper">
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="item in bannerList" :key="item.id" @click="getBanner(item)">
							<image :src="item.url" mode="" class="img"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view class="announcement-box" v-if="notices">
			<image src="../../static/images/home/bubble.png" mode="widthFix"></image>
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" style="display: contents">
				<swiper-item @click="goNotice(item.id)" v-for="(item,index) in notices"
					style="line-height: 90rpx;text-overflow:ellipsis;width: 94%;overflow: hidden;">
					<text>{{item.newsTitle}}</text>
				</swiper-item>
			</swiper>
		</view>
		<view class="itemsTab">
			<view class="myitems" @click="goSelectCenter">
				<image src="/static/images/home/tab1.png" mode="" class="imgs"></image>
				<text>选课中心</text>
			</view>
			<view class="myitems" @click="goStudent">
				<image src="/static/images/home/tab2.png" mode="" class="imgs"></image>
				<text>优秀学员</text>
			</view>
			<view class="myitems" @click="goExpress">
				<image src="/static/images/home/tab3.png" mode="" class="imgs"></image>
				<text>活动快报</text>
			</view>
		</view>
		<view class="navs">
			<view class="line"></view>
			<text>推荐课程</text>
		</view>
		<view class="navContent">
			<view class="itemscommon" v-for="item in selectList" :key="item" @click="goClassDetail(item.id)">
				<image src="/static/images/home/img.png" mode="" class="imgs"></image>
				<view class="title">
					{{item.ename}}-{{item.edesc}}
				</view>
				<view class="rate">
					<text
						style="width: 110rpx;padding-top: 10rpx; padding-left: 20rpx;box-sizing: border-box;">课程评价</text>
					<rate style="width: 200rpx;margin-left: 10rpx;display: flex;align-items: center;" size="20"
						value="5" @change="onChange_2"></rate>
				</view>
				<!-- 	<view class="times">
					报名时间{{item.stateTime}}
				</view> -->
			</view>
		</view>

	</view>
</template>

<script>
	import util from "@/utils/util.js"
	import customHeader from '@/components/custom-header/custom-header.vue';
	import doudi from '@/components/doudi.vue';
	import rate from '@/components/rate.vue'
	export default {
		components: {
			customHeader,
			doudi,
			rate
		},
		data() {
			return {
				statusBarHeight: 0,
				school: '庐阳区青少年校外活动中心选课',
				notices: [{
					newsTitle: '关于春季学校防疫的通知'
				}],
				arraySubject: ['科目'],
				arrayClass: ['年级'],
				arrayMap: ['上课点'],
				index_1: 0,
				index_2: 0,
				index_3: 0,
				subProp: '', // 科目
				claProp: '', // 年级
				mapProp: '', // 上课点
				bannerList: [{
					url: '/static/images/home/banner.png'
				}, {
					url: '/static/images/home/banner.png'
				}],
				pages: 1,
				getCode: true,
				url: '/static/images/doudi/doudi_1.png',
				selectList: [{
					ename: '测试课程',
					edesc: '测试课程',
					star: 5,
					esignStartTime: '2020-12-31'
				}, {
					ename: '书法课程',
					edesc: '书法',
					star: 5,
					esignStartTime: '2021-01-03'
				}, {
					ename: '美术课程',
					edesc: '绘画',
					star: 5,
					esignStartTime: '2021-01-03'
				}]
			}
		},
		onLoad() {
			this.getItemList();
		},
		onShow() {
			this.selectList = [];
			this.pages = 1;

			this.getClassList();
			this.getGetSchool();
		},
		onReachBottom() {
			let that = this;
			if (that.getCode) {
				that.pages += 1;
				that.getClassList();
				that.getCode = false
			}
		},
		methods: {
			goSelectCenter() {
				uni.navigateTo({
					url: '/pages/home/selectContent'
				})
			},
			goStudent() {
				uni.navigateTo({
					url: '/pages/home/excellentStudents'
				})
			},
			goExpress() {
				uni.navigateTo({
					url: '/pages/news/index'
				})
			},
			getBanner(item) {
				if (item.type == 0) { // 新闻资讯
					uni.navigateTo({
						url: '/pages/news/newsDetail?prop=' + item.link
					})
				}
				if (item.type == 1) { // 课程详情
					uni.navigateTo({
						url: './selectClassDetail?clssid=' + item.link
					})
				}
			},
			// 科目
			goOpenSubject(e) {

				this.index_1 = e.target.value;
				let text = this.arraySubject[this.index_1];
				this.subProp = this.purArrToArrObjectGra(text, 'subjectList');
				this.pages = 1;
				this.selectList = [];
				this.getClassList();
			},
			// 年级
			goOpenClass(e) {
				this.index_2 = e.target.value;
				let text = this.arrayClass[this.index_2];
				this.claProp = this.purArrToArrObjectGra(text, 'gradeList');
				this.pages = 1;
				this.selectList = [];
				this.getClassList();
			},
			// 上课点 
			goOpenMap(e) {
				this.index_3 = e.target.value;
				let text = this.arrayMap[this.index_3];
				this.mapProp = this.purArrToArrObject(text, 'courseClassAddressList');
				this.pages = 1;
				this.selectList = [];
				this.getClassList();
			},
			goNotice(prop) {
				uni.navigateTo({
					url: '/pages/news/newsDetail?prop=' + prop
				})
			},
			goClassDetail(prop) {
				uni.navigateTo({
					url: './selectClassDetail?clssid=' + prop
				})
			},
			goSearch() {
				uni.navigateTo({
					url: './search'
				})
			},
			// 获取 首页信息
			getItemList() {
				let that = this;
				this.$request({
					url: '/course/index/index',
					data: {},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result;
						wx.setStorageSync('subjectList', datalist.subjectList);
						wx.setStorageSync('gradeList', datalist.gradeList);
						wx.setStorageSync('courseClassAddressList', datalist.courseClassAddressList);
						wx.setStorageSync('notice', datalist.news);
						let subdata = that.arrObjectToPurArr(datalist.subjectList);
						let cladata = that.arrObjectToPurArr(datalist.gradeList);
						let mapdata = that.arrObjectToAddressArr(datalist.courseClassAddressList);
						that.arraySubject = that.arraySubject.concat(subdata);
						that.arrayClass = that.arrayClass.concat(cladata);
						that.arrayMap = that.arrayMap.concat(mapdata);
						that.notices = datalist.news;
						that.bannerList = datalist.banners;
						wx.setStorageSync('cladata', cladata);
						wx.setStorageSync('mapdata', mapdata);
						wx.setStorageSync('subdata', subdata);
					}
				}).catch(err => {
				})
			},
			// 获取课程列表
			getClassList() {
				let that = this;
				that.$request({
					url: '/course/exercise/list',
					data: {
						esubject: that.subProp, // 科目
						gradevalue: that.claProp, // 年级
						addressId: that.mapProp, // 上课点
						exerciseStatus: 0,
						pageNo: that.pages,
						pageSize: 20,

					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result.records;
						// for(let item of datalist){
						// 	item.eclassBeginsTime = util.split_time(item.eclassBeginsTime);
						// 	item.eclassEndTime = util.split_time(item.eclassEndTime)
						// }
						that.selectList = that.selectList.concat(datalist);
						that.getCode = true;
					}
				}).catch(err => {
				})
			},
			getGetSchool() {
				let that = this;
				this.$request({
					url: '/course/school/list',
					data: {
						pageNo: 1,
						pageSize: 100
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let dataList = res.data.result.records;
						uni.setStorageSync('schoolList', dataList);
						let List = that.arrObjectToschool(dataList);
						uni.setStorageSync('schools', List);
					}
				}).catch(err => {
				})
			},
			//数组对象转纯数组 学校处理
			arrObjectToschool(dataNum) {
				let newData = [];
				for (let item of dataNum) {
					newData.push(item.sname);
				}
				return newData;
			},
			//数组对象转纯数组
			arrObjectToPurArr(dataNum) {
				let newData = [];
				for (let item of dataNum) {
					newData.push(item.title);
				}
				return newData;
			},
			// 上课点数组 处理
			arrObjectToAddressArr(dataNum) {
				let newData = [];
				for (let item of dataNum) {
					newData.push(item.aname);
				}
				return newData;
			},
			//纯数字 返回  value值  上课点
			purArrToArrObject(text, dataNum) {
				let arrays = uni.getStorageSync(dataNum);
				let key_id = ''
				for (let item of arrays) {
					if (item.aname == text) {
						key_id = item.id
					}
				}
				return key_id;
			},
			//纯数字 返回  value值  年级
			purArrToArrObjectGra(text, dataNum) {
				let arrays = uni.getStorageSync(dataNum);
				let key_id = ''
				for (let item of arrays) {
					if (item.title == text) {
						key_id = item.value
					}
				}
				return key_id;
			},
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
		align-items: center;
		justify-content: center;

		.swiperBox {
			width: 100%;
			height: 385rpx;
			position: relative;
			background: linear-gradient(to right, #8101FB, #475EFF);

			.swiperBg {
				width: 100%;
				height: 385rpx;
			}

			.swiperconten {
				width: 100%;
				height: 385rpx;
				position: absolute;
				left: 0;
				top: 0;

				.searchBox {
					width: 100%;
					height: 75rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.search {
						width: 706rpx;
						height: 70rpx;
						background-color: #FFFFFF;
						border-radius: 85rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding-left: 46rpx;
						box-sizing: border-box;

						.searchIcon {
							width: 32rpx;
							height: 32rpx;
							// background-color: #f40;
							margin-right: 35rpx;
						}

						.searchtext {

							font-size: 32rpx;
							font-family: SourceHanSansCN-Regular;
							line-height: 54rpx;
							color: #666666;
						}

					}
				}

				.swiper {
					width: 100%;
					height: 257rpx;
					padding: 20rpx;
					box-sizing: border-box;
					position: absolute;

					// left: 0;
					swiper {
						width: 100%;
						height: 257rpx;

						.img {
							width: 714rpx;
							height: 257rpx;
							background: #FFFFFF;
							border-radius: 18rpx;
						}
					}
				}
			}

		}

		.announcement-box {
			width: 100%;
			background: #ffffff;
			margin-bottom: 30rpx;
			display: flex;
			height: 100rpx;
			align-items: center;

			font-family: SourceHanSansCN-Regular;

			color: #000000;

			image {
				width: 41rpx;
				height: 37rpx;
				margin: 0 10rpx 0 30rpx;
				// background-color: #f40;
			}

			text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 100rpx;
				font-size: 26rpx;
			}
		}

		.itemsTab {
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.myitems {
				width: 120rpx;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-flow: column;

				.imgs {
					width: 100rpx;
					height: 105rpx;
				}

				text {
					font-size: 28rpx;
					margin-top: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40rpx;
					color: #333333;
					opacity: 1;
				}
			}
		}

		.navs {
			width: 100%;
			height: 75rpx;
			background-color: #FFFFFF;
			border-bottom: 2rpx solid #F1F1F1;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.line {
				width: 6rpx;
				height: 34rpx;
				background: #6685FC;
				opacity: 1;
				border-radius: 10rpx;
			}

			text {
				font-size: 36rpx;
				font-family: SourceHanSansCN-Regular;
				line-height: 40rpx;
				color: #222222;
				opacity: 1;
				margin-left: 20rpx;
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
				width: 340rpx;
				min-height: 280rpx;
				// margin-left: 18rpx;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				background: #FFFFFF;
				box-shadow: 6rpx 6rpx 12rpx 6rpx rgba(0, 0, 0, 0.08);
				opacity: 1;
				border-radius: 8rpx;

				.imgs {
					width: 208rpx;
					height: 160rpx;
					display: block;
					margin: 10rpx auto;
				}

				.title {
					text-align: left;
					width: 310rpx;
					margin-left: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 38rpx;
					color: #2A2A2A;
					opacity: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}

				.rate {
					width: 100%;
					height: 40rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					text {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 30rpx;
						color: #666666;
						opacity: 1;
					}
				}

				.times {
					text-align: left;
					margin-left: 20rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 34rpx;
					color: #909090;
					opacity: 1;
				}
			}
		}

		.doudiBox {
			width: 100%;
			height: 350rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: fixed;
			left: 0;
			bottom: calc(30% - 275rpx);

			.icon {
				width: 324rpx;
				height: 286rpx;

			}

			text {
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular;
				line-height: 38rpx;
				color: #BABABA;
				margin-top: -65rpx;
			}
		}

	}
</style>
