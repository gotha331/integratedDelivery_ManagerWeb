<template>
    <div class='top-header'>
        <div class="top-header-left">
            <img class="top-header-left-logo"
                 src="@/assets/images/logo.png">
            <span class="top-header-left-title">综合配送管理系统</span>
        </div>
        <div class="top-header-right">
            <div class="top-header-right-menu">
                <el-dropdown @command="handleCommand"
                             trigger="click">
                    <span class="el-dropdown-link">
                        <img src="@/assets/images/avatar.jpg"
                             class="user-avatar">
                        你好，{{ userName }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="myinfo">我的资料</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TopHeader',
        components: {

        },
        props: {

        },
        data() {
            return {
                userName: 'admin'
            };
        },
        created() {

        },
        mounted() {

        },
        methods: {
            // 用户下拉菜单触发事件
            handleCommand(command) {

                switch (command) {

                    case 'changepwd':
                        this.$message('修改密码');
                        break;

                    case 'myinfo':
                        this.$message('我的资料');
                        break;

                    case 'logout':
                        this.$router.push('/login');
                        break;

                    default:
                        break;
                }
            }
        }
    }

</script>

<style lang="scss">
    .top-header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-left {
            float: left;
            display: flex;
            align-items: center;

            &-logo {
                width: 40px;
                height: 40px;
                margin: 0 20px;
            }

            &-title {
                font-size: 24px;
                font-weight: 700;
                color: #BFCBD9;
            }
        }

        &-right {
            float: right;
            margin-right: 20px;
            color: #BFCBD9;

            &-menu {
                .el-dropdown-link {

                    display: flex;
                    align-items: center;

                    .user-avatar {
                        width: 30px;
                        height: 30px;
                        border-radius: 30%;
                        margin-right: 10px;
                    }

                    cursor: pointer;
                    color: #BFCBD9;
                }

                .el-icon-arrow-down {
                    font-size: 12px;
                }
            }
        }
    }

</style>
