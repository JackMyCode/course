<template>
	 <view class="content">
		 <navBar style="position: fixed;left: 0;top: 0;z-index: 3;"  :title="title"></navBar>
		 <custom-header></custom-header>
		 <view class="selectBox">
		 	<view class="items">
		 		<picker :value="index_1" :range="arraySubject" @change="goOpenSubject" >
		 			<text>{{arraySubject[index_1]}}</text>
		 			<image src="../../static/images/home/arrow_down.png" mode="" class="selearow"></image>
		 		</picker>
		 	</view>
		 	<view class="items" style="justify-content: center;">
		 		<picker :value="index_2" :range="arrayClass" @change="goOpenClass" >
		 			<text>{{arrayClass[index_2]}}</text>
		 			<image src="../../static/images/home/arrow_down.png" mode="" class="selearow"></image>
		 		</picker>
		 	</view>
		 	<view class="items" style="justify-content: flex-end;">
		 		<picker :value="index_3" :range="arrayMap" @change="goOpenMap" >
		 		<text>{{arrayMap[index_3]}}</text>
		 		<image src="../../static/images/home/arrow_down.png" mode="" class="selearow"></image>
		 		</picker>
		 	</view>
		 </view>
	 	<view class="itemsBox" v-if="selectList.length > 0" v-for="(item,index) in selectList" :key="index" @click="goClassDetail(item.id)">
	 		<view class="title_1">
	 			{{item.ename}}-{{item.edesc}}
	 		</view>
	 		<view class="title_2">
	 			<image src="../../static/images/home/timer.png" mode="" class="time_icon"></image>
	 			<text>{{item.eclassBeginsTime[1]}}月{{item.eclassBeginsTime[2]}}日开课</text>~
	 			<text>{{item.eclassEndTime[1]}}月{{item.eclassEndTime[2]}}日结课</text>
	 		</view>
	 		<view class="title_3">
	 			<image src="../../static/images/home/fixed.png" mode="" class="time_icon"></image>
	 			<text v-if="item.addressId_dictText != null">{{item.addressId_dictText}}</text>
	 			<text v-else>暂无地址</text>
	 		</view>
	 		<view class="title_4">
	 			<view class="title_4left">
	 				<image :src="item.courseTeacherList[0].timg" mode="" class="title_avater"></image>
	 				<view class="title_text">
	 					<text class="text1">{{item.courseTeacherList[0].tname}}</text>
	 					<!-- <text class="text2">{{item.courseTeacherList[0].tdesc}}</text> -->
	 				</view>
	 			</view>
	 			<view class="title_4right">
	 				<view class="titleButtom" @click="getnewClass(item)">
	 					上课
	 				</view>
	 			</view>
	 		</view>
	 	</view>
		<view class="seleStudentBox" v-if="code"  catchtouchmove="noneEnoughPeople" @click="clear">
			<view class="sleStudent_box">
			<!-- 	<view class="sele_title">
					选择家庭成员
				</view> -->
				<view class="select_content">
					<text>选择此课程回替换之前的课程哦~</text>
				<!-- 	<checkbox-group @change="checkboxChange">
						<label class="content_size" v-for="item in items" :key="item.value">
							<view>{{item.name}}</view>
							<view style="margin-left: 30rpx;">
								<checkbox :value="item.value" :checked="item.checked" />
							</view>
						</label>
					</checkbox-group> -->
				</view>
				<view class="my_buttom" @click="getBaoming">
					<text>确认报名</text>
				</view>
			</view>
		</view>
	 	<doudi style="position: fixed;bottom: 20%;left: 0;" :url="url" v-if="selectList.length == 0" ></doudi>
	 </view>
</template>

