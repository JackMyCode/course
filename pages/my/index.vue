<template>
	<view class="content">
		<view class="avaterBox">
			<view class="info_left">
				<view class="info_imgs">
					<image  v-if="userInfo.avatar" :src="userInfo.avatar" mode="" class="imgs"></image>
					<image v-else src="/static/images/my/avatar.png" mode="" class="imgs"></image>
				</view>
				<view class="userInfo">
					<text>{{userInfo.nickname}}</text>
				</view>
			</view>
		</view>
		<view class="myKindsBox" v-if="!isTeacherCode">
			<view class="mytitle" >
				<view class="mysign">
					全部子女信息
				</view>
			</view>
			<view class="addStudents">
				<view class="students" v-if="studentList" v-for="(item,index) in studentList" :key="index" @click="getMyclick(item)">
					<text>{{item.sname}}</text>
				</view>
				<view class="itemsBox"  @click="goMyfamliy">
					<image src="/static/images/my/adds.png" mode="" class="imgs"></image>
				</view>
			</view>
		</view>
		<view class="itemsBoxs" v-if="!isTeacherCode" @click="goClassnet">
			<view class="left">
				<view class="imgsbox" style="background-color: #68D0DF;">
					<image src="/static/images/my/icon_1.png" mode="" class="imgs"></image>
				</view>
				<text>我的报名</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png"  class="arrow"></image>
			</view>
		</view>
		<!-- 教师端 -->
		<view class="itemsBoxs"   v-if="isTeacherCode" @click="goCourseDay">
			<view class="left">
				<view class="imgsbox" style="background-color: #328DEB;">
					<image src="/static/images/my/icon_4.png" mode="" class="imgs"></image>
				</view>
				<text>当日课程</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png"  class="arrow"></image>
			</view>
		</view>
		<view class="itemsBoxs" v-if="isTeacherCode" @click="goTimeTable">
			<view class="left">
			<view class="imgsbox" style="background-color: #68D0DF;">
				<image src="/static/images/my/icon_5.png" mode="" class="imgs"></image>
			</view>
			<text>课程表</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png"  class="arrow"></image>
			</view>
		</view>

	    <!-- 公用信息 -->		
		<view class="itemsBoxs" @click="goMessage">
			<view class="left">
				<view class="imgsbox" style="background-color: #328DEB;">
					<image src="/static/images/my/icon_2.png" mode="" class="imgs"></image>
				</view>
				<text>关于我们</text>
			</view>
			<view class="right">
				<image src="/static/images/my/arrow.png"  class="arrow"></image>
			</view>
		</view>
		<view class="itemsBoxs" @click="goLogin">
			<view class="left" style="padding-left: 28rpx;">
				<view class="imgsbox" style="background-color: #68D0DF;">
					<image src="/static/images/my/icon_3.png" mode="aspectFit" class="imgs"></image>
				</view>
				<text v-if="isStrong">退出登录</text>
				<text v-else>去登录</text>
			</view>
			<view class="right">
				<!-- <image src="/static/images/my/arrow.png"  class="arrow"></image> -->
			</view>
		</view>
	</view>
</template>

