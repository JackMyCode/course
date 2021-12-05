<template>
	<view class="content">
    <view class="content-top">
      <view class="content-top-date" v-if="type == 1">
        <picker mode="date" :value="date" @change="bindDateChange" >
          <view class="content-top-date-text">
            {{date}}
          </view>
        </picker>
      </view>


      <view class="tab-active" v-else>
        <view class="flex switch-date-btn topLayout">
          <view v-for="(item,index) in gradeList"  :class="currentGrade == item.value  ? 'active' : ''" @tap="changeTable(item.value)" :key="index">{{item.text }}</view>
        </view>
      </view>
    </view>
    <view class="list-content">
      <view class="list-content-top">
        <image src="/static/images/excellent-top.png" class="list-imgs"></image>
      </view>
      <view class="list-content-table">
        <view class="list-content-table-list">
          <uni-table emptyText="暂无优秀学员数据" class="list-content-table" v-if="type == 1">
            <!-- 表头行 -->
            <uni-tr>
              <uni-th align="center" width="40%">学校</uni-th>
              <uni-th align="center" width="30%">年级（班级）</uni-th>
              <uni-th align="center" width="30%">姓名</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr v-for="(item,index) in exerciseList"  :key="index">
              <uni-td align="center"><text class="font-size:9px">{{item.excellent_user_school}}</text></uni-td>
              <uni-td align="center"><text class="font-size:9px">{{item.grade_value}}( {{item.excellent_user_class}})</text></uni-td>
              <uni-td align="center"><text class="font-size:9px">{{item.excellent_user_name}}</text></uni-td>
            </uni-tr>
          </uni-table>

          <uni-table emptyText="暂无优秀学员数据" class="list-content-table" v-else>
            <!-- 表头行 -->
            <uni-tr>
              <uni-th align="center" width="40%">姓名</uni-th>
              <uni-th align="center" width="60%">课程</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr v-for="(item,index) in schoolList"  :key="index">
              <uni-td align="center" ><text class="font-size:9px">{{item.excellent_user_name}}</text></uni-td>
              <uni-td align="center" ><text class="font-size:9px">{{item.excellent_exercise_name}}</text></uni-td>
            </uni-tr>
          </uni-table>
        </view>
      </view>
    </view>
	</view>
