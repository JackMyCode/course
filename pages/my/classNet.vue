<template>
  <view class="boxid">
    <view class="tab-active">
      <view class="tab-content" v-for="(item,index) in orderState" @click="selectTab(item.id)" :class="orderType == item.id ?'active-box':''"
            :key="index">
        {{item.title}}
      </view>
    </view>

    <view class="itemsBoxs " v-if="dataObject.length > 0">
      <view class="itemsnav " v-for="(item, index) in dataObject" :key="item.id" @tap.stop="goClassDetail(item.exercise_id,item.receive_id,index)">
        <view class="cover" v-if="item.isEdit == 1"></view>
        <view class="itemStudents">
          <text>学生：</text>
          <text v-if="item.student_name == null || item.student_name == ''"></text>
          <text style="color: #FF9853;" v-else>{{item.student_name}}</text>
        </view>
        <view class="classInfoBox">
          <view class="infoLeft">
            <image v-if="item.eimg == null" src="/static/images/home/noimgs.png" mode="aspectFill" class="classImgs"></image>
            <image v-esle :src="item.eimg" mode="aspectFill" class="classImgs"></image>
          </view>
          <view class="inforight">
            <view class="itemstitle">
              <text class="className">
                {{item.exercise_name}}
              </text>
              <view class="sign" @tap.stop="btnClear(item)">
                <image v-if="item.sign_status == 1 && item.excellent_status == 1 " src="/static/images/my/good.png" mode="aspectFit"
                       class="signGoods"></image>
              </view>
            </view>
            <view class="itemstime">
              <image src="/static/images/my/enlist.png" mode="aspectFit" class="timeImgs"></image>
              <text>{{item.enlist_count}} / {{item.enlist_total}}</text>
            </view>
            <view class="itemstime">
              <image src="/static/images/my/notice.png" mode="aspectFit" class="timeImgs"></image>
              <text style="margin-left: 15rpx;" v-if="item.rdate == null || item.rdate == ''">报名时间</text>
              <text v-else>{{item.rdate}}</text>
            </view>

            <view class="itemsmap">
              <view class="itemsmap_left">
                <image src="/static/images/my/mapicon.png" mode="aspectFit" class="timeImgs"></image>
                <text style="margin-left: 15rpx;" v-if="item.address == null || item.address == ''"></text>
                <text v-else>{{item.address}}</text>
              </view>
              <view class="itemsmap_right"  @tap.stop="checkedBtn(item)"  v-if="item.edit_id == null && item.sign_status == 0">
                <text>修改报名</text>
              </view>
              <view class="itemsmap_evluat" v-if="item.edit_id != null && item.sign_status == 0">
                <text>报名已更改</text>
              </view>
              <!-- 		<view class="itemsmap_right" @tap.stop="checkedBtn(item)" v-if="item.sign_status == 0 && item.excellent_status == 0">
                    <text>修改报名</text>
                  </view> -->
              <view class="itemsmap_right" @tap.stop="goEvaluation(item)" v-if="item.sign_status == 1 && item.comment_status == 0">
                <text>去评价</text>
              </view>
              <!-- <view class="itemsmap_right" @tap.stop="goEvaluation(item)">
                  <text>去评价</text>
                </view> -->
              <view class="itemsmap_evluat" v-if="item.comment_status == 1">
                <text>已评价</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="popcover" v-if="code">
      <r-canvas ref="rCanvas"></r-canvas>
      <view class="imgsBox">
        <button size="mini" @click="closeGood">关闭</button>
        <button size="mini" @click="saveGood" disable="isSaveGood">保存</button>
      </view>
    </view>

    <view class="popcover" v-if="typeCode">
      <view class="mycontent1">
        <view class="notice">
          <image src="/static/images/my/notics.png" mode="aspectFit" class="icon"></image>
        </view>
        <view class="textcent">
          <!--					<text>报名截止前一个小时不允许修改报名</text>-->
          <text>修改报名在报名过程中只允许使用一次</text>
          <text>报名仅允许修改一次，请确认是否修改？</text>
        </view>
        <view class="btnBox">
          <view class="btnName" @click="checkedBtn">
            <text>关闭</text>
          </view>
          <view class="btnName" @click="getClassName" style="background-color: #3E8BF3;">
            <text>修改报名</text>
          </view>
        </view>
      </view>
    </view>
    <doudi v-if="dataObject.length == 0" :url="url"></doudi>

  </view>
