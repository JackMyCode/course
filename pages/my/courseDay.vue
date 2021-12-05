<template>
  <view class="content">
    <view class="classDay">
      <scroll-view scroll-y="true" class="classTop">
        <view class="timer">
          {{exerciseName}}
        </view>
        <view class="classInfo" v-for="(item,index) in enlistSchool" :key="index">
          <image v-if="index == 0" src="/static/images/my/allPerson.png" mode="" class="icon"></image>
          <image v-else class="icon"></image>
          <text class="text">{{item}}</text>
        </view>
      </scroll-view>
    </view>
    <view class="classBottom">
      <view class="studentItems">
        <text class="studentNums">{{enlistCount}}</text>
        <text class="studentText">应到</text>
      </view>
      <view class="studentItems">
        <text class="studentNums">{{signCount}}</text>
        <text class="studentText">实到</text>
      </view>
      <view class="studentItems">
        <text class="studentNums">{{unsignCount}}</text>
        <text class="studentText">未到</text>
      </view>
    </view>
    <view class="studentNav">
      <view class="topNav">
        <view class="studentName">
          <text>学生姓名</text>
        </view>
        <view class="selected" v-if="isCurrentDay">
          <label>
            <radio color="#3E8BF3" :checked="operatorType == 1" @click="changeOperatorType(1)" class="checkbtn" />
            <text>签到</text>
          </label>
          <label>
            <radio color="#FF9853" :checked="operatorType == 2" @click="changeOperatorType(2)" class="checkbtn" />
            <text>评优</text>
          </label>
        </view>
      </view>
    </view>
    <view class="doudi" v-if="isExistEnlist" :style="{height:QHeight + 'px'}">
      <view class="doudiBox">
        <image src="/static/images/doudi/doudi_1.png" mode="" class="icon"></image>
        <text>暂无相关信息</text>
      </view>
    </view>
    <scroll-view v-else scroll-y="true" class="studentBox" :style="{height:QHeight + 'px'}">
      <view class="studentTexts" style="width: 100%;min-height: 200rpx;">
        <view class="itemsName" v-for="(item,index) in enlistList" :key="index"  @click="checkStudent(item.id)">
          <text>{{item.student_name}}</text>
          <view class="excegoodStu" v-if="item.excellent_status == 1 || item.excellent_status == '1' ">
            <image src="/static/images/my/goods.png" mode="" class="goodImgs"></image>
          </view>
          <label class="checkeds" v-if=" (item.excellent_status == 1 || item.excellent_status == '1') != true && isCurrentDay">
            <radio color="#3E8BF3" :checked="checkedIdList.indexOf(item.id) != -1"  class="myCheckBox" />
          </label>
        </view>
        <view class="placeholder"></view>
      </view>
    </scroll-view>
    <view class="studentFooter" v-if="isCurrentDay">
      <view class="footerLeft">
        <label class="footerotex" v-if="operatorType == 1">
          <radio color="#3E8BF3" :checked="allCode" class="transleft" @click="getAllCode" /><text>全选</text>
        </label>
      </view>
      <view class="footerRight">
        <view class="Btn" @click="getSubtim">
          <text>确认</text>
        </view>
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
      QHeight: '',
      isExistEnlist: false,  // 当日是存在选课数据
      currentDay: '', // 当前日期
      isCurrentDay: true, // 是否是今天
      exerciseName: '', // 课程名称
      enlistSchool: [], // 选本次课程的学校信息
      enlistCount: 0, //应到人数
      signCount: 0, // 实到人数
      unsignCount: 0, // 未到人数
      enlistList:[], // 选课的学生列表

      operatorType : 1 , //操作类型 ，1为签到，2 为评优

      checkedIdList: [] , // 选中id列表
      allIdList :[], //所有报名列表ids
      isAllChecked : false, //是否全选

      exerciseId : '', //当前课程ID
      receiveId : '', //当前接待ID

      selectStudents: true,
      goodStudents: true,
      goodStudentCode: false,
      allCode: false,
      courseEnlist: '',
      courStudent: '',
      courseSchool: '',
      courseExercise: '',
      iDs: '',
      goodList: [],
      students: [],
    }
  },
  onLoad(option) {
    let timer = new Date();
    let month = timer.getMonth() + 1;
    let currentDay = timer.getFullYear() + '-' + (month > 9 ? month : '0' + month) + '-' + timer.getDate();
    if (option.dayNum == undefined) {
      this.currentDay = currentDay;
      this.isCurrentDay = true
    } else {
      this.currentDay = option.dayNum;
      if (this.currentDay == currentDay){
        this.isCurrentDay = true
      }else{
        this.isCurrentDay = false;
      }
    }

    // 获取当天的报名数据
    this.getEnlistList();

    uni.getSystemInfo({
      success: (res) => {
        let height = res.windowHeight;
        this.QHeight = (height - 380);
      }
    })

  },
  methods: {
    getEnlistList() {
      let that = this
      this.$request({
        url: 'course/v2/teacher/current/day/enlists',
        data: {
          date: that.currentDay
        },
        header: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-Access-Token": wx.getStorageSync("token")
        },
        method: 'post'
      }).then(res => {
        if (res.data.success) {
          that.enlistList = res.data.result
          that.enlistCount = res.data.result.length;
          if (that.enlistCount == 0){
            this.isExistEnlist = false
          }

          let signCount = 0 ;
          let enlistSchool = []

          let allIdList = []
          res.data.result.forEach(item => {
            if (item.sign_status == 1 || item.sign_status == '1'){
              signCount += 1
            }

            if (enlistSchool.indexOf(item.sname + "\t" + item.grade_value) == -1){
              enlistSchool.push(item.sname + "\t" + item.grade_value)
            }

            allIdList.push(item.id)
            that.exerciseName = item.exercise_name
            that.exerciseId = item.exercise_id
            that.receiveId = item.receive_id
          })
            that.allIdList = allIdList;
          // 报名本次课程的学校列表进行更新
          that.enlistSchool = enlistSchool

          // 应到人数和实到人数更新
          that.signCount = signCount
          that.unsignCount = that.enlistCount - that.signCount

          that.enlistList = res.data.result
        } else {
          that.isExistEnlist = false
        }
      })
    },
    checkStudent(id){
      let index = this.checkedIdList.indexOf(id)
      if ( index  == -1){
        this.checkedIdList.push(id)
      }else{
        this.checkedIdList.splice(index,1)
      }
    },
    getSubtim() {
      if (this.checkedIdList.length == 0){
        uni.showToast({
          title: "请选择学员~！",
          icon: 'none'
        });
        return
      }
      let that = this;
      let apiUrl = ''
      if (that.operatorType == 1) {
        apiUrl = 'course/v2/teacher/enlistSign'
      } else {
        apiUrl = 'course/v2/teacher/enlistExcellent'
      }
      this.$request({
        url: apiUrl,
        data: {
          exerciseId: that.exerciseId,
          ids: that.checkedIdList.toString(),
          receiveId: that.receiveId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-Access-Token": wx.getStorageSync("token")
        },
        method: 'post'
      }).then(res => {
        if (res.data.success) {
          uni.showToast({
            title: res.data.result,
            icon: 'none'
          })
          this.getEnlistList();
          this.checkedIdList = []

        }
      }).catch(err => {
      })
    },
    // getItemSelect(prop) {
    //   let goodlist = this.goodList;
    //   let stus = this.students;
    //   // if (goodlist.length > 3 && !stus[prop].isExistEnlist && !this.goodStudents) {
    //   // 	uni.showToast({
    //   // 		title: '优秀学员仅能选择4名学生',
    //   // 		icon: 'none'
    //   // 	})
    //   // 	return;
    //   // }
    //   stus[prop].isExistEnlist = !stus[prop].isExistEnlist;
    //   let items = stus[prop];
    //   if (items.isExistEnlist) {
    //     goodlist.push(items.id)
    //   } else {
    //     goodlist.splice(goodlist.findIndex(item => item === items.id), 1)
    //   }
    //   this.goodList = goodlist
    // },
    // 修改操作类型
    changeOperatorType(operatorType) {
      this.operatorType = operatorType
      this.checkedIdList = []
      // this.selectStudents = !this.selectStudents
    },
    getAllCode() {
      if (this.checkedIdList.length != this.enlistCount){
        this.checkedIdList = this.allIdList
      }else{
        this.checkedIdList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  width: 750rpx;
  height: 100vh;
}

.content {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .doudi {
    width: 100%;
    position: relative;

    .doudiBox {
      width: 100%;
      height: 350rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      left: 0;
      top: calc(50% - 100rpx);

      .icon {
        width: 324rpx;
        height: 286rpx;
      }

      text {
        font-size: 28rpx;
        font-family: SourceHanSansCN-Regular;
        line-height: 38rpx;
        color: #BABABA;
        margin-top: -40rpx;
      }
    }
  }

  .classDay {
    width: 695rpx;
    min-height: 100rpx;
    margin-top: 30rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
    opacity: 1;
    border-radius: 11rpx;

    .classTop {
      width: 100%;
      height: 300rpx;
      padding: 30rpx;
      box-sizing: border-box;
      // border-bottom: 2rpx solid #EEEEEE;

      .timer {
        font-size: 42rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 56rpx;
        color: #666666;
        opacity: 1;
      }

      .classInfo {
        width: 100%;
        height: 40rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10rpx;

        .icon {
          width: 36rpx;
          height: 22rpx;
        }

        .text {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          margin-left: 20rpx;
          color: #666666;
          opacity: 1;
        }
      }
    }
  }

  .classBottom {
    width: 695rpx;
    height: 153rpx;
    margin-top: 30rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
    opacity: 1;
    border-radius: 11rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .studentItems {
      flex: 1;
      height: 145rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .studentNums {
        font-size: 42rpx;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 54rpx;
        color: #3E8BF3;
        opacity: 1;
      }

      .studentText {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 54rpx;
        color: #999999;
        opacity: 1;
      }
    }
  }

  .studentNav {
    width: 750rpx;
    height: 60rpx;
    margin-top: 20rpx;
    padding: 0 30rpx;
    box-sizing: border-box;

    .topNav {
      width: 100%;
      height: 60rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .studentName {
        width: 139rpx;
        min-height: 35rpx;
        // background-color: #f40;
        font-size: 35rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 56rpx;
        color: #3E8BF3;
        opacity: 1;
      }

      .selected {
        width: 240rpx;
        height: 60rpx;
        margin-top: 10rpx;
        // background-color: #f40;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        font-size: 28rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 60rpx;
        color: #999999;
        opacity: 1;

        .checkbtn {
          transform: scale(0.7)
        }
      }
    }

    .bottomNav {
      width: 100%;
      height: 60rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      text {
        font-size: 28rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 56rpx;
        color: #666666;
        opacity: 1;
        margin-right: 20rpx;
      }
    }
  }

  .studentBox {
    width: 690rpx;
    height: 440rpx;
    padding-top: 10rpx;

    .studentTexts {
      width: 690rpx;
      height: 440rpx;
      padding-top: 10rpx;
      padding: 5rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      .itemsName {
        width: 140rpx;
        height: 139rpx;
        // margin-right: 26rpx;
        margin-bottom: 20rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 7rpx 20rpx rgba(0, 52, 157, 0.1);
        opacity: 1;
        border-radius: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .excegoodStu {
          position: absolute;
          right: 5rpx;
          top: 5rpx;
          width: 25rpx;
          height: 32rpx;

          .goodImgs {
            width: 25rpx;
            height: 32rpx;
          }

          // background-color: #f40;
        }

        .checkeds {
          position: absolute;
          right: 30rpx;
          top: 0rpx;
          width: 21rpx;
          height: 21rpx;

          .myCheckBox {
            transform: scale(0.5)
          }
        }

        text {
          font-size: 32rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 56rpx;
          color: #333333;
          opacity: 1;
        }
      }

      .placeholder {
        width: 30%;
        height: 0rpx;
      }

    }

  }

  .studentFooter {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 150rpx;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;

    .footerLeft {
      flex: 1;
      height: 150rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 60rpx;

      .transleft {
        transform: scale(0.8);
      }

      text {
        font-size: 35rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 69rpx;
        color: #666666;
        opacity: 1;
      }
    }

    .footerRight {
      flex: 1;
      height: 150rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 60rpx;

      .Btn {
        width: 197rpx;
        height: 63rpx;
        background: #3E8BF3;
        opacity: 1;
        border-radius: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          font-size: 35rpx;
          font-family: Source Han Sans SC;
          font-weight: 400;
          line-height: 63rpx;
          color: #FFFFFF;
          opacity: 1;
        }
      }
    }
  }

}
</style>
