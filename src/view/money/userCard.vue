<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name:'' }" >财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">用户账单</el-breadcrumb-item>
        </el-breadcrumb>
        <header>
            <el-select v-model="selectInput" placeholder="请选择" size="mini" style="width:100px;" clearable>
                <el-option label="用户名" value="0"></el-option>
                <el-option label="手机号" value="1"></el-option>
                <el-option label="微博号" value="2"></el-option>
                <el-option label="微信号" value="3"></el-option>
            </el-select>
            <el-input size="mini" class="searchInput" placeholder="请输入搜索信息" v-model="search.username" clearable></el-input>
            <el-button type="primary" size="mini" plain @click="showList()">查询</el-button>
            <div class="door">
                <p>当前提现手续费： <span>{{ lowMoney.pushMoney }}</span> %</p>
                <p>当前提现门槛： <span>{{ lowMoney.minimumWithdrawalAmount }}</span> ≤金币</p>
            </div>
        </header>
        <section>
            <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading">
                <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
                <el-table-column prop="userSex" label="性别" align="center">
                    <template slot-scope="props">
                        {{ props.row.userSex == 0 ? '女' : props.row.userSex == 1 ? '男' : ''  }}
                    </template>
                </el-table-column>
                <el-table-column label="级别" align="center">
                    <template slot-scope="props">
                        {{ props.row.role==0?'大V':props.row.role==1?'新秀':'' }}
                    </template>
                </el-table-column>
                <el-table-column label="封禁状态" align="center">
                    <template slot-scope="props">
                        {{ props.row.currentState == 0 ? '未封禁' :props.row.currentState == 1 ? '已封禁' : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="是否实名" align="center">
                    <template slot-scope="props">
                        {{ props.row.authentication == 0 ? '未认证' : props.row.authentication == 1 ? '已认证' : props.row.authentication == 2 ? '认证中' : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="解锁时间" align="center">
                    <template slot-scope="props">
                        {{ props.row.unlockTime==''?'-':new Date(props.row.unlockTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="剩余解锁天数" align="center">
                    <template slot-scope="props">
                        {{ props.row.currentState == 1 ? props.row.unlockDay + '天' : '-' }}
                    </template>
                </el-table-column>
                <el-table-column label="被封禁次数" align="center">
                    <template slot-scope="props">
                        {{ props.row.numberBanned + '次' }}
                    </template>
                </el-table-column>
                <el-table-column label="用户账户余额" align="center">
                    <template slot-scope="props">
                        {{ props.row.balance + '金币' }}
                    </template>
                </el-table-column>
                <el-table-column prop="wechatName" label="微信名" align="center" v-if="wxShow==true"></el-table-column>
                <el-table-column prop="weiBoName" label="微博名" align="center" v-if="wbshow==true"></el-table-column>

                <el-table-column prop="date" label="查看明细" align="center">
                    <template slot-scope="props">
                        <el-button type="primary" size="mini" @click="dialogVisible=true;getDetails(props.row.userId)">查看明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </section>
        <el-dialog title="账单明细" :visible.sync="dialogVisible" width="55%">
            <main v-if="billData.length !== 0"  v-loading="dialogLoading">
                <div class="billCount">
                    <h4>总计：</h4>
                    <p>实时收入总计: <span>{{ billCount.liveChatCollection }}</span> </p>
                    <p>充值总计: <span>{{ billCount.recharge }}</span> </p>
                    <p>预约收入总计: <span>{{ billCount.bookingChatIncome }}</span> </p>
                    <p>预约聊天总计: <span>{{ billCount.appointmentChat }}</span> </p>
                    <p>购买语音总计: <span>{{ billCount.buyVoice }}</span> </p>
                    <p>实时聊天总计: <span>{{ billCount.liveChat }}</span> </p>
                    <p>商城收入总计: <span>{{ billCount.mallIncome }}</span> </p>
                    <p>提现成功总计: <span>{{ billCount.withdrawalTotal }}</span> </p>
                </div>
                <el-table :data="billData" style="width: 100%;margin-top:15px;" border size="mini">
                    <el-table-column prop="createTime" label="日期" align="center"></el-table-column>
                    <el-table-column prop="liveChatCollection" label="实时收入/金币" align="center"></el-table-column>
                    <el-table-column prop="bookingChatIncome" label="预约收入/金币" align="center"></el-table-column>
                    <el-table-column prop="appointmentChat" label="预约聊天/金币" align="center"></el-table-column>
                    <el-table-column prop="buyVoice" label="购买语音/金币" align="center"></el-table-column>
                    <el-table-column prop="liveChat" label="实时聊天/金币" align="center"></el-table-column>
                    <el-table-column prop="mallIncome" label="商城收入/金币" align="center"></el-table-column>
                    <el-table-column prop="recharge" label="充值/元" align="center"></el-table-column>
                    <el-table-column prop="withdrawalTotal" label="提现成功/元" align="center"></el-table-column>
                </el-table>
                <div class="block" style="margin-top: 15px">
                    <el-pagination layout="total,prev, pager, next" :page-size="size1" background :page-count="count1" :total="total1" @current-change="handleCurrentChange1"></el-pagination>
                </div>
            </main>
            <div class="noneBill" v-else v-loading="dialogLoading">
                <h4>该用户暂无生成账单</h4>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "userCard",
        data(){
            return{
                dialogVisible:false,
                loading:false,
                dialogLoading:false,
                wxShow:false,
                wbshow:false,
                selectInput:'',     //搜索下拉框
                search:{    //搜索项
                    username:'',
                    phone:'',
                    weibo:'',
                    wx:'',
                    idCard:'',
                },
                tableData:[],    //用户列表
                billData:[],     //账单明细
                caozuo:'0',      //操作
                page:1,     //分页当前页
                total:null,     //总数
                size:null,      //个数
                count:null,
                page1:1,     //弹窗分页当前页
                total1:null,     //弹窗总数
                size1:null,      //弹窗每页个数
                count1:null,
                lowMoney:{},      //当前手续费和最低提现
                billCount:{}     //总计
            }
        },
        created(){

            if(this.$route.params.name){
                this.search.username = this.$route.params.name
            }
            this.showList();

        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.showList();
            },
            showList(){
                const page = this.page;
                this.loading = true;

                this.$api.money.user_bill_list(data=>{
                    this.loading = false;
                    if(this.selectInput==3){
                        this.wxShow = true;
                    }else if(this.selectInput==2){
                        this.wbshow = true;
                    }else{
                        this.wxShow = false;
                        this.wbshow = false;
                    }
                    this.tableData = data.result;
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page,
                    type:this.selectInput==''?null:parseInt(this.selectInput),
                    name:this.search.username==''?null:this.search.username

                })
                // 当前手续费和最低提现
                this.$api.money.low_money(data=>{
                    this.lowMoney = data
                })
            },
            handleCurrentChange1(val){
                this.page1 = val;
                this.getDetails(this.userId)
            },
            getDetails(userId){
                this.userId = userId
                const page = this.page1
                this.dialogLoading = true
                this.$api.money.user_bill_details(data=>{
                     this.dialogLoading = false;
                    this.billData = data.result;
                    this.billCount = data.billCount;
                    this.total1 = data.pageInfo.total;
                    this.size1 = data.pageInfo.pageSize;
                    this.count1 = data.pageInfo.pages;
                },{
                    pageNum:page,
                    userId:parseInt(userId)
                })
            }
        }
    }
</script>

<style scoped lang="less">
header{
    overflow: hidden;
    margin-top: 15px;
    .searchInput{
        width: 180px;
        margin-right: 12px;
    }
    .door{
        // height: 40px;
        float: right;
        p{
            margin-bottom: 0;
            font-size: 16px;
            span{
                color: red;
            }
        }
    }

}
main{
    h3{
        text-align: center;
    }
}
.billCount{
    p{
        width: 25%;
        float: left;
        span{
            color: #409EFF;
            font-size: 16px;
            font-weight: bold;
            padding-left: 15px;
        }
    }
}
.noneBill{
    height: 100px;
    h4{
        text-align: center;
        line-height: 100px;
        color: red
    }
}
</style>
