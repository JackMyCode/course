<template>
	<view class="content">
		<block v-if="noDataCode">
			<doudi :url="url"></doudi>
		</block>
		<block v-else>
			<view class="titleBox">
				<view class="classShowImgs">
					<image v-if="datainfo.exercise.eimg == '' || datainfo.exercise.eimg == null"
						src="/static/images/home/noimgs.png" mode="aspectFill" class="imgs"></image>
					<image v-else :src="datainfo.exercise.eimg" mode="aspectFill" class="imgs"></image>
				</view>
<!--				<view class="title_name">-->
<!--					<view class="title_name_lf">-->
<!--						<text>{{className}}</text>-->
<!--					</view>-->
<!--				</view>-->
				<view class="class_time" v-if="false">
					<view class="progress">
						<progress-line :isDotX='false' :levlNow="nowStudent" :levlEnd="endStudent"></progress-line>
					</view>
					<text class="rateStart" style="margin-left: 10rpx; color: #FFC53D;">{{nowStudent}}</text>
					<text class="rateStart" style="margin-right: 10rpx;">/{{endStudent}}</text>
					<text class="rateStart">报名人数</text>
				</view>

			</view>
			<view class="teacher">
				<view class="tacherInfo">
					<image src="/static/images/home/teacher.png" mode="aspectFit" class="icon"></image>
					<text class="text">授课老师:</text>
					<text class="text">{{teacher}}</text>
				</view>
				<view class="tacherInfo" v-if="isClassType == '1001'">
					<image src="/static/images/home/timer.png" mode="aspectFit" class="icon"></image>
					<text class="text">开课时间:</text>
					<text class="text">{{time_start}}</text>
				</view>
				<view class="tacherInfo">
					<image src="/static/images/home/map.png" mode="aspectFit" class="icon"></image>
					<text class="text">上课地点:</text>
					<text class="text" v-if="address == null || address == ''">庐阳区校外活动中心</text>
					<text class="text" v-else>{{address}}</text>
				</view>

			</view>
			<view class="class_grade" @click="evalutionList" v-if="false">
				<view class="stare_class">
					<text>课程评价</text>
					<rate style="width: 300rpx;margin-left: 10rpx;" size="30" value="5" @change="onChange_2"></rate>
				</view>
				<view class="stare_class">
					<text>课程评价</text>
					<rate style="width: 300rpx;margin-left: 10rpx;" size="30" value="5" @change="onChange_2"></rate>
				</view>
			</view>
			<block v-if="coverUrl == null || coverUrl == ''">

			</block>
			<block v-else>
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
			<view class="buttonBox" v-if="isClassType == '1001'">
				<view :class="[userType == 1 ? 'bottom_btn' : 'bottom_disable_btn']" @click="clickEnlist">
					<view class="btn_top">
						<view class="btn_item">
							报名
						</view>
						<view class="btn_item">
							{{start}}人/{{end}}人
						</view>
					</view>
					<view class="btn_bottom" v-if="isProsse">
						<progress-line :isDotX='false' activeColor="#3E8BF3" backgroundColor="#FEFEFE" :levlNow="start"
							:levlEnd="end"></progress-line>
					</view>
				</view>
			</view>
			<view class="seleStudentBox" v-if="isEnlist" catchtouchmove="noneEnoughPeople">
				<view class="sleStudent_box">
					<view class="sele_title">
						<text>请选择学生</text>
						<image @click="clear" src="/static/images/clear.png" mode="aspectFit" class="clear"></image>
					</view>

					<view class="select_content">
						<radio-group class="select_content">
							<label class="content_size" v-for="(item,index) in myfamliyList" :key="index"
								v-if="myfamliyList.length > 0">
								<view class="itemsBox" :class="[item.is_enlist ?'itemBoxActive':'']">
									<text>{{item.sname}}</text>
								</view>
								<view @click="selectIndex(index)" v-if="item.is_enlist == 1">
									<radio color="#3E8BF3" :checked="item.checked" />
								</view>
							</label>
							<label class="content_size" @click="goAddFamily">
								<image src="../../static/images/my/adds.png" mode="" class="addImgs"></image>
							</label>
						</radio-group>
					</view>
					<view class="my_buttom" @click="getBaoming">
						<text>确认报名</text>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="Popup" @touchmove.stop.prevent="moveHandle" v-if="popupCode">
				<view class="noTip" style="background-color:rgba(0,0,0,0);">
					<image src="../../static/images/home/scuufull.png" mode="" class="succfulls"></image>
					<view class="succfullBox">
						<text>报名成功</text>
					</view>
					<image src="../../static/images/clear.png" mode="aspectFit" class="Clear" @click="clear"></image>
				</view>

			</view>
		</block>
	</view>
