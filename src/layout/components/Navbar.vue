<template>
    <div class="navbar">
        <hamburger id="hamburger-container"
                   :is-active="sidebar.opened"
                   class="hamburger-container"
                   @toggleClick="toggleSideBar" />

        <breadcrumb id="breadcrumb-container"
                    class="breadcrumb-container" />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'device'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                //   await this.$store.dispatch('user/logout')
                //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                this.$router.push('/login')
            }
        }
    }

</script>

<style lang="scss"
       scoped>
    .navbar {
        height: 50px;
        width: 100%;
        overflow: hidden;
        position: fixed;
        top: 60px;
        z-index: 999;

        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }
        }
    }

</style>
