<template>
	<view class="content">
		<view class="myBox">
			<image src="/static/images/auth/loginbg.png" mode="aspectFit" class="mybg"></image>
		</view>
		<view class="newLogin">
			<view class="newLoginBox">
				<view class="loginText">
					<text>Hello~</text>
					<text style="margin-top: 45rpx;">欢迎来到</text>
					<text>庐阳区青少年校外活动中心</text>
				</view>
				<view class="newloginBtn" v-if="!disChecked" @click="getIsCheck">
					<text>微信快捷登录</text>
				</view>
				<button class="newloginBtn" v-else @click="getUserInfo">
					<text>微信快捷登录</text>
				</button>
				<view class="radio" @click="btnClick">
					<label class="label">
						<radio color="#3E8BF3" :checked="disChecked" class="checke" />
					</label>
					<text>我已阅读</text><text style="color: #3E8BF3;" @click="goPrivacy">《隐私协议》</text><text>和</text><text
						style="color: #3E8BF3;" @click="goUser">《用户协议》</text>
				</view>
			</view>
		</view>
		<view class="popcover" v-if="tipsCode">
			<view class="mycontent1">
				<view class="imgBox">
					<image src="/static/images/auth/aa.png" mode="" class="imgs"></image>
				</view>
				<view class="textcent">
					<text>为给您提供更好的服务</text>
					<text>请授权您的手机号</text>
				</view>
				<view class="btnBox">
					<button class="btnName" open-type="getPhoneNumber" @getphonenumber="getPhoneNumer">
						<text>授权手机号</text>
					</button>
				</view>
			</view>
		</view>

		<view class="popcover" v-if="selectUserTypeTips">
			<view class="mycontent1">
				<view class="imgBox">
					<image src="/static/images/auth/aa.png" mode="" class="imgs"></image>
				</view>
				<view class="btnBox">
					<view class="btnName" @click="selectUserType(2)" style="background-color: #3E8BF3;">
						<text>我是老师</text>
					</view>
				</view>
				<view class="btnBox">
					<view class="btnName" @click="selectUserType(1)" style="background-color: #3E8BF3;">
						<text>我是家长</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  import WXBizDataCrypt  from '@/utils/WXBizDataCrypt.js'
	export default {
		data() {
			return {
			  userid:'',
				type: 0,
				num: 0,
				tipsCode: false, //提示绑定手机号
				disChecked: false,
				phone: '', // 手机号
				codemsg: '', // 验证码
				code: '', // code值
				sessionKey: '', //微信key值，
				selectUserTypeTips: false,
				userinfo: ''
			}
		},
		onLoad() {
			this.getCode();
		},
		methods: {
			// 跳转查看隐私协议
			goPrivacy() {
				uni.navigateTo({
					url: '/pages/my/privacy_agreement'
				})
			},
			// 跳转查看用户协议
			goUser() {
				uni.navigateTo({
					url: '/pages/my/user_agreement'
				})
			},
			// 获取code
			getCode() {
				let that = this;
				uni.login({
					success(res) {
						uni.clearStorage();
						that.code = res.code;
						that.$request({
							url: 'course/v2/users/loginByWeixin',
							data: {
								"code": that.code
							},
							header: {
								"content-type": "application/x-www-form-urlencoded;charset=UTF-8"
							},
							method: 'post'
						}).then(res => {
							if (res.data.success) {
								let result = res.data.result;
								that.userid = result.userInfo.id;
								that.userinfo = result.userInfo;
								that.token = result.token;
                uni.setStorageSync('token', result.token);
								that.sessionKey = result.wxconfig.sessionkey;
							}else{
                uni.showToast({
                  title: "网络波动，请您稍后重试~！",
                  icon: 'none'
                });
              }
						}).catch(err => {
						})
					},
          fail(res){
            uni.showToast({
              title: '微信登录失败，请稍后重试！',
              icon: 'none'
            });
          }

				})
			},
			btnClick() {
				this.disChecked = !this.disChecked;
			},
			getIsCheck() {
				if (!this.disChecked) {
					uni.showToast({
						title: '请先勾选隐私协议',
						icon: 'none'
					});
					return false;
				}
			},
			getUserInfo() {
        let that = this;

        uni.getUserProfile({
          desc: "用于完善会员资料",
          success: (e) => {
            if (e.errMsg == 'getUserProfile:ok') {

              let wxuserinfo = e.userInfo;
              //判定用户信息是否为微信用户，如果用户为微信用户，更新用户信息
              if (that.userinfo.nickname == null ||  that.userinfo.nickname == '' || that.userinfo.nickname == '微信用户'){
                that.userinfo.avatar = wxuserinfo.avatarUrl;
                that.userinfo.nickname = wxuserinfo.nickName;
                that.userinfo.username = wxuserinfo.nickName;

                that.$request({
                  url: '/course/v2/users/edit',
                  data: {
                    "avatar": wxuserinfo.avatarUrl,
                    "id": that.userid,
                    "nickname": wxuserinfo.nickName,
                    "username": wxuserinfo.nickName,
                  },
                  header: {
                    "X-Access-Token": that.token
                  },
                  method: 'put'
                }).then(res => {
                });
              }

              // 判定用户信息是否存在手机号，如果存在手机号，则不进行直接选择家长还是老师，如果不存在则弹出授权手机号
              if(that.userinfo.mobile == null || that.userinfo.mobile == ''){
                that.tipsCode = true;
              }else{
                if (that.userinfo.userType == 2) {
                  that.selectUserTypeTips = true
                } else {
                  this.storageUserinfoAndNavicate();
                }
              }
            }
          }
        })

			},
			getPhoneNumer(e) {
				let that = this;
				that.tipsCode = false;
				let phoneInfo = e.detail;
				if (phoneInfo.errMsg == 'getPhoneNumber:ok') {
          let appid = "wxc05b841a7fbfc0e4" //需替换
          let pc = new WXBizDataCrypt(appid, that.sessionKey);
          let data = pc.decryptData(phoneInfo.encryptedData, phoneInfo.iv);

				  that.userinfo.mobile =data.phoneNumber
          that.$request({
            url: '/course/v2/users/edit',
            data: {
              "mobile": that.userinfo.mobile,
            },
            header: {
              "X-Access-Token": that.token
            },
            method: 'put'
          }).then(res => {

            if (res.data.success) {
              let result = res.data.result;
              if (result.userType == 2) {
                this.selectUserTypeTips = true
              } else {
                this.storageUserinfoAndNavicate();
              }
            }
          })
				}
			},
			wxGetUserInfo(e) {
				if (!this.disChecked) {
					uni.showToast({
						title: '请先勾选隐私协议',
						icon: 'none'
					});
					return false;
				}
			},
			selectUserType(userType) {
				uni.setStorageSync('userType', userType);
				this.storageUserinfoAndNavicate();
			},
			storageUserinfoAndNavicate() {
				uni.setStorage({
					key: 'userInfo',
					data: this.userinfo,
					success: function() {
						uni.switchTab({
							url: '/pages/my/index'
						});
					}
				});
			},
			// 获取验证码
			getMsg() {
				let that = this;
				that.$request({
					url: '/course/user/sms',
					data: {
						"mobile": that.phone,
						"smsmode": that.type
					},
					method: 'post'
				}).then(res => {
					if (res.data.success) {
						that.getTimer();
					}
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}).catch(err => {
					uni.showToast('服务器出小差啦，请稍后重试~');
					// reject();
				})
			},
			//  登录按钮
			getHome(prop, infoavater, infoname) {
				let that = this;
				if (that.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}
				if (that.codemsg == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}
				if (prop == 0) {
					that.$request({
						url: '/course/user/login',
						data: {
							"mobile": that.phone,
							"captcha": that.codemsg
						},
						method: 'post'
					}).then(res => {
						if (res.data.success && res.data.result != null) {
							let datainfo = res.data.result.userInfo;
							if (datainfo.avatar == 'null') {
								datainfo.avatar = infoavater;
							}
							let userObj = {
								nickname: datainfo.nickname,
								mobile: datainfo.mobile,
								avatar: datainfo.avatar
							}
							uni.setStorageSync('token', res.data.result.token);
							uni.setStorageSync('userInfo', userObj);
							uni.switchTab({
								url: '../home/index'
							})
						}
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}).catch(err => {
					})
				} else {
					that.$request({
						url: '/course/user/sign',
						data: {
							"mobile": that.phone,
							"captcha": that.codemsg
						},
						method: 'post'
					}).then(res => {
						if (res.data.success) {
							let datainfo = res.data.result.userInfo;
							if (datainfo.avatar == null) {
								datainfo.avatar = infoavater;
							}
							let userObj = {
								nickname: infoname,
								mobile: datainfo.mobile,
								avatar: datainfo.avatar
							}
							uni.setStorageSync('token', res.data.result.token);
							uni.setStorageSync('userInfo', userObj);
							uni.navigateTo({
								url: './register'
							})
						}
					}).catch(err => {
						uni.showToast('服务器出小差啦，请稍后重试~');
					})
				}
			},
			getTimer() {
				let that = this;
				if (that.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}
				let count = 60;
				that.code = false;
				that.num = count
				let timer = setInterval(res => {
					count--;
					that.num = count;
					if (count == 0) {
						clearInterval(timer);
						that.code = true;
					}
				}, 1000)
			}
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
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.newLogin {
			width: 100%;
			height: 100vh;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;

			.loginText {
				width: 750rpx;
				min-height: 160rpx;
				// background-color: #f40;
				margin-top: 200rpx;
				padding-left: 55rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;

				text {
					font-size: 45rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					line-height: 69rpx;
					color: #3E8BF3;
					opacity: 1;
				}
			}

			.newloginBtn {
				width: 500rpx;
				height: 77rpx;
				margin: 0 auto;
				margin-top: 135rpx;
				background: #3E8BF3;
				box-shadow: 0px 6rpx 12rpx rgba(53, 77, 233, 0.12);
				border-radius: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					font-size: 42rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					line-height: 69rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}

			.radio {
				width: 100%;
				height: 80rpx;
				margin-top: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.label {
					width: 26rpx;
					height: 26rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 15rpx;

					.checke {
						transform: scale(0.7);
					}
				}

				text {
					font-size: 26rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					line-height: 26rpx;
					color: #666666;
					opacity: 1;
				}
			}
		}

		.myBox {
			width: 100%;
			height: 578rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.mybg {
				width: 100%;
				height: 578rpx;
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

			.mycontent1 {
				width: 600rpx;
				min-height: 400rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.imgBox {
					width: 100%;
					height: 65rpx;
					margin-top: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.imgs {
						width: 254rpx;
						height: 55rpx;
					}
				}

				.textcent {
					width: 500rpx;
					min-height: 160rpx;
					margin: 0 auto;
					padding-top: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					text {
						font-size: 32rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 63rpx;
						color: #242021;
						opacity: 1;
					}
				}

				.btnBox {
					width: 600rpx;
					height: 90rpx;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.btnName {
						width: 240rpx;
						height: 72rpx;
						background: #3E8BF3;
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

				.imgs {
					width: 60rpx;
					height: 60rpx;
					display: block;
					margin: 0 auto;
					border-radius: 50%;
				}
			}
		}
	}
</style>
