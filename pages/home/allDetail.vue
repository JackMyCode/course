<template>
	<view class="content">
		<block v-if="noDataCode">
			<doudi :url="url"></doudi>
		</block>
		<block v-else>
			<view class="titleBox">
				<view class="classShowImgs">
					<image v-if="datainfo.eimg == '' || datainfo.eimg == null" src="/static/images/home/noimgs.png"
						mode="aspectFill" class="imgs"></image>
					<image v-else :src="datainfo.eimg" mode="aspectFill" class="imgs"></image>
				</view>
<!--				<view class="title_name">-->
<!--					<view class="title_name_lf">-->
<!--						<text>{{className}}</text>-->
<!--					</view>-->
<!--				</view>-->
			</view>
			<view class="teacher">
				<view class="tacherInfo">
					<image src="/static/images/home/teacher.png" mode="aspectFit" class="icon"></image>
					<text class="text">授课老师:</text>
					<text class="text">{{teacher}}</text>
				</view>
				<view class="tacherInfo">
					<image src="/static/images/home/map.png" mode="aspectFit" class="icon"></image>
					<text class="text">上课地点:</text>
					<text class="text" v-if="address == null || address == ''">庐阳区校外活动中心</text>
					<text class="text" v-else>{{address}}</text>
				</view>
			</view>
			<block v-if="coverUrl !== null && coverUrl !== ''">
				<view class="class_desc">
					<view class="class_desc_title">精彩瞬间</view>
					<view class="class_desc_line"></view>
				</view>
				<view class="videoBox">
					<video class="videos" id="video" :show-mute-btn="show_mute_btn"
						:enable-play-gesture="enable_play_gesture" :show-center-play-btn="show_center_play_btn"
						:page-gesture="page_gesture" :src="datainfo.evideo" controls :poster="coverUrl"></video>
				</view>
			</block>

			<view class="class_desc">
				<view class="class_desc_title">{{className}}</view>
				<view class="class_desc_line"></view>
			</view>
			<view class="class_ad">
				<u-parse :content="html"></u-parse>
			</view>
		</block>
	</view>
