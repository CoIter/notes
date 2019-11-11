<template>
    <div id="vcomments"></div>
</template>


<script>

export default {
    mounted() {
        this.renderVline()
    },
    methods: {
        renderVline() {
            if(typeof window !== 'undefined'){
                this.window = window;
                window.AV = require('leancloud-storage');
            }
            const Valine = require('valine');
            new Valine({
                el: '#vcomments' ,
                appId: 'hMBsj94kBWx5eBkmI4H18Rc7-9Nh9j0Va',
                appKey: 'Jxn712YoSvqELH3thEgKkEzY',
                notify:false,
                verify:false,
                avatar:'retro',
                placeholder: '欢迎留言...'
            })
        }
    }
}
</script>
