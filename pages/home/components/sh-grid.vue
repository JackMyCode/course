<template>
	<view class="sh-grid-box mb10" >
		<view class="tool-item y-f" v-for="(menu, index) in detail.list" :key="index" @tap="jump(menu.path,{})">
			<image class="tool-img" :src="menu.image" mode="aspectFill"></image>
			<text class="item-title">{{ menu.name }}</text>
		</view>
	<!-- 	<view class="tool-item y-f" @tap="jump('/pages/user/writeOff',{})" v-if="type==3">
			<image class="tool-img" src="@/static/imgs/writeoff.png" mode="aspectFill"></image>
			<text class="item-title">核销</text>
		</view> -->
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			// routerTo: this.$tools.routerTo,
		};
	},
	computed: {},
	props: {
		detail: {
			type: Object,
			default: null
		},
		type:{
			type: String,
			default: ''
		},
	},
	create(){

	},
	methods: {
		jump(data,query) {
			if (data=='1'){
				uni.clearStorage();
				this.$api.msg('退出成功');

			}else {
				this.$Router.push({
					path: data,
					query: query
				});
			}

		},

	}
};
</script>

<style lang="scss">
// 宫格
.shareBtn{
	width: (690rpx/4);
	height: 144rpx;
	position: absolute;
	opacity: 0;
}
.sh-grid-box {
	background: #fff;
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 40rpx;

	.tool-item {
		width: (690rpx/4);
		padding-top: 40rpx;

		.tool-img {
			width: 60rpx;
			height: 60rpx;
			// background: #ccc;
		}

		.item-title {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			line-height: 24rpx;
			padding-top: 20rpx;
		}
	}
}
</style>
