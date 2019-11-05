<template>
    <div :class="classObj"
         class="app-wrapper">
        <div v-if="device==='mobile'&&sidebar.opened"
             class="drawer-bg"
             @click="handleClickOutside" />
        <Header class="header-container" />
        <sidebar class="sidebar-container" />
        <div :class="{hasTagsView:needTagsView}"
             class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <navbar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
            <Footer class="footer-container" />
        </div>

    </div>
</template>

<script>
    import { Header, AppMain, Navbar, Sidebar, TagsView, Footer } from './components'
    import ResizeMixin from './mixin/ResizeHandler'
    import { mapState } from 'vuex'

    export default {
        name: 'Layout',
        components: {
            Header,
            AppMain,
            Navbar,
            Sidebar,
            TagsView,
            Footer
        },
        mixins: [ResizeMixin],
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                showSettings: state => state.settings.showSettings,
                needTagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    }

</script>

<style lang="scss"
       scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: calc(100vh - 110px);
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .header-container {
        height: 60px;
        // background: #304156;
        background: #304156;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }

    .footer-container {
        width: 100%;
        bottom: 0px;
        background: #fff;
        z-index: 999;
        border-top: 1px solid #eee;
    }

</style>
