<template>
	<view class="content">
		<view class="myfamliy_items">
			<view class="items_name">
				<text>学校:</text>
			</view>
			<picker class="items_input" :value="schoolIndex" :range="schoolList"  range-key="sname" @change="selectSchool">
				<view class=" items_inputBox">
					<input type="text" :value="dataObject.school" disabled="disabled"  placeholder="请选择学校" />
					<image src="/static/images/my/arrow.png" mode="" class="arrows"></image>
				</view>
			</picker>
		</view>
		<view class="myfamliy_items">
			<view class="items_name">
				<text>年级:</text>
			</view>
			<picker class="items_input" :value="gradeIndex" :range="gradeList" range-key="text"  @change="selectGrade">
				<view class=" items_inputBox">
					<input type="text" :value="dataObject.gradeText"  disabled="disabled" placeholder="请选择年级" />
					<image src="/static/images/my/arrow.png" mode="" class="arrows"></image>
				</view>
			</picker>
		</view>
		<view class="myfamliy_items">
			<view class="items_name">
				<text>班级:</text>
			</view>
			<picker class="items_input" :value="classIndex" :range="classesList" range-key="sclass" @change="selectClass">
				<view class="items_inputBox">
					<input type="number" :value="dataObject.className"  disabled="disabled" placeholder="请选择班级" />
					<image src="/static/images/my/arrow.png" mode="" class="arrows"></image>
				</view>
			</picker>
		</view>

		<view class="myfamliy_items">
			<view class="items_name">
				<text>姓名:</text>
			</view>
			<view class="items_input active">
				<input type="text"  v-model="dataObject.name" placeholder="请输入学生姓名" />
			</view>
		</view>

    <view class="myfamliy_items">
      <view class="items_name">
        <text>生日:</text>
      </view>
      <picker class="items_input" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
        <view class="items_inputBox">
          <input type="number" :value="dataObject.sbirthday"  disabled="disabled" placeholder="请输入学生生日" />
          <image src="/static/images/my/arrow.png" mode="" class="arrows"></image>
        </view>
      </picker>
    </view>
		<view class="myfamliy_items">
			<view class="items_name">
				<text>学号:</text><text class="smalie">(选填)</text>
			</view>
			<view class="items_input active">
				<input type="text"  v-model="dataObject.studentNo" placeholder="请输入学生学号" />
			</view>
		</view>
		<view class="myfamliy_items" style="margin-bottom: 20rpx;">
			<view class="items_name">
				<text>性别:</text>
			</view>
			<picker class="items_input" :value="sexIndex" :range="sexList" range-key="text"  @change="selectSex">
				<view class="items_inputBox">
					<input type="text" :value="dataObject.sexText"  disabled="disabled" placeholder="请选择性别" />
					<image src="/static/images/my/arrow.png" mode="" class="arrows"></image>
				</view>
			</picker>
		</view>

    <view v-if="disableMsg" style="margin-bottom: 20rpx;color: #c7152a;font-size: xx-small"> {{msg}} </view>
		<view class="buttonBox">
			<view class="bottom_btn" @click="getAddFmaily">
				<text>保存</text>
			</view>

		</view>
    <view class="buttonBox" v-if="typeCode == false">
      <view class="delete_btn" @click="delFmaily">
        <text>删除</text>
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

				title: '填写子女信息',
				dataObject: {
					name: '', // 姓名
					sex: 1, //性别
					studentNo: '', //学号
          school: '', // 学校
          gradeText:'', // 年级名
          gradeValue:'', // 年级对应的值
          className : '', // 班级名称
          sexText :'男', // 性别名
          sexValue :'1', // 性别对应的值
          sbirthday : '2010-01-01'
				},

        gradName:'请选择年级',// 年级名字
				className:'请选择班级',// 年级名字

				schoolList: ['请选择学校'],
				gradeList: ['请选择年级'],
        classesList :[],
				sexList: [{"text": "男", "value": "1"}, {"text": "女", "value": "2"}],

        schoolIndex: 0,
        gradeIndex: 0,
        classIndex: 0,
        sexIndex: 0,
        defaultGradeList:{'3':'三年级','4':'四年级','5':'五年级','6':'六年级','7':'七年级','8':'八年级','9':'九年级'},
				defaultClassesList: [
				    {'sclass': '1班'},{'sclass': '2班'},{'sclass': '3班'},{'sclass': '4班'},{'sclass': '5班'},{'sclass': '6班'},{'sclass': '7班'},{'sclass': '8班'},{'sclass': '9班'},{'sclass': '10班'},
				    {'sclass': '11班'},{'sclass': '12班'},{'sclass': '13班'},{'sclass': '14班'},{'sclass': '15班'},{'sclass': '16班'},{'sclass': '17班'},{'sclass': '18班'},{'sclass': '19班'},{'sclass': '20班'},
				    {'sclass': '21班'},{'sclass': '22班'},{'sclass': '23班'},{'sclass': '24班'},{'sclass': '25班'},{'sclass': '26班'},{'sclass': '27班'},{'sclass': '28班'},{'sclass': '29班'},{'sclass': '30班'},
				    {'sclass': '31班'},{'sclass': '32班'},{'sclass': '33班'},{'sclass': '34班'},{'sclass': '35班'},{'sclass': '36班'},{'sclass': '37班'},{'sclass': '38班'},{'sclass': '39班'},{'sclass': '40班'},
				    {'sclass': '41班'},{'sclass': '42班'},{'sclass': '43班'},{'sclass': '44班'},{'sclass': '45班'},{'sclass': '46班'},{'sclass': '47班'},{'sclass': '48班'},{'sclass': '49班'},{'sclass': '50班'}],

        id: '',
        methods: 'post',
        typeCode: true,
        typeurl: 'course/v2/users/student/add',
        querySchoolUrl : "/course/common/querySchool",
        queryGradeByNameUrl : "/course/v2/common/querySchool/sgrade",
        queryClassByNameAndGradeUrl : "/course/v2/common/querySchool/sclass",
        delurl:"course/v2/users/student/delete",
        disableMsg:false,
        msg:"进行选课之前请先新增子女信息~！",

        index: 0,
        date: '2010-01-01',
			}
		},
		onLoad(options) {
      this.requestSchool()
			if (options.type == '2') {
				this.getClass(options.schoolName)

				this.typeurl = 'course/v2/users/student/edit';
				this.id = options.id;
				this.title = '编辑成员'
				this.typeCode = false;
				this.init(options);
			}

			if (options.source == 0){
        this.disableMsg = true
      }
		},
		methods: {
      // 初始化数据
      init(data) {

        this.dataObject.name = data.name;
        this.dataObject.school = data.schoolName;
        this.dataObject.gradeText = this.defaultGradeList[data.grade];
        this.dataObject.gradeValue = data.grade;
        this.dataObject.className = data.class;
        this.dataObject.studentNo = data.studentNo;
        this.dataObject.sbirthday = data.sbirthday.substr(0,10);
        this.date = this.dataObject.sbirthday;

        for (let i = 0,length = this.sexList.length; i < length; i++) {
          if (this.sexList[i]["value"] == data.sex){
            this.dataObject.sexText = this.sexList[i]["text"];
            this.dataObject.sexValue = this.sexList[i]["value"];
            break;
          }
        }
        this.requestSchool();
        this.requestGrade();
        this.requestClass();
      },
      // 选择学校触发事件
      selectSchool(e) {

       // 选择学校重置年级和班级信息
       this.resetGrade();
       this.resetClass();

        // 修改显示值
        this.dataObject.school = this.schoolList[e.target.value].sname;

        // 请求年级数据
        this.requestGrade();
      },
      // 选择年级
      selectGrade(e) {
        //重置班级信息
        this.resetClass();

        // 设置年级信息
        this.dataObject.gradeText = this.gradeList[e.target.value].text;
        this.dataObject.gradeValue = this.gradeList[e.target.value].value;

        //根据学校名称和年级查询班级信息
        this.$request({
          url: this.queryClassByNameAndGradeUrl,
          data: {sname:this.dataObject.school,sgrade:this.dataObject.gradeValue},
          method: 'get'
        }).then(res => {
          if (res.data.success) {
            if (res.data.result.length == 0 ){
              this.classesList = this.defaultClassesList;
            }else if (res.data.result[0].hasOwnProperty("sclass")){
              this.classesList = res.data.result;
            }else{
              this.classesList = this.defaultClassesList;
            }
          }else{
            this.classesList = this.defaultClassesList;
          }
        }).catch(err => {
          this.classesList = this.defaultClassesList;
        })
      },
      // 选择班级
      selectClass(e) {
        this.dataObject.className = this.classesList[e.target.value].sclass;
      },
      // 重置年级信息
      resetGrade(){
        // 重置年级信息
        this.dataObject.gradeText = '';
        this.dataObject.gradeValue = '';
        this.gradeList = ['请选择年级'];
      },
      // 重置班级信息
      resetClass(){
        this.dataObject.className = '';
        this.classesList = [];
      },
			// 选择性别
			selectSex(e) {
        this.dataObject.sexText = this.sexList[e.target.value].text;
        this.dataObject.sexValue = this.sexList[e.target.value].value;
			},

			// 添加 家庭成员
			getAddFmaily() {
				let that = this;
				let dataObj = '';
				if(that.dataObject.school == ''){
					uni.showToast({
						title:'请选择学校',
						icon:'none'
					})
					return
				}
        if(that.dataObject.gradeText == '' ||that.dataObject.gradeValue == '' ){
          uni.showToast({
            title:'请选择年级',
            icon:'none'
          })
          return
        }
				if(that.dataObject.className == '' ){
					uni.showToast({
						title:'请选择班级信息',
						icon:'none'
					})
					return
				}

				if(that.dataObject.name == ''){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}
				if (that.typeCode) {
					dataObj = {
						sname: that.dataObject.name, // 姓名
						sgrade: that.dataObject.gradeValue, // 年级
						sclass: that.dataObject.className, //班级
						ssex: that.dataObject.sexValue,
						studentNo: that.dataObject.studentNo,
						schoolName: that.dataObject.school, // 学校
            sbirthday:that.dataObject.sbirthday,//生日
					}
				} else {
					dataObj = {
						id: that.id,
            sname: that.dataObject.name, // 姓名
            sgrade: that.dataObject.gradeValue, // 年级
            sclass: that.dataObject.className, //班级
            ssex: that.dataObject.sexValue,
            studentNo: that.dataObject.studentNo,
            schoolName: that.dataObject.school, // 学校
            sbirthday:that.dataObject.sbirthday,//生日
					}
				}
				this.$request({
					url: that.typeurl,
					data: dataObj,
					method: that.methods
				}).then(res => {
					if (res.data.success) {
						uni.showToast({
							title: res.data.result,
							icon: 'none'
						})
						uni.navigateBack();
					}else{
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
				}).catch(err => {
					uni.navigateBack();
				})
			},
      delFmaily(){
        let that = this;
        this.$request({
          url: that.delurl,
          data: {id:that.id},
          method: "delete",
          header:{
            'Content-Type': 'application/x-www-form-urlencoded',
            "X-Access-Token": wx.getStorageSync("token")
          },
        }).then(res => {
          if (res.data.success) {
            uni.showToast({
              title: res.data.result,
              icon: 'none'
            })
            uni.navigateBack();
          }
        }).catch(err => {
          uni.navigateBack();
        })
      },
      requestSchool(){ // 获取学校列表
        this.$request({
          url: this.querySchoolUrl,
          data: {},
          method: 'get'
        }).then(res => {
          if (res.data.success) {
            this.schoolList = res.data.result;
          }
        }).catch(err => {
        });
      },
      requestGrade(){// 根据学校名称获取，获取班级信息
        //根据学校名获取年级
        this.$request({
          url: this.queryGradeByNameUrl,
          data: {sname:this.dataObject.school},
          method: 'get'
        }).then(res => {
          if (res.data.success) {
            this.gradeList = res.data.result;
          }
        }).catch(err => {
        });
      },
      requestClass(){
        this.$request({
          url: this.queryClassByNameAndGradeUrl,
          data: {sname:this.dataObject.school,sgrade:this.dataObject.gradeValue},
          method: 'get'
        }).then(res => {
          if (res.data.success) {
            if (res.data.result.length == 0 ){
              this.classesList = this.defaultClassesList;
            }else if (res.data.result[0].hasOwnProperty("sclass")){
              this.classesList = res.data.result;
            }else{
              this.classesList = this.defaultClassesList;
            }
          }else{
            this.classesList = this.defaultClassesList;
          }
        }).catch(err => {
          this.classesList = this.defaultClassesList;
        })
      },
			getGetSchool() {
				let that = this;
				this.$request({
					url: '/course/v2/common/querySchool',
					data: {
						pageNo: 1,
						pageSize: 100
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let dataList = res.data.result;
						uni.setStorageSync('schoolList', dataList);
						that.schoolList =that.arrObjectToPurArr(dataList);
					}
				}).catch(err => {
				})
			},
			// 年级处理
			getClass(className) {
				let that = this;
				this.$request({
					url: '/course/v2/common/querySchool/sgrade',
					data: {
						sname: className
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let dataList = res.data.result;
						uni.setStorageSync('arrayClass', dataList);
						that.gradeList = that.arrObjectToPurArrClass(dataList);
					}
				}).catch(err => {
				})
			},
			//班级
			getBanJi() {
				let that = this;
				let className = that.dataObject.class;
				let schoolName = that.dataObject.school;
				this.$request({
					url: '/course/v2/common/querySchool/sclass',
					data: {
						sname: schoolName,
						sgrade: className
					},
					method: 'get'
				}).then(res => {
					if (res.data.success) {
						let dataList = res.data.result;
						uni.setStorageSync('arraygrad', dataList);
						that.gradeList = that.gradeList.concat(that.arrObjectToPurArrClass(dataList));
					}
				}).catch(err => {
				})
			},
			//数组对象转纯数组 学校
			arrObjectToPurArr(dataNum) {
				let newData = [];
				for (let item of dataNum) {
					newData.push(item.sname);
				}
				return newData;
			},
			// 年级
			arrObjectToPurArrClass(dataNum) {
				let newData = [];
				for (let item of dataNum) {
					newData.push(item.text);
				}
				return newData;
			},
			//纯数字 返回  value值  学校
			purArrToArrObject(text, dataNum) {
				let arrays = uni.getStorageSync(dataNum);
				let key_id = ''
				for (let item of arrays) {
					if (item.sname == text) {
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
					if (item.text == text) {
						key_id = item.value
					}
				}
				return key_id;
			},

      bindDateChange: function(e) {
        this.dataObject.sbirthday = e.target.value
      },
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100vh;
		background-color: #F1F1F1;
	}
	.content {
		width: 750rpx;
		height: 100vh;
		background-color: #F1F1F1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;


		.myfamliy_items {
			width: 750rpx;
			height: 110rpx;
			margin-top: 20rpx;
			background: #FFFFFF;
			// box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
			opacity: 1;
			border-radius: 11rpx;
			padding: 35rpx 25rpx;
			box-sizing: border-box;
            display: flex;
			justify-content: flex-start;
			align-items: center;
			.items_name {
				flex: 2;
				height: 40rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				text {
					font-size: 35rpx;
					font-family: SourceHanSansCN-Medium;
					line-height: 40rpx;
					color: #333333;
					opacity: 1;
				}

				.smalie {
					height: 40rpx;
					margin-left: 10rpx;
					font-size: 21rpx;
					font-family: SourceHanSansCN-Medium;
					line-height: 40rpx;
					color: #333333;
					opacity: 1;
				}
			}

			.items_input {
				flex: 5;
				height: 60rpx;
				.items_inputBox{
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content:space-between;
					.defult {
						font-size: 35rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #C7C7C7;
						opacity: 1;
					}
					input {
						font-size: 35rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #666;
					}
					.arrows {
						width: 18rpx;
						height: 28rpx;
					}
				}
			}
      .items_msg {
        color: mediumvioletred;
      }
			.active{
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}

		.buttonBox {
			width: 100%;
			height: 100rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;
			align-items: flex-start;

			.bottom_btn {
				width: 556rpx;
				height: 90rpx;
				background: #3E8BF3;
				opacity: 1;
				border-radius: 69rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				text {

					font-size: 40rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					line-height: 70rpx;
					color: #FFFFFF;
					// letter-spacing: 42px;
					opacity: 1;
				}
			}

      .delete_btn {
        width: 556rpx;
        height: 90rpx;
        background: red;
        opacity: 1;
        border-radius: 69rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        text {

          font-size: 40rpx;
          font-family: Source Han Sans SC;
          font-weight: 400;
          line-height: 70rpx;
          color: #FFFFFF;
          // letter-spacing: 42px;
          opacity: 1;
        }
      }
		}

	}
</style>
