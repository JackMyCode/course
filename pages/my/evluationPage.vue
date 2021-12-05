<template>
	<view class="boxid">
		<view class="mycontent">
			<view class="evluation_title">
				<image :src="imgs" mode="" class="imgs"></image>
				<text>{{ename}}</text>
			</view>
			<view class="evluation_start">
				<view class="evluation_start_item" v-for="(item,index) in configValue">
					<view class="left">
						<text>{{item.commentTitle}}</text>
					</view>
					<view class="right">
						<rate v-if="item.star" size="28" style="width: 300rpx;margin-left: 30rpx;" :numProp="index" :value="item.star"  @change="onChange_1"></rate>
						<rate v-else size="28" style="width: 300rpx;margin-left: 30rpx;" :numProp="index" :value="item.star" @change="onChange_1"></rate>
					</view>
				</view>
			</view>
		</view>

		<view class="buttonBox" v-if="code">
			<view class="bottom_btn" @click="goEvalution">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import rate from '@/components/rate.vue';
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';

	export default {
		components: {
			rate,
			navBar,
			customHeader
		},
		data() {
			return {
				title: '课程评价',
				evlationId: '',
				type: '',
				titleclss: '',
				content: '',
				code: true,
				configValue:[], //评价配置
				ename: '', // 名字
				imgs:'',
				exerciseStar: 0, //课程
				teacherStar: 0, // 教师
				changdiStar: '' // 评价场地
			}
		},
		onLoad(options) {
			this.evlationId = options.evlationId;
			if (options.type == '02') {
				// this.code = true;
				this.getEvalution();
			}
			this.ename = options.name;
			this.edesc = options.desc;
			this.imgs = options.img;
		},
		methods: {
			onChange_1(d) {
				let prop = d.numprop;
				this.configValue[prop].star = d.value
			},
			// 获取 评价配置
			getEvalution() {
				let that = this;
				this.$request({
					url: 'course/v2/comment/configlist',
					data: {},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let dataList = res.data.result;
						for(var i in dataList){
							dataList[i].star=0
						}
						that.configValue = dataList;
					}
				}).catch(err => {
				})
			},
			// 获取 评价详情
			goEvalution() {
				let that = this;
				let dataInfo = that.configValue;
				let dataArrays = [];
				for(var i in dataInfo){
					var objs={
						"commentConfigStar":dataInfo[i].star,
						"commentConfigId": dataInfo[i].id,
					}
					dataArrays.push(objs)
				}
				this.$request({
					url: 'course/v2/comment/add',
					data: {
						"courseCommentSubList": dataArrays,
						"enlistId":that.evlationId
					},
					method: 'post'
				}).then(res => {
					if (res.data.success) {
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
						uni.navigateBack()
					}
				}).catch(err => {
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background: #668BFE;
	}

	.boxid {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.mycontent {
			width: 695rpx;
			min-height: 200rpx;
			background: #FFFFFF;
			box-shadow: 0px 7rpx 20rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;
			margin-top: 20rpx;

			.evluation_title {
				width: 100%;
				height: 80rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				align-items: center;
                .imgs{
					width: 60rpx;
					height: 60rpx;
					// background-color: #f40;
					margin-right: 20rpx;
				}
				text {
					font-size: 35rpx;
					font-family: SourceHanSansCN-Medium;
					line-height: 80rpx;
					color: #333333;
					opacity: 1;
				}
			}

			.evluation_start {
				width: 100%;
				min-height: 80rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				margin-bottom: 10rpx;

				.evluation_start_item {
					width: 100%;
					height: 60rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
                   .left{
					   flex: 1;
					   height: 60rpx;
					   display: flex;
					   justify-content: flex-start;
					   align-items: center;
				   }
				   .right{
					  flex: 2;
					  height: 60rpx;
					  display: flex;
					  justify-content: flex-start;
					  align-items: center; 
				   }
					// background-color: #f40;
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 56rpx;
						color: #666666;
						opacity: 1;
					}
				}
			}

			.desc_text {
				width: 100%;
				height: 382rpx;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;

				.textarea {
					width: 100%;
					height: 100%;
					border: 1rpx solid #E0E0E0;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					line-height: 40rpx;
					color: #333;
				}
			}
		}

		.buttonBox {
			width: 100%;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			position: fixed;
			bottom: 40rpx;
			left: 0;

			.bottom_btn {
				width: 556rpx;
				height: 111rpx;
				background: #3E8BF3;
				opacity: 1;
				border-radius: 69rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				text {

					font-size: 49rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					line-height: 70rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
		}
	}
</style>