</template>

<script>
import navBar from '../../components/nav-bar.vue';
import customHeader from '@/components/custom-header/custom-header.vue';
import doudi from '@/components/doudi.vue';
import util from '@/utils/util.js';
import rCanvas from "@/components/r-canvas/r-canvas.vue"
export default {
  components: {
    navBar,
    customHeader,
    doudi,
    rCanvas
  },
  data() {
    return {
      title: '课程状态',
      orderType: 1,
      url: '/static/images/doudi/doudi_1.png',
      code: false,
      typeCode: false,
      goodItem: '',
      isSaveGood: false , // 是否可以保存优秀学员奖状
      orderState: [{
        id: 1,
        title: '已报名',
        type: 'nosend'
      },
        {
          id: 2,
          title: '已结束',
          type: 'nocomment'
        },

      ],
      items: [],
      dataObject: [],
      result : ''//奖状的base64
    }
  },
  onShow() {
    this.getMyList();
  },
  methods: {
    getClassName(item) {
      uni.reLaunch({
        url: '/pages/home/selectContent'
      })
    },
    btnClear(items) {
      this.goodItem = items;
      this.code = !this.code
      uni.showLoading({
        title: '生成奖状中',
        mask: true
      })

      this.$nextTick(async () => {
        let that = this
        await this.$refs.rCanvas.init({
          canvas_id: 'rCanvas',
          background_color: '#fff',
          canvas_width: 375,
          canvas_height: 280,
          scale: 1
        }).catch(err => {
          this.error(err)
        })

        await this.$refs.rCanvas.drawImage({
          url: '/static/images/my/good_background.jpg',
          x: 0,
          y: 0,
          w: 375,
          h: 280,
          border_radius: 4
        }).catch(err => {
          this.error(err)
        })

        await this.$refs.rCanvas.drawText({
          text:  this.goodItem.student_name + ' 同学：',
          x: 45,
          y: 100,
          font_size: 14,
          text_align: 'left',
          font_weight: 'bold',
          font_color: 'rgba(88,88,88,0.9)'
        }).catch(err => {
          this.error(err)
        })
        let startX = 40;
        await this.$refs.rCanvas.drawText({
          text: '    在',
          x: 40,
          y: 130,
          max_width: 40,
          font_size: 14,
          text_align: 'left',
          font_color: 'rgba(88,88,88,0.9)'
        }).catch(err => {
          this.error(err)
        })

        let signalSize = 16

        let exercise_name = "“"+ this.goodItem.exercise_name +"”"
        let exerciseStartX =startX + 10 +  (exercise_name.length + 1) * Math.ceil(signalSize / 2)
        await this.$refs.rCanvas.drawText({
          text: exercise_name,
          x: exerciseStartX,
          y: 130,
          // max_width: 130,
          font_size: 14,
          text_align: 'center',
          font_weight: 'bold',
          font_color: 'rgba(88,88,88,0.9)'
        }).catch(err => {
          this.error(err)
        })

        let textStart = startX + (exercise_name.length + 1) * signalSize

        let text2 = '课程中，表现突出，成绩优异。'
        if (330 - textStart < 155) {
          let text2_1 = text2.substring(0,Math.ceil( (330 - textStart) / signalSize))
          let text2_2 =  text2.substring(Math.ceil( (330 - textStart) / signalSize),text2.length)
          await this.$refs.rCanvas.drawText({
            text: text2_1,
            x: textStart,
            y: 130,
            // max_width: 210,
            font_size: 14,
            text_align: 'left',
            font_color: 'rgba(88,88,88,0.9)'
          }).catch(err => {
            this.error(err)
          })
          await this.$refs.rCanvas.drawText({
            text: text2_2,
            x: 45,
            y: 160,
            // max_width: 210,
            font_size: 14,
            text_align: 'left',
            font_color: 'rgba(88,88,88,0.9)'
          }).catch(err => {
            this.error(err)
          })

          await this.$refs.rCanvas.drawText({
            text: '特发此奖 以此鼓励',
            x: 45,
            y: 190,
            max_width: 225,
            font_size: 14,
            text_align: 'left',
            font_color: 'rgba(88,88,88,0.9)'
          }).catch(err => {
            this.error(err)
          })

        }else{
          startX += (exercise_name.length + 1) * 10
          await this.$refs.rCanvas.drawText({
            text: text2,
            x: 155,
            y: 130,
            max_width: 210,
            font_size: 14,
            text_align: 'left',
            font_color: 'rgba(88,88,88,0.9)'
          }).catch(err => {
            this.error(err)
          })
          await this.$refs.rCanvas.drawText({
            text: '特发此奖 以此鼓励',
            x: 45,
            y: 160,
            max_width: 225,
            font_size: 14,
            text_align: 'left',
            font_color: 'rgba(88,88,88,0.9)'
          }).catch(err => {
            this.error(err)
          })
        }



        await this.$refs.rCanvas.drawText({
          text: '庐阳区青少年校外活动中心',
          x: 345,
          y: 200,
          font_size: 12,
          max_width: 300,
          text_align: 'right',
          font_color: 'rgba(88,88,88,0.9)'
        }).catch(err => {
          this.error(err)
        })
        await this.$refs.rCanvas.drawText({
          text: this.goodItem.rdate.substr(0,10),
          x: 345,
          y: 225,
          font_size: 12,
          max_width: 300,
          text_align: 'right',
          font_color: 'rgba(88,88,88,0.9)'
        }).catch(err => {
          this.error(err)
        })

        await this.$refs.rCanvas.drawImage({
          url: '/static/images/mark.png',
          x: 225,
          y: 165,
          w: 100,
          h: 100,
          border_radius: 4
        }).catch(err => {
          this.error(err)
        })

        // 生成海报
        await this.$refs.rCanvas.draw((result) => {
          uni.hideLoading()
          this.isSaveGood = true
          this.result = result
        }).catch(err => {
          this.error(err)
        })
      })
    },
    checkedBtn(item) {
      let that = this;
      uni.removeStorageSync('modifyClass');
      this.$request({
        url: 'course/v2/enlist/exercise/isUpdateEnlistTime',
        data: {},
        method: 'get'
      }).then(res => {
        if (res.data.success) {
          let result = {
            exerciseId: item.id,
            studentId: item.student_id
          }
          uni.setStorage({
            key: 'modifyClass',
            data: result,
            success: function() {
              that.typeCode = !that.typeCode
            }
          });
        }
      }).catch(err => {
      })

    },
    selectTab(prop) {
      this.dataObject = [];
      this.orderType = prop;
      this.getMyList();
    },
    goClassDetail(classid, ids, index) {
      // if (this.orderType == 2) {
      //   return
      // }
      uni.navigateTo({
        url: '/pages/home/selectClassDetail?clssid=' + classid + '&ids=' + ids + '&start=' + this.dataObject[index].enlist_count +
            '&end=' +
            this.dataObject[index].enlist_total + '&isClass=' + '1002'
      })
    },
    getNavt(prop) {
      uni.navigateTo({
        url: './calssList?id=' + prop
      })
    },
    getBaoming() {
      this.code = !this.code
    },

    // 获取 课程列表
    getMyList() {
      let that = this;
      this.$request({
        url: 'course/v2/users/exercise_student/queryByStatus',
        data: {
          status: that.orderType
        },
        method: 'get'
      }).then(res => {

        if (res.data.success && res.data.result.length > 0) {
          let datalist = res.data.result;
          for (let item of datalist) {
            let nowTimer = util.split_time(item.rdate, '1001');
            item.rdate = nowTimer[0] + '年' + nowTimer[1] + '月' + nowTimer[2] + '日'
          }
          that.dataObject = datalist;

        }
      }).catch(err => {
      })
    },
    // 获取 课程列表
    getClassList() {
      let that = this;
      this.$request({
        url: 'course/v2/users/exercise_student/queryByStatus',
        data: {
          status: that.orderType
        },
        method: 'get'
      }).then(res => {

        if (res.data.success && res.data.result.length > 0) {
          let datalist = res.data.result;
          for (let item of datalist) {
            let nowTimer = util.split_time(item.rdate, '1001');
            item.rdate = nowTimer[1] + '月' + nowTimer[2] + '日'
          }
          that.dataObject = datalist;

        }
      }).catch(err => {
      })
    },
    // 保存奖状
    saveGood(){
      // this.$refs.rCanvas.draw((result) => {
        // 保存图片
        this.$refs.rCanvas.saveImage(this.result.tempFilePath).catch(
            err => {
              this.error(err)
            })
      // }).catch(err => {
      //   this.error(err)
      // })
    },
    // 关闭奖状
    closeGood(){
      this.code = !this.code
      this.isSaveGood = false
    },
    goEvaluation(item) {
      uni.navigateTo({
        url: './evluationPage?evlationId=' + item.id + '&type=02' + '&name=' + item.exercise_name +'&img='+item.eimg
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  width: 100%;
  height: 100vh;
}

.boxid {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .tab-active {
    display: flex;
    color: #666666;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    height: 90rpx;
    font-size: 36rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    margin-top: 30rpx;
    margin-bottom: 30rpx;

    .tab-content {
      width: 20%;
      height: 80rpx;
      text-align: center;
      line-height: 80rpx;
      padding: 0 10rpx;
      box-sizing: border-box;

      image {
        width: 30rpx;
        height: 28rpx;
        vertical-align: middle;
        margin-left: 6rpx;
      }
    }
  }

  .active-box {
    width: 80%;
    height: 80rpx;
    color: #3E8BF3;
    border-bottom: 2px solid #3E8BF3;
  }

  .itemsBoxs {
    width: 720rpx;
    min-height: 240rpx;

    .itemsnav {
      width: 720rpx;
      min-height: 240rpx;
      margin-bottom: 30rpx;
      background: #FFFFFF;
      box-shadow: 0px 7rpx 21rpx rgba(0, 52, 157, 0.1);
      opacity: 1;
      border-radius: 11rpx;
      padding-bottom: 20rpx;
      box-sizing: border-box;
      position: relative;

      .itemStudents {
        width: 100%;
        height: 70rpx;
        padding: 0rpx 20rpx;
        box-sizing: border-box;

        text {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 75rpx;
          color: #333333;
          opacity: 1;
        }
      }

      .classInfoBox {
        width: 100%;
        min-height: 190rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .infoLeft {
          width: 254rpx;
          height: 140rpx;

          .classImgs {
            width: 254rpx;
            height: 140rpx;
            margin-left: 4rpx;
          }
        }

        .inforight {
          width: 463rpx;
          min-height: 190rpx;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;

          .itemstitle {
            width: 100%;
            height: 60rpx;
            margin-top: 10rpx;
            padding-left: 20rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .sign {
              flex: 1;
              height: 60rpx;
              position: relative;

              .signGoods {
                width: 60rpx;
                height: 75rpx;
                position: absolute;
                bottom: 8rpx;
              }
            }

            .className {
              flex: 5;
              height: 50rpx;
              font-size: 36rpx;
              font-family: Source Han Sans CN;
              font-weight: 400;
              line-height: 49rpx;
              color: #333333;
              opacity: 1;
            }
          }

          .itemstime {
            width: 100%;
            height: 25rpx;
            margin-top: 8rpx;
            padding: 0rpx 20rpx;
            box-sizing: border-box;

            .timeImgs {
              width: 25rpx;
              height: 25rpx;
              // background-color: #f40;
              margin-right: 10rpx;
            }

            text {
              width: 250rpx;
              height: 25rpx;
              font-size: 25rpx;
              font-family: SourceHanSansCN-Normal;
              line-height: 25rpx;
              color: #999999;
              opacity: 1;
            }
          }

          .itemsmap {
            width: 100%;
            min-height: 50rpx;
            margin-top: 12rpx;
            padding-left: 20rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .itemsmap_left {
              width: 280rpx;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              padding-top: 15rpx;
              box-sizing: border-box;

              .timeImgs {
                width: 25rpx;
                height: 25rpx;
                // background: #5D5DFF;
                opacity: 1;
              }

              text {
                width: 250rpx;
                min-height: 24rpx;
                margin-left: 10rpx;
                font-size: 25rpx;
                font-family: SourceHanSansCN-Regular;
                line-height: 26rpx;
                color: #7D7D7D;
              }
            }

            .itemsmap_evluat {
              width: 165rpx;
              height: 63rpx;
              opacity: 1;
              border-radius: 30rpx;
              display: flex;
              justify-content: center;
              align-items: center;

              text {
                font-size: 28rpx;
                font-family: SourceHanSansCN-Normal;
                line-height: 49rpx;
                color: #328DEB;
                opacity: 1;
              }
            }

            .itemsmap_right {
              width: 165rpx;
              height: 63rpx;
              background: #3E8BF3;
              opacity: 1;
              border-radius: 30rpx;
              display: flex;
              justify-content: center;
              align-items: center;

              text {

                font-size: 28rpx;
                font-family: SourceHanSansCN-Normal;
                line-height: 49rpx;
                color: #FFFFFF;
                opacity: 1;
              }
            }
          }
        }

      }


    }
  }

  .popcover {
    width: 750rpx;
    height: 100vh;
    background-color: rgba(0, 0, 0, .56);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    .mycontent2 {
      width: 495rpx;
      height: 688rpx;
      position: relative;
      border-radius: 8rpx;
      align-items: center;

      .certificate {
        width: 495rpx;
        height: 688rpx;
      }

      .comment {
        width: 495rpx;
        height: 450rpx;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .name {
          width: 100%;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20rpx;

          text {
            font-size: 49rpx;
            font-family: Source Han Sans CN;
            font-weight: 600;
            line-height: 50rpx;
            color: #333333;
            opacity: 1;
          }
        }

        .student {
          width: 100%;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10rpx;

          text {
            font-size: 20rpx;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #333333;
            opacity: 1;
          }
        }

        .teacher {
          width: 308rpx;
          height: 80rpx;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 10rpx;

          text {
            text-indent: 2em;
            font-size: 20rpx;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #333333;
            opacity: 1;
          }
        }

        .signbiao {
          width: 308rpx;
          height: 40rpx;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 10rpx;

          text {
            font-size: 20rpx;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #333333;
            opacity: 1;
            margin-right: 20rpx;
          }
        }

        .schoolname {
          width: 100%;
          height: 40rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 80rpx;

          text {
            font-size: 20rpx;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 28rpx;
            color: #333333;
            opacity: 1;
          }
        }
      }
    }

    .mycontent1 {
      width: 600rpx;
      height: 495rpx;
      background: #FFFFFF;
      opacity: 1;
      border-radius: 10rpx;

      .notice {
        width: 600rpx;
        height: 180rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 80rpx;
          height: 100rpx;
        }
      }

      .textcent {
        width: 500rpx;
        height: 150rpx;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text {
          font-size: 28rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 50rpx;
          color: #333333;
          opacity: 1;
        }
      }

      .btnBox {
        width: 600rpx;
        height: 100rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .btnName {
          width: 197rpx;
          height: 72rpx;
          background: #BEBEBE;
          opacity: 1;
          border-radius: 36rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          text {
            font-size: 35rpx;
            font-family: Source Han Sans SC;
            font-weight: 400;
            line-height: 72rpx;
            color: #FFFFFF;
            opacity: 1;
          }
        }
      }
    }

    .imgsBox {
      width: 100%;
      height: 60rpx;
      margin-top: 30rpx;
      display: flex;
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
      height: 500rpx;
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
        height: 300rpx;
        overflow-y: auto;
        // background-color: #007AFF;
        margin-top: 20rpx;

        // overflow-y: auto;
        .content_size {
          width: 100%;
          height: 80rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20rpx;
          box-sizing: border-box;
          border-bottom: 1rpx solid #eee;
        }
      }

      .my_buttom {
        width: 300rpx;
        height: 60rpx;
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