</template>
<script>
	import navBar from '../../components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import util from "@/utils/util.js"
	import rate from '@/components/rate.vue';
	import doudi from '@/components/doudi.vue';
	import progressLine from "@/components/progress-line.vue"
	import uParse from "@/components/feng-parse/parse.vue"
	import graceRichTextReg from "@/static/richText.js"
	export default {
		components: {
			navBar,
			customHeader,
			rate,
			progressLine,
			doudi,
			uParse
		},
		data() {
			return {
				noDataCode: false,
				url: '/static/images/doudi/doudi_1.png',
				items: [],
				nowStudent: 10,
				endStudent: 20,
				popupCode: false,
				popupNums: true,
				code: false,
				repate: false,
				classId: '',
				receiveId: '',
				datainfo: '',
				teacherInfo: '',
				myfamliyList: [],
				studentids: [],
				codeFlag: true,
				className: '中国传统文化-书法临摹-颜体', // 课程名
				classdesc: '这是课程简介 这是课程简介',
				time_end: '', // 课程结束时间
				address: '', //地址
				address_end: '', // 地址别名
				teacher: '', //老师名
				coverUrl: "", //课程视屏
				studentsInfo: '',
				selectDate: '',
				end: 0,
				start: 28,
				isClassType: '1001',
				isProsse: false,
				isModifyCode: false,
				modifyInfo: '',
				html: ''
			}
		},
		onLoad(options) {
			this.classId = options.clssid;
			this.getClassDetail();
		},
		methods: {
			// 获取课程详情
			getClassDetail() {
				let that = this;
				that.$request({
					url: 'course/v2/exercise/queryById',
					data: {
						id: that.classId
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result;
						that.datainfo = datalist;
						// this.html = graceRichTextReg.format(this.datainfo.econtent);
						that.html = that.datainfo.econtent.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(
							match, reSrc) {
							var newImg = '<img src="' + reSrc + '" alt="" style="width:100%;" />';
							return newImg;
						});
						that.teacherInfo = datalist.courseTeacherList;
						that.className = datalist.ename; // 课程名
						that.classdesc = datalist.edesc;
						let nowTimer = util.split_time(datalist.state_time, '1001');
						that.address = datalist.aadress; // 地址别名
						that.teacher = datalist.tname.substr(0, 1) + "老师"; //老师名

						uni.setNavigationBarTitle({
							title: that.className
						})
					} else {
						that.noDataCode = true
					}
				}).catch(err => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.content {
		width: 100%;
		height: 100vh;
		overflow-y: auto;

		.styleObj {
			overflow: hidden;
		}

		.titleBox {
			width: 100%;
			min-height: 230rpx;
			background-color: #FFFFFF;
			padding: 20rpx;
			box-sizing: border-box;

			.classShowImgs {
				width: 100%;
				height: 420rpx;

				.imgs {
					width: 689rpx;
					height: 388rpx;
					display: block;
					margin: 0 auto;
				}
			}

			.title_name {
				width: 100%;
				min-height: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.title_name_lf {
					width: 100%;
					height: 100%;
					font-size: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					line-height: 40rpx;
					color: #2A2A2A;
				}

				.title_name_rig {
					flex: 1;
					height: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					.class_code {
						width: 86rpx;
						height: 40rpx;
						// background-color: #f40;
					}

					text {
						font-size: 32rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						line-height: 36rpx;
						color: #FB1B1B;
					}

				}
			}

			.class_time {

				max-width: 530rpx;
				height: 60rpx;
				margin-top: 10rpx;
				opacity: 1;
				border-radius: 12rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				.progress {
					width: 188rpx;
					height: 6rpx;
				}

				.rateStart {
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 38rpx;
					color: #999999;
					opacity: 1;
				}
			}
		}

		.class_grade {
			width: 100%;
			height: 120rpx;
			margin-top: 20rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.stare_class {
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 60rpx;
					color: #666666;
					opacity: 1;
				}
			}

		}

		.teacher {
			width: 100%;
			min-height: 120rpx;
			margin-top: 0rpx;
			background-color: #FFFFFF;
			padding: 20rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.tacherInfo {
				width: 100%;
				height: 40rpx;
				margin-top: 15rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.icon {
					width: 27rpx;
					height: 33rpx;
					// background-color: #f40;
				}

				.text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 38rpx;
					color: #666666;
					opacity: 1;
					margin-left: 15rpx;
				}
			}

			.teacher_left {
				flex: 2;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: column;

				.teacher_avater {
					width: 108rpx;
					height: 108rpx;
					border-radius: 50%;
				}

				.teacher_name {
					width: 300rpx;
					height: 100%;
					display: flex;
					align-items: flex-start;
					flex-direction: column;
					justify-content: center;
					padding-left: 25rpx;
					box-sizing: border-box;

					.teacher_name_one {
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						line-height: 52rpx;
						color: #000000;
					}

					.teacher_name_two {
						font-size: 22rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 38rpx;
						color: #909090;
					}
				}
			}

			.teacher_right {
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: flex-start;
				padding-top: 36rpx;
				box-sizing: border-box;
				font-size: 40rpx;

				.class_code {
					width: 86rpx;
					height: 40rpx;
					// background-color: #f40;
				}

				text {
					//font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 36rpx;
					color: #FB1B1B;
				}
			}
		}

		.videoBox {
			width: 750rpx;
			height: 286rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
			margin-bottom: 20rpx;

			.videos {
				width: 690rpx;
				height: 280rpx;
			}
		}

		.class_desc {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.class_desc_title {
				//width: 134rpx;
				height: 32rpx;
				font-size: 40rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 45rpx;
				color: #2A2A2A;
			}

			.class_desc_line {
				width: 200rpx;
				height: 7rpx;
				background: #3E8BF3;
				opacity: 1;
				border-radius: 4rpx;
				margin-top: 20rpx;
			}
		}

		.class_ad {
			width: 100%;
			height: auto;
			margin-bottom: 120rpx;
			padding: 0 20rpx;
			box-sizing: border-box;

			.ad_list {
				width: 100%;
				overflow: hidden;
				height: auto;
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
				bottom: calc(40% - 275rpx);

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
					// margin-top: 46rpx;
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
			bottom: 0;
			left: 0;

			.bottom_btn {
				width: 600rpx;
				height: 110rpx;
				background: #3E8BF3;
				opacity: 1;
				border-radius: 69rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.btn_top {
					width: 395rpx;
					height: 50rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.btn_item {
						font-size: 28rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						line-height: 50rpx;
						color: #FFFFFF;
						opacity: 1;
					}
				}

			}

			.btn_bottom {
				width: 395rpx;
				height: 15rpx;
			}
		}

		.seleStudentBox {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			display: flex;
			justify-content: center;
			align-items: flex-end;

			.sleStudent_box {
				width: 750rpx;
				min-height: 600rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: column;

				.sele_title {
					width: 100%;
					height: 70rpx;
					font-size: 36rpx;
					color: #333;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					.clear {
						position: absolute;
						width: 40rpx;
						height: 40rpx;
						right: 30rpx;
						top: 20rpx;
					}

				}

				.select_content {
					width: 100%;
					height: auto;
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;

					.content_size {
						width: 200rpx;
						height: 240rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-flow: column;
						padding: 15rpx 20rpx;
						box-sizing: border-box;

						.itemsBox {
							width: 144rpx;
							height: 144rpx;
							display: flex;
							padding: 18rpx;
							box-sizing: border-box;
							justify-content: center;
							align-items: center;
							background: #CCCCCC;
							opacity: 0.82;
							border-radius: 8rpx;
							text-align: center;
							line-height: 60rpx;
						}

						.itemBoxActive {
							background-color: #3E8BF3;
							color: #FFFFFF;
						}

						.addImgs {
							width: 144rpx;
							height: 144rpx;
						}
					}
				}

				.input {
					font-size: 28rpx;
					color: #333;

				}

				.my_buttom {
					width: 549rpx;
					height: 120rpx;
					background: #3E8BF3;
					opacity: 1;
					border-radius: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 50rpx;

					text {

						font-size: 50rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						line-height: 100rpx;
						color: #FFFFFF;
						// letter-spacing: 60px;
						opacity: 1;
					}
				}

			}

		}

		.Popup {
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			position: absolute;
			z-index: 99999;
			background-color: rgba(0, 0, 0, .4);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;

			.noTip {
				width: 600rpx;
				min-height: 320rpx;
				background-color: #FFFFFF;
				border-radius: 8rpx;
				position: relative;

				.succfulls {
					width: 600rpx;
					height: 410rpx;
				}

				.succfullBox {
					position: absolute;
					bottom: 65rpx;
					width: 100%;
					height: 90rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 60rpx;
						font-family: PingFang SC;
						font-weight: 600;
						line-height: 54rpx;
						color: #FF4D3B;
						// letter-spacing: 120px;
						opacity: 1;
					}
				}

				.clear {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					right: 30rpx;
					top: 30rpx;
				}

				.topTip {
					width: 100%;
					min-height: 170rpx;
					border-bottom: 1rpx solid #ECECEC;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-flow: column;

					.telephone {
						width: 100%;
						height: 60rpx;
						padding-left: 30rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
					}

					.codeNums {
						width: 100%;
						height: 60rpx;
						padding-left: 30rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						margin-top: 30rpx;

						input {

							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 54rpx;
							color: #999999;
							// letter-spacing: 120px;
							opacity: 1;
						}

						.getCodes {
							width: 164rpx;
							height: 60rpx;
							background: #9B44FF;
							opacity: 1;
							border-radius: 26rpx;
							text-align: center;

							text {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 60rpx;
								color: #FFFFFF;
								opacity: 1;
							}
						}
					}

					.red {
						font-size: 36rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 40rpx;
						color: #666666;
						opacity: 1;
					}

					text {
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #707070;
						opacity: 1;
						margin-top: 20rpx;
					}
				}

				.topBtn {
					width: 100%;
					height: 145rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.text {
						font-size: 36rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 40rpx;
						color: #5D5DFF;
						opacity: 1;
					}

					.myrepate {
						width: 228rpx;
						height: 80rpx;
						background: #7575FF;
						opacity: 1;
						border-radius: 48rpx;
						text-align: center;

						text {
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 500;
							line-height: 80rpx;
							color: #FFFFFF;
							opacity: 1;
						}
					}
				}
			}

			.Clear {
				width: 72rpx;
				height: 72rpx;
				// background-color: #f40;
				margin-top: 65rpx;
			}
		}
	}
</style>
