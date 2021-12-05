<script>
	export default {
		onLaunch: function() {
			let token = uni.getStorageSync('token')
			if(token){
				uni.switchTab({
					url:'./pages/home/index'
				})
			}
		},
	}
</script>

<style>
	/*每个页面公共css */
	page{
	    background-color: #FFFFFF;
	}
	/* 导航全局样式 */
	.custom-header-top-container{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		width: 100%;
	}
	.custom-header-back-btn{
		height: 44px;
		width: 38px;
		margin: 0;
		padding: 0;
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.custom-header-container{
		z-index: 1;
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 0;
	}
	.custom-header-status-bar{
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 100;
	}
	.custom-header-title{
		height: 44px;
		align-self: flex-start;
		margin-left: 30upx;
		line-height: 44px;
		font-size: 15px;
	}
	
	
	
	.middle {
	  word-break: break-all;
	  width: 100%;
	  justify-content: center;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	.middleView {
	  width: 100%;
	  justify-content: center;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	  border-bottom: 1rpx solid #F1F1F1;
	}
	.middleViewS {
	  width: 100%;
	  justify-content: flex-start;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	
	.middleViewE {
	  width: 100%;
	  justify-content: flex-end;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	
	.middleViewA {
	  width: 100%;
	  align-items: center;
	  justify-content: center;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	
	.middleViewAS {
	  width: 100%;
	  align-items: center;
	  justify-content: flex-start;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	
	.middleViewAE {
	  width: 100%;
	  align-items: center;
	  justify-content: flex-end;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	
	.middleViewB {
	  width: 100%;
	  justify-content: center;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: block;
	}
	
	.middleViewBS {
	  width: 100%;
	  justify-content: flex-start;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: block;
	}
	
	.middleViewBE {
	  width: 100%;
	  justify-content: flex-end;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: block;
	}
	
	.centerView {
	  justify-content: center;
	  display: flex;
	}
	
	.centerWidthView {
	  width: 100%;
	  justify-content: center;
	  display: flex;
	}
	
	.allCenterView {
	  align-items: center;
	  justify-content: center;
	  display: flex;
	}
	
	.allCenterWidthView {
	  width: 100%;
	  align-items: center;
	  justify-content: center;
	  display: flex;
	}
	
	.middleViewC {
	  display: flex;
	  width: 100%;
	  height: 100%;
	  flex-direction: column;
	}
	
	.middleViewNW {
	  justify-content: center;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
	.middleViewNWS {
	  justify-content: flex-start;
	  align-items: flex-start;
	  flex-direction: row;
	  flex-wrap: wrap;
	  display: flex;
	}
</style>