<script>
	 import util from "@/utils/util.js"
	 import customHeader from '@/components/custom-header/custom-header.vue';
	 import doudi from '@/components/doudi.vue';
	 import navBar from '../../components/nav-bar.vue';
	 export default {
	 	components: {
	 		customHeader,
	 		doudi,
			navBar
	 	},
	 	data() {
	 		return {
				title:'课程选择',
	 			statusBarHeight: 0,
	 			school:'海棠花园校区',
	 			notices: [],
	 			arraySubject: ['科目'],
	 			arrayClass: ['年级'],
	 			arrayMap: ['上课点'],
	 			index_1: 0,
	 			index_2: 0,
	 			index_3: 0,
	 			selectList:[],
	 			subProp:'',  // 科目
	 			claProp:'',  // 年级
	 			mapProp:'',// 上课点
	 			bannerList:[],
	 			pages:1,
	 			getCode:true,
	 			url:'/static/images/doudi/doudi_1.png',
				code:false,
				elid:'',
				newid:''
	 		}
	 	},
		onLoad(options) {
			this.elid = options.id
		},
	 	onShow() {
	 		this.selectList=[];
	 		this.pages=1;
	 		this.getItemList();
	 		this.getClassList();
	 		this.getGetSchool();
	 	},
	 	onReachBottom(){
	 		  let that = this;
	 		  if(that.getCode){
	 			  that.pages+=1;
	 			  that.getClassList();
	 			  that.getCode= false
	 		  }
	 	},
	 	methods: {
			getBaoming(){
				 let that = this;
				 that.$request({
				 	url: '/course/users/exercise_student/edit',
				 	data: {
				 		esId: that.elid,  // 老id
						newExerciseId:that.newid // 新课程
				 	},
				 	method: 'post',
					header:{
							'Content-Type': 'application/x-www-form-urlencoded',
							"X-Access-Token": wx.getStorageSync("token")
					},
				 }).then(res => {
				 	if (res.data.success) {
			             uni.navigateBack()
				 	}else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
				 }).catch(err => {
				 })
			},
			getnewClass(item){
				this.newid = item.id;
			    this.code = !this.code
			},
			clear(){
				this.code = !this.code;
			},
	 		getBanner(item){
	 			if(item.type == 0){ // 新闻资讯
	 				uni.navigateTo({
	 					url:'/pages/news/newsDetail?prop='+item.link
	 				})
	 			}
	 			if(item.type == 1){ // 课程详情
	 				uni.navigateTo({
	 					url:'./selectClassDetail?clssid='+item.link
	 				})
	 			}
	 		},
	 		// 科目
	 		goOpenSubject(e) {
	 			
	 		    this.index_1 = e.target.value;
	 			let text = this.arraySubject[this.index_1];
	 			this.subProp = this.purArrToArrObjectGra(text,'subjectList');
	 			  this.pages=1;
	 			this.selectList=[];
	 			this.getClassList();
	 		},
	 		// 年级
	 		goOpenClass(e) {
	 			this.index_2 = e.target.value;
	 			let text = this.arrayClass[this.index_2];
	 			this.claProp = this.purArrToArrObjectGra(text,'gradeList');  
	 			this.pages=1;
	 			this.selectList=[];
	 			this.getClassList();
	 		},
	 		// 上课点 
	 		goOpenMap(e) {
	 			this.index_3 = e.target.value;
	 			let text = this.arrayMap[this.index_3];
	 			this.mapProp = this.purArrToArrObject(text,'courseClassAddressList'); 
	 			this.pages=1;
	 			 this.selectList=[];
	 			 this.getClassList();
	 		},
	 		goNotice(prop){
	 			uni.navigateTo({
	 				url:'./Ranking?type='+prop
	 			})
	 		},
	 		goClassDetail(prop){
	 			uni.navigateTo({
	 				url:'./selectClassDetail?clssid='+prop
	 			})
	 		},
	 		goSearch(){
	 			uni.navigateTo({
	 				url:'./search'
	 			})
	 		},
	 		// 获取 首页信息
	 		getItemList(){
	 			let that = this;
	 			this.$request({
	 				url: '/course/index/index',
	 				data: {},
	 				method: 'get'
	 			}).then(res => {
	 				if(res.data.success){
	 					let datalist = res.data.result;
	 					wx.setStorageSync('subjectList',datalist.subjectList);
	 					wx.setStorageSync('gradeList',datalist.gradeList);
	 					wx.setStorageSync('courseClassAddressList',datalist.courseClassAddressList);
	 					wx.setStorageSync('notice',datalist.news);
	 					let subdata = that.arrObjectToPurArr(datalist.subjectList);
	 					let cladata = that.arrObjectToPurArr(datalist.gradeList);
	 					let mapdata = that.arrObjectToAddressArr(datalist.courseClassAddressList);
	 					that.arraySubject=that.arraySubject.concat(subdata);
	 					that.arrayClass=that.arrayClass.concat(cladata);
	 					that.arrayMap=that.arrayMap.concat(mapdata);
	 					that.notices = datalist.news;
	 					that.bannerList = datalist.banners;
	 					wx.setStorageSync('cladata',cladata);
	 					wx.setStorageSync('mapdata',mapdata);
	 					wx.setStorageSync('subdata',subdata);
	 				}
	 			}).catch(err => {
	 			})
	 		},
	 		// 获取课程列表
	 		getClassList(){
	 			let that = this;
	 			that.$request({
	 				url: '/course/exercise/list',
	 				data: {
	 					esubject:that.subProp,  // 科目
	 					gradevalue:that.claProp,  // 年级
	 					addressId:that.mapProp,// 上课点
	 					exerciseStatus:0,
	 					pageNo: that.pages,
	 					pageSize: 20,
	 					
	 				},
	 				method: 'get'
	 			}).then(res => {
	 				if(res.data.success){
	 					
	 				    let datalist = res.data.result.records;
	 					for(let item of datalist){
	 						item.eclassBeginsTime = util.split_time(item.eclassBeginsTime);
	 						item.eclassEndTime = util.split_time(item.eclassEndTime)
	 					}
	 					that.selectList =that.selectList.concat(datalist);
	 					that.getCode=true;
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
	 					pageSize:100
	 				},
	 				method: 'get'
	 			}).then(res => {
	 				if (res.data.success) {
	 					let dataList = res.data.result.records;
	 					uni.setStorageSync('schoolList',dataList);
	 					 let List = that.arrObjectToschool(dataList);
	 					uni.setStorageSync('schools',List);
	 				}
	 			}).catch(err => {
	 			})
	 		},
	 		//数组对象转纯数组 学校处理
	 		arrObjectToschool(dataNum){
	 			let newData = [];
	 			for(let item of dataNum){
	 				newData.push(item.sname);
	 			}				
	 			return newData;
	 		},
	 		//数组对象转纯数组
	 	    arrObjectToPurArr(dataNum){
	 			let newData = [];
	 			for(let item of dataNum){
	 				newData.push(item.title);
	 			}				
	 			return newData;
	 		},
	 		// 上课点数组 处理
	 		arrObjectToAddressArr(dataNum){
	 			let newData = [];
	 			for(let item of dataNum){
	 				newData.push(item.aname);
	 			}				
	 			return newData;
	 		},
	 		//纯数字 返回  value值  上课点
	 		purArrToArrObject(text,dataNum){
	 		   let arrays =  uni.getStorageSync(dataNum);
	 		   let key_id = ''
	 			for(let item of arrays){
	 				if(item.aname == text){
	 					key_id = item.id
	 				}
	 			}				
	 			return key_id;
	 		},
	 		//纯数字 返回  value值  年级
	 		purArrToArrObjectGra(text,dataNum){
	 		   let arrays =  uni.getStorageSync(dataNum);
	 		   let key_id = ''
	 			for(let item of arrays){
	 				if(item.title == text){
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
		.selectBox {
			width: 100%;
			height: 84rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 40rpx;
			box-sizing: border-box;
		
			.items {
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
		
				.selearow {
					width: 23rpx;
					height: 12rpx;
					// background-color: #f40;
					margin-left: 8rpx;
				}
		
				text {
		
					font-size: 28rpx;
					font-family: SourceHanSansCN-Regular;
					line-height: 40rpx;
					color: #666666;
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
		.doudiBox{
			width: 100%;
			height:350rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: fixed;
			left: 0;
			bottom: calc(30% - 275rpx);
			.icon{
				width: 324rpx;
				height: 286rpx;
				
			}
			text{
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular;
				line-height: 38rpx;
				color: #BABABA;
				margin-top: -65rpx;
				// margin-top: 46rpx;
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
	    	align-items: center;
	    
	    	.sleStudent_box {
	    		width: 706rpx;
	    		height: 300rpx;
	    		background-color: #FFFFFF;
	    		border-radius: 10rpx;
	    		padding: 30rpx;
	    		box-sizing: border-box;
	           display: flex;
	    	   justify-content: center;
	    	   align-items: center;
	    	   flex-direction: column;
	    		.sele_title {
	    			font-size: 26rpx;
	    			color: #666;
	    			line-height: 30rpx;
	    			width: 100%;
	    			height: 40rpx
	    		}
	    
	    		.select_content {
	    			width: 100%;
	    			height: 200rpx;
					display: flex;
					justify-content: center;
				    align-items: center;
	    			// overflow-y: auto;
	    			// background-color: #007AFF;
	    			// margin-top: 20rpx;
	    			// overflow-y: auto;
	    			.content_size{
	    				width: 100%;
	    				height: 80rpx;
	    				display: flex;
	    				justify-content:space-between;
	    				align-items: center;
	    				padding:0 20rpx;
	    				box-sizing: border-box;
	    				border-bottom: 1rpx solid #eee;
	    			}
	    		}
	    		.my_buttom{
	    			width: 300rpx;
	    			height: 80rpx;
	    			background: linear-gradient(90deg, #7C09FB 0%, #334FE9 100%);
	    			box-shadow: 0px 6rpx 12rpx rgba(53, 77, 233, 0.6);
	    			opacity: 1;
	    			border-radius: 50rpx;
	    			display: flex;
	    			justify-content: center;
	    			align-items: center;
	    			margin-top: 30rpx;
	    			text {
	    				font-size: 28rpx;
	    				font-family: Source Han Sans CN;
	    				font-weight: 400;
	    				line-height: 40rpx;
	    				color: #FFFFFF;
	    			}
	    		}
	    	}
	    }
	}
</style>
