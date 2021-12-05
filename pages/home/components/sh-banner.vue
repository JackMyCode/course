<template>
	<!-- 轮播 -->
	<view class="banner-swiper-box mb10" v-if="detail.list">
		<canvas canvas-id="colorThief" class="hide-canvas"></canvas>
		<view class="banner-bg"></view>
		<swiper class="banner-carousel shopro-selector-rect" circular @change="swiperChange" :autoplay="true">
			<swiper-item v-for="(item, index) in detail.list" :key="index" class="carousel-item " @click="jump(item.eventType,item.eventValue)">
				<image class="swiper-image " :src="item.imagesUrl" mode="widthFix" lazy-load></image>
			</swiper-item>
		</swiper>
		<view class="banner-swiper-dots">
			<text :class="swiperCurrent === index ? 'banner-dot-active' : 'banner-dot'" v-for="(dot, index) in detail.list.length" :key="index"></text>
		</view>
	</view>
</template>

<script>
import colorThief from 'miniapp-color-thief';

export default {
	components: {},
	data() {
		return {
			swiperCurrent: 0, //轮播下标
			webviewId: 0
		};
	},
	props: {
		detail: {
			type: Object,
			default: null
		}
	},
	created: function() {
	},
	computed: {},
	methods: {
		swiperChange(e) {
			this.swiperCurrent = e.detail.current;
		},

		// 路由跳转
		jump(type,id) {
			let path = '',parmas = {};
			if (type == 0){
				path = '/pages/public/articleDetails'
				parmas.type = 2
				parmas.id = id

			}else{
				path = '/pages/goods/detail/index';
				parmas.id = id
			}

			this.$Router.push({
				path: path,
				query: parmas
			});
		}
	}
};
</script>

<style lang="scss">
.hide-canvas {
	position: fixed !important;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}

// 轮播
.banner-swiper-box {
	position: relative;
	width: 100%;
	background-color: #f5f5f5;
	padding: 0 0 20rpx;
}
.banner-bg{
	background: linear-gradient(90deg, rgb(124, 144, 255) 0%, rgb(93, 93, 255) 100%);
	width: 100%;
	height: 280rpx;
	position: absolute;
	top: 0;
	left: 0;
}

.banner-carousel {
	width: 690rpx;
	height: 360rpx;
	margin: 0 auto;
	position: relative;
    border-radius: 12rpx;
    overflow: hidden;
	.carousel-item {
		width: 100%;
		height: 100%;
		// padding: 0 28upx;
		overflow: hidden;
	}

	.swiper-image {
		width: 100%;
		height: 100%;
		// border-radius: 10upx;
		// background: #ccc;
	}
}

.banner-swiper-dots {
	display: flex;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 30rpx;
	z-index: 66;

	.banner-dot {
		width: 14rpx;
		height: 14rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.banner-dot-active {
		width: 14rpx;
		height: 14rpx;
		background: #5d5dff;
		border-radius: 50%;
		margin-right: 10rpx;
	}
}
</style>