</template>
<script>
	import navBar from '@/components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
	import util from "@/utils/util.js"
	import rate from '@/components/rate.vue';
	import doudi from '@/components/doudi.vue';
	import progressLine from "@/components/progress-line.vue"
	import uParse from "@/components/feng-parse/parse.vue"

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
				isEnlist: false,
				classId: '',
				receiveId: '',
				datainfo: '',
				teacherInfo: '',
				myfamliyList: [],
				studentids: [],
				codeFlag: true,
				className: '中国传统文化-书法临摹-颜体', // 课程名
				classdesc: '这是课程简介 这是课程简介',
				time_start: '', // 课程开始时间
				time_end: '', // 课程结束时间
				address: '', //地址
				address_end: '', // 地址别名
				teacher: '', //老师名
				studentsInfo: '',
				selectDate: '',
				end: 0,
				start: 28,
				isClassType: '1001',
				isProsse: false,
				isModifyEnlist: false, // 是否为修改报名
				modifyInfo: '', // 修改报名信息
				Infodesc: '',
				html: '',
				userType: 1, // 用户类型，默认是家长角色

			}
		},
		onLoad(options) {
			this.classId = options.clssid;
			this.receiveId = options.ids;
			this.end = Number(options.end);
			this.start = Number(options.start);
			this.isClassType = options.isClass;

			// 判定当前用户的类型
			let dataType = uni.getStorageSync('userType');
			this.userType = dataType;

			setTimeout(item => {
				this.isProsse = true;
			}, 1000)

			this.getClassDetail();

			// this.checkEnlistChildren();
			const values = uni.getStorageSync('modifyClass')
			if (!values) {
				this.isModifyEnlist = false;
			} else {
				this.isModifyEnlist = true;
				this.modifyInfo = values;
			}

		},
		onShow() {
			this.isEnlist = false
		},
		methods: {
			// 校验子女是否可以进行报名
			checkEnlistChildren() {
				let that = this;
				that.$request({
					url: 'course/v2/enlist/exercise/enlistChildren',
					data: {
						exercise_id: that.classId,
						receive_id: that.receiveId
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						this.isEnlist = !this.isEnlist;

						let items = res.data.result;
						for (let item of items) {
							item.checked = false;
						}
						that.myfamliyList = items;
						setTimeout(item => {
							// this.isProsse = true;
						}, 40000)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						return
					}
				}).catch(err => {})
			},
			goAddFamily() {
				uni.navigateTo({
					url: '../my/famliyadd'
				})
			},
			clear() {
				this.isEnlist = false;
				this.popupCode = false;
			},
			// 获取课程详情
			getClassDetail() {
				let that = this;
				that.$request({
					url: 'course/v2/enlist/exercise/queryById',
					data: {
						exercise_id: that.classId,
						receive_id: that.receiveId
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let datalist = res.data.result;
						that.datainfo = datalist;
						that.teacherInfo = datalist.receiveExercise;
						that.className = datalist.exercise.ename; // 课程名
						that.classdesc = datalist.exercise.edesc;
						let nowTimer = util.split_time(datalist.receive.receiveDate, '1001');
						that.time_start = nowTimer[1] + '月' + nowTimer[2] + '日'; // 课程开始时间
						that.address = datalist.exercise.aadress; // 地址别名
						// that.teacher = datalist.receiveExercise.teacherName; //老师名
						that.Infodesc = datalist.exercise.econtent; // 描述
						that.teacher = datalist.receiveExercise.teacherName.substr(0, 1) + "老师";
						// this.html = that.Infodesc.replace(/\<img/gi, '<img style=max-width:100%;height:auto');
						this.html = that.Infodesc.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match,
							reSrc) {
							var newImg = '<img src="' + reSrc + '" alt="" style="width:100%;" />';
							return newImg;
						});
						that.end = Number(datalist.receiveExercise.enlistTotal);
						that.start = Number(datalist.receiveExercise.enlistCount);

						uni.setNavigationBarTitle({
							title: that.className
						})
					} else {
						that.noDataCode = true
					}
				}).catch(err => {})
			},

			// 报名列表发布
			getBaoming() {
				let that = this;
				that.isProsse = false;
				if (that.studentids == '') {
					uni.showToast({
						title: '请选择学生',
						icon: 'none'
					})
					return
				}

				this.$request({
					url: 'course/v2/enlist/exercise/enlistExercise',
					data: {
						exercise_id: that.classId,
						student_id: that.studentids,
						receive_id: that.receiveId
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"X-Access-Token": wx.getStorageSync("token")
					},
					method: 'post'
				}).then(res => {
					that.studentids = [];
					that.isEnlist = !that.isEnlist;
					if (res.data.success) {
						that.getClassDetail();
						that.popupNums = true;
						that.popupCode = !that.popupCode;
					}
					setTimeout(item => {
						this.isProsse = true;
					}, 1000)
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}).catch(err => {
					that.popupNums = false;
					console.error('获取家庭列表异常', err);
				})
			},
			selectIndex(prop) {
				console.log(prop)
				let arrays = this.myfamliyList;
				arrays[prop].checked = !arrays[prop].checked;
				let items = arrays[prop];
				this.studentids = items.student_id;
				console.log(this.studentids)
				console.log("-------------------------" + JSON.stringify(arrays[prop]))
			},
			// 点击报名按钮
			clickEnlist() {
				if (this.userType == 2) {
					uni.showToast({
						title: '您是老师，不可以进行报名，请切换账户再试... ...',
						icon: 'none'
					})
					return
				}
				if (this.isModifyEnlist) {
					this.modifyPost()
				} else {
					this.checkEnlistChildren();

				}
			},
			modifyPost() {
				let that = this;
				this.$request({
					url: 'course/v2/enlist/exercise/updateEnlistExercise',
					data: {
						enlist_id: that.modifyInfo.exerciseId,
						exercise_id: that.classId,
						student_id: that.modifyInfo.studentId,
						receive_id: that.receiveId
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"X-Access-Token": wx.getStorageSync("token")
					},
					method: 'post'
				}).then(res => {
					if (res.data.success) {
						uni.removeStorageSync('modifyClass');
						uni.navigateTo({
							url: '/pages/my/classNet'
						})
					}
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}).catch(err => {
					that.popupNums = false;
					console.error('获取列表异常', err);
				})
			},
			evalutionList() {
				uni.navigateTo({
					url: './evaluationList?classid=' + this.classId
				})
			}
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
				height: 388rpx;

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

			.bottom_disable_btn {
				width: 600rpx;
				height: 110rpx;
				background: darkgray;
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

				.Clear {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 20rpx;
					top: 20rpx;
				}

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
				}
			}


		}
	}
</style>
