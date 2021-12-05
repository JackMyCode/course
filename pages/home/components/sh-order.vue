<template>
	<!-- 订单卡片 -->
	<view class="sh-order-box x-f mb10">

		<view class="order-box x-f">
			<view class="order-item y-f" @tap="jump('/pages/order/list', { type: order.id })" v-for="order in detail" :key="order.id">
				<view class="y-f item-box">
					<image class="order-img" :src="order.img" mode="aspectFit" style="height: 60rpx;"></image>
					<text class="item-title">{{ order.title }}</text>
					<view class="cu-tag badge" v-if="orderNum(order.count)">{{ order.count }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			orderNav: []
		};
	},
	props: {
		detail: {
			type: Array,
			default: null
		}
	},
	computed: {

	},
	methods: {
		jump(path, query) {
			this.$Router.push({
				path: path,
				query: query
			});
		},
		orderNum(num){
			let type = true
			if(num == '0'){
				type = false
			}
			return type
		}
	}
};
</script>

<style lang="scss">
// 订单卡片
.sh-order-box {
	height: 150rpx;
	background: #fff;
	.order-box {
		flex: 4;
	}
	.all-order {
		position: relative;
		.cut-off--line {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: (750rpx/5) - 15rpx;
			width: 30rpx;
			height: 136rpx;
		}
	}
	.order-item {
		flex: 1;
		.item-box {
			position: relative;
		}
		.order-img {
			width: 46rpx;
			height: 46rpx;
			// background: #ccc;
		}

		.item-title {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			line-height: 24rpx;
			padding-top: 10rpx;
		}
	}
}
.cu-tag.badge {
	border-radius: 100px;
	position: absolute;
	top: 0px;
	right: 0px;

}
</style>
