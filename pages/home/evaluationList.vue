<template>
	<view class="">
		<navBar style="position: fixed;left: 0;top: 0;z-index: 3;" :title="title"></navBar>
		<custom-header></custom-header>
		<block>

			<view class="evaluation_item" v-for="(item, index) in evaluationList">
				<view class="class_title">
					<text>{{item.studentId_dictText}}</text>
				</view>
				<view class="evaluation_box">
					<view class="evluation_start_item">
						<text>课程评分:</text>
						<rate v-if="item.classst" style="width: 300rpx;margin-left: 10rpx;" size="20" :value="item.classst" @change="onChange_1"></rate>
						<rate v-else style="width: 300rpx;margin-left: 10rpx;" size="20" :value="item.classst" @change="onChange_1"></rate>
					</view>
					<view class="evluation_start_item">
						<text>老师评分:</text>
						<rate v-if="item.teacherst" style="width: 300rpx;margin-left: 10rpx;" size="20" :value="item.teacherst" @change="onChange_2"></rate>
						<rate v-else style="width: 300rpx;margin-left: 10rpx;" size="20" :value="item.teacherst" @change="onChange_2"></rate>
					</view>
					<!--  <image :src="avatar" mode="" class="avater"></image>
			   <text class="name"></text> -->
				</view>
				<view class="evaluation_content">
					<!-- <text>{{}}</text> -->
					<view class="" v-html="item.content"></view>
				</view>
			</view>
		</block>
		<!--  <block>
		  <doudi :url="url"></doudi>
	   </block> -->
	</view>
</template>
<script>
	import navBar from '../../components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import doudi from '@/components/doudi.vue';
	import util from "@/utils/util.js"
	import rate from "@/components/rate.vue"
	export default {
		components: {
			navBar,
			customHeader,
			doudi,
			rate
		},
		data() {
			return {
				title: '课程评价',
				classId: '',
				evaluationList: [{
					avatar: '',
					content: '课程讲的很棒 老师细心 可以学到知识课程讲的很棒 老师细心 可以学到知识课程讲的很棒 老师细心 可以学到知识',
					studentId_dictText: '张磊家长',
					teacherst: 5,
					classst: 5
				},{
					avatar: '',
					content: '课程讲的很棒 老师细心 可以学到知识课程讲的很棒 老师细心 可以学到知识',
					studentId_dictText: '张磊家长',
					teacherst: 3,
					classst: 4
				},{
					avatar: '',
					content: '课程讲的很棒 老师细心 可以学到知识',
					studentId_dictText: '张磊家长',
					teacherst:5,
					classst: 4
				}],
				avatar: '',
				url: '/static/images/doudi/doudi_1.png',
			}
		},
		onLoad(options) {
			this.classId = options.classid
			let that = this;
			const value = uni.getStorageSync('userInfo');
			this.avatar = value.avatar;
		},
		methods: {
			// 获取 评价列表
			getItemList() {
				let that = this;
				this.$request({
					url: '/course/comment/list',
					data: {
						exerciseId: that.classId
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						that.evaluationList = res.data.result.records;
					}
				}).catch(err => {
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.evaluation_item {
		width: 100%;
		min-height: 175rpx;
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		.class_title {
			width: 100%;
			height: 85rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #EEEEEE;

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 85rpx;
				color: #333;
			}
		}

		.evaluation_box {
			width: 100%;
			min-height: 100rpx;
            padding: 0 30rpx;
            box-sizing: border-box;
			.evluation_start_item {
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				text {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 38rpx;
					color: #666666;
					opacity: 1;
				}
			}

			// display: flex;
			// justify-content:flex-start;
			// align-items: center;
			// fl

			// .avater{
			//  width: 60rpx;
			//  height: 60rpx;
			//  border-radius: 50%;
			// }
			// .name{
			//  font-size: 28rpx;
			//  font-family: Source Han Sans CN;
			//  font-weight: 500;
			//  line-height: 40rpx;
			//  color: #666666;
			//  margin-left: 28rpx;
			// }
		}

		.evaluation_content {
			width: 100%;
			min-height: 40rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
            margin-top: 20rpx;
			text {
				font-size: 24rpx;
				font-family: SourceHanSansCN-Regular;
				line-height: 36rpx;
				color: #333333;
			}
		}
	}
</style>