</template>
<script>
	import navBar from '../../components/nav-bar.vue';
	import customHeader from '@/components/custom-header/custom-header.vue';
  import Calendar from '@/components/Li-Calendar/Li-Calendar.vue';
	import util from "@/utils/util.js"
	export default {
		components: {
			navBar,
			customHeader,
      Calendar
		},
		data() {
			return {
				title: '优秀学员',
                id:'',
				contentnum:'',

        type : 1, // 优秀学员详情类型
        year : 2021, // 年份
        seasonType : 0, // 季节
        keyname:'', // 关键字
        grade : 0,
        date : '',

        schoolList :[] , //优秀学员学校列表
        gradeList :[] , //年级列表
        currentGrade : 0 , //当前选中的年级

        mark: [], //上课的人数
        rangeMode: false,
        currentDay: '', // 当天的日期
        exerciseList :[], //优秀学员课程列表

			}
		},
		onLoad(options) {
        this.type = options.type
        this.year = options.year
        this.seasonType = options.seasonType
        this.keyname = options.keyname
        this.date = this.getNowFormatDate()
         this.getClassDetail()
      uni.setNavigationBarTitle({
        title:this.keyname
      })
		},
		methods: {
			// 获取课程详情
			getClassDetail(){
				let that = this;
				that.$request({
					url: '/course/v2/citation/excellentDetail',
					data: {
            type:that.type,
            year:that.year,
            seasonType:that.seasonType,

            keyname : that.keyname,
            date : that.date,
            grade :that.currentGrade
					},
					method: 'get'
				}).then(res => {
					if(res.data.success){
					  if (this.type == 1){
					    this.exerciseList = res.data.result.result
            }else{
					    this.currentGrade = res.data.result.grade
              this.gradeList = res.data.result.gradeList
              this.schoolList = res.data.result.result
            }
					}else{
            this.exerciseList = []
            this.schoolList = []
          }
				}).catch(err => {
				  this.exerciseList = []
          this.schoolList = []
					console.error('获取购物车商品列表异常', err);
				})
			},
      bindDateChange: function(e) {
        this.date = e.target.value;
        this.getClassDetail()
      },
      dayChange(e) {
        let month = (e.month) > 9 ? (e.month) : "0" + (e.month)
        let currentDay = e.year + '-' + month + '-' + e.day;
        if (this.currentDay != currentDay) {
          this.currentDay = currentDay
          this.date = currentDay
          this.getClassDetail()
        }
      },
      changeTable(grade){
			  if (grade != this.currentGrade ){
			    this.currentGrade = grade
          this.getClassDetail()
        }
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100vh;
		background-color:#E8F2FF;
		overflow: hidden;
	}
	//.content {
	//	width: 100%;
	//	height: 100vh;
	//	overflow: hidden;
  //
	//}
  .content-top{
    //background-color: #01AAED;
    .content-top-date{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .content-top-date-text{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        background-color: #fa2f0a;
        width: 350rpx;
        line-height: 50rpx;
        //border:2rpx solid;
        border-radius:32rpx;

      }
    }
  }
  .title{
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    align-items: center;
    .title-content{
      margin:0 auto;
      display: flex;
      justify-content: center;
      font-size: 37rpx;
      color: red;
    }
  }


  .tab-active {
    display: flex;
    line-height: 70rpx;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    font-size: 36 rpx;
    padding: 0 30 rpx;
    box-sizing: border-box;
    margin-top: 30 rpx;
    margin-bottom: 30 rpx;

    .tab-content {
      width: 20%;
      height: 80 rpx;
      text-align: center;
      line-height: 80 rpx;
      padding: 0 10 rpx;
      box-sizing: border-box;

      image {
        width: 30 rpx;
        height: 28 rpx;
        vertical-align: middle;
        margin-left: 6 rpx;
      }
    }
    .active-box {
      //width: 80%;
      height: 80 rpx;
      color: #FFFFFF;
      border-bottom: 2px solid #FFFFFF;
    }
  }

  .list-content{
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #910000;

    .list-content-top{
      width: 100%;
      //height: 100vh;
      .list-imgs{
        width: 100%;
        height: 150rpx;
        //height: 100vh;
        //height:80vh;
      }
    }
    .list-content-table{
      width: 650rpx;
      background-color: #FFFAB1  !important;
      background: linear-gradient(to right, #FFFAB1, #f3cf13);
      margin-bottom: 40rpx;
      border-radius:25px;
      padding-top: 30rpx;
      padding-bottom: 30rpx;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;


      .list-content-table-list{
        width: 600rpx;
      }
    }
  }


  @font-face {
    font-family: "iconfont";
    src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKIAAsAAAAABkAAAAI9AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApMXwE2AiQDCAsGAAQgBYRtBy8bhAXIDiUJD4mAwwJAQDz8t/Z63+xsgFnlRAJqQBsFpCLUjwxXNUpVV5lq1tV//5cubVlTuDzPmEt1qTGTf/9u5wLborBgNM9XWFBgQbj6xL3TP4E+yKgHlONeNNakSV1AXRxIAe2NUWQllHHD2AUv8DGBBiNmZHbPboowJLNXBeLemiYMFUKyzLJ1Qk3DwSy+6FeXntIXPqLvxz/LMURSFuy6g8vTDhz8HHbyikq1ohIQwiCg4yUKLAGZOGlM7ckJxuU0pPpMgGNVBz+Hq9XAKY5qE+yvsyubwBCUP5PCWylAgscaqQPom3QJ0XH31k0fla7O+/PXx17D/oTP85+hi7390lQJFNBUd7q0YGdK0104wD9L39KvQPD5/NKrT67+H2rM4Md+71pkzYZ5qNuHO/gXioFd2VDZjpQ1RWN/0nGOhgYNqMK+Dv9Tzd0nzoU63RM8tYYzFOpMkZldQqnRCmrU2UCDRefHG3USOZHrseAVILT5RNLiOwptvsnM/qHUo4cabZFDg7PovLDRTNiRHaGmUgdbj2jbUciuS0fi6jyZW78peVXEl0lSG8XFuYVy9pxCkiW2pHdmSZWRJQrwDDxHvh9hLJFLbZ1zVOOt+XluetNcOwpgxA5BmhTpQC2PkNUWCXEwWI1UPp9HjFu+JunoqMuWEZGy46NFcxYGkOf6cFDHo7ySumMsUYohJiIBdAbmEZ8vguLmeS7SpuY4ExKxLfNOLx6qn9veGPzdIWhgW1I4MwrlgzWOAgAA') format('woff2');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-right:before {
    content: "\e609";
  }
  // 注：直接通过var（）来动态修改主题色，可省略组件进行传参
  $theme: #1890FF;
  //$theme: var(--theme);

  .flex {
    display: flex;
  }

  .justify-between {
    justify-content: space-between;
  }

  .date-content {
    margin: 20rpx 0;
    line-height: 70rpx;
    font-size: 26rpx;

    .iconfont {
      font-size: 32rpx;
    }
  }

  .common-datetime {
    color: #222222;
  }

  .switch-date-btn {
    width: 700rpx;
    border: 1rpx solid #CECECE;
    border-radius: 30rpx;
    margin: 0 auto;
  }

  .common-datetime,
  .switch-date-btn view {
    line-height: 60rpx;
  }

  .common-datetime>view {
    font-size: 20rpx;
  }

  .switch-date-btn view {
    padding: 2rpx 26rpx;
    border-radius: 30rpx;
    width: 130rpx;
    font-size: 32rpx;
    text-align: center;
  }

  .switch-date-btn>view.active {
    color: #FFFFFF;
    background: $theme;
  }

  //horizontal样式重置
  .horizontal {
    .common-datetime {
      line-height: 48rpx;
    }

    .switch-date-btn {
      margin: 0;
      border: none;

      &>view {
        line-height: 48rpx;
      }
    }

    .common-datetime {
      &>view {
        font-size: 30rpx;
      }

      .iconfont {
        font-size: 32rpx;
      }
    }

    .switch-date-btn {
      &>view {
        margin-right: 10rpx;
        padding: 2rpx 26rpx;
        border-radius: 30rpx;
        font-size: 30rpx;
      }
    }
  }

</style>