<script>
    import customHeader from '@/components/custom-header/custom-header.vue';
	export default {
		components: {
			customHeader
		},
		data() {
			return {
				userInfo: "",
				studentList:[],
				isTeacherCode:true,
				isStrong:true,
				nowDay:'' // 当日课程
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
		onShow() {
			let token = uni.getStorageSync('token');
			let timer = new Date();
			let month = timer.getMonth()+1;
			this.nowDay = timer.getFullYear() +'-'+(month > 9 ? month : '0' + month) +'-'+timer.getDate();
			if(token == ''){
				this.isStrong = false;
			}else{
				this.isStrong = true;
			}
			let that = this;
			const value = uni.getStorageSync('userInfo');
			this.userInfo = value;
			this.getmyFamliy();
      let dataType = uni.getStorageSync('userType') ;
      if(dataType == 2 ){
        this.isTeacherCode = true;
      }else{
        this.isTeacherCode = false;
      }

		},
		methods: {
			goCourseDay() {
				let that = this;
				this.$request({
					url: 'course/v2/teacher/exerciselist',
					data: {
						date: this.nowDay
					},
					header: {
						"content-type": "application/x-www-form-urlencoded;charset=UTF-8",
						"X-Access-Token": wx.getStorageSync("token")
					},
					method: 'post'
				}).then(res => {
					if (res.data.success) {
							uni.navigateTo({
								url:'./courseDay'
							})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
				}).catch(err => {
				})
			},
			goLogin() {
				uni.clearStorage();
				var timer1=setTimeout(function (){
					 clearTimeout(timer1)
				         uni.navigateTo({
				         	url: '../auth/login'
				         })
						
				},300);
				
			},
			goMessage(){
				uni.navigateTo({
					url:'./newMessage'
				})
			},
			goVersion(){
				uni.navigateTo({
					url:'./version'
				})
			},
			goClassnet(prop) {
				uni.navigateTo({
					url: './classNet?type=' + prop
				})
			},
			goEvaluation() {
				uni.navigateTo({
					url: './evaluation'
				})
			},
			goTimeTable() {
				uni.navigateTo({
					url:'./timetable'
				})
			},
			goMyfamliy() {
				uni.navigateTo({
					url:'./famliyadd'
				})
			},
			// 获取 家庭列表
			getmyFamliy(){
				let that = this;
				this.$request({
					url: 'course/v2/users/users_student/queryByUid',
					data: {},
					method: 'get'
				}).then(res => {
					if(res.data.success){
					   that.studentList = res.data.result;
					}
				}).catch(err => {
				})
			},
			getMyclick(prop){
				uni.navigateTo({
					url:'./famliyadd?type=2'+'&id='+prop.id+'&name='+prop.sname+'&studentNo='+prop.student_no+'&sex='+prop.ssex+'&schoolName='+prop.school_name+'&grade='+prop.sgrade+'&class='+prop.sclass+'&sbirthday='+prop.sbirthday
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100vh;

	}

	.content {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;        
		.avaterBox{
			width: 100%;
			min-height: 200rpx;
		    display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FFFFFF;
			margin-top: 40rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			.info_left{
				flex: 3;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: column;
				.info_imgs{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					border: 6rpx solid #AFCDFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.imgs{
					width: 135rpx;
					height: 135rpx;
					border-radius: 50%;
				}
				.userInfo{
					width: 100%;
					height: 60rpx;
					margin-top: 10rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size: 35rpx;
						font-family: SourceHanSansCN-Regular;
						line-height: 43rpx;
						color: #333333;
						opacity: 1;
					}
				}
			}
		}
       
	   .myKindsBox{
		 width: 695rpx;
		 max-height: 400rpx;
		 margin-top: 20rpx;
		 background: #FFFFFF;
		 box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
		 opacity: 1;
		 border-radius: 11rpx;
		 .mytitle {
		   	width: 100%;
		   	height: 78rpx;
		   	padding: 0 30rpx;
		   	box-sizing: border-box;
		   	display: flex;
		   	justify-content: flex-start;
		   	align-items: center;
		   	margin-top: 20rpx;
		   	.mysign {
		   		font-size: 31rpx;
		   		font-family: SourceHanSansCN-Medium;
		   		line-height: 33rpx;
		   		color: #333333;
		   		opacity: 1;
				font-weight: 600;
		   	}
		   }
		   
		   .addStudents{
		   	width: 100%;
		   	min-height: 180rpx;
			background-color: #FFFFFF;
		   	padding: 0 20rpx;
		   	box-sizing: border-box;
		   	display: flex;
		   	justify-content: flex-start;
		   	align-items: center;
		   	flex-wrap: wrap;
		   	.itemsBox{
		   		width: 125rpx;
		   		height: 125rpx;
		   		margin-bottom: 15rpx;
		   		.imgs{
		   			width: 125rpx;
		   			height: 125rpx;
		   		}
		   	}
		   	.students{
		   		width: 126rpx;
		   		height: 126rpx;
		   		background-color: #3E8BF3;
		   		border-radius: 8rpx;
		   		margin-right:30rpx;
		   		margin-bottom: 15rpx;
		   		display: flex;
		   		justify-content: center;
		   		align-items: center;
		   		text{
		   			width: 66rpx;
		   			min-height: 32rpx;
		   			word-break:break-all;
		   			text-align: center;
		   			font-size: 32rpx;
		   			font-family: PingFang SC;
		   			font-weight: 500;
		   			color: #FFFFFF;
		   			opacity: 1;
		   		}
		   	}
		   }
	   }
		
		
		.itemsBoxs{
			width: 695rpx;
			height: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #FFFFFF;
			box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;
			margin-top: 28rpx;
			.left{
				flex: 4;
				height: 160rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content:flex-start;
				align-items: center;
				.imgsbox{
					width: 83rpx;
					height: 83rpx;
					border-radius: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 40rpx;
					.imgs{
						width: 45rpx;
						height: 45rpx;
					}
				}
				text{
					font-size: 31rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 38rpx;
					color: #2B333B;
					font-weight: 500;
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
		.ones {
			flex-wrap: nowrap;
			justify-content: space-around;
		}
		.myitemBs:after {
			display: block;
			content: "";
			width: 30%;
			height: 0px;
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
	    		height: 72rpx;
	    		background: #7575FF;
	    		opacity: 1;
	    		border-radius: 36rpx;
	    		display: flex;
	    		justify-content: center;
	    		align-items: center;
	    
	    		text {
	    			font-size: 32rpx;
	    			font-family: Source Han Sans CN;
	    			font-weight: 500;
	    			line-height: 40rpx;
	    			color: #F8F4F4;
	    		}
	    	}
	    }
	}
</style>
