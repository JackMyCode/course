export const shareMixins = {
    data () {
        return {
            shareData: {
                title: '',
                path: '',
                imageUrl: '',
                content: '',
                desc: ''
            }
        }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage () {
        return {
            title: this.shareData.title,
            path: this.shareData.path,
            imageUrl: this.shareData.imageUrl,
            content: this.shareData.content,
            desc: this.shareData.desc,
            success: res => {
            }
        }
    },
    //#endif

    onLoad(option) {
    }
}