<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ name:'' }" >财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">财务账单</el-breadcrumb-item>
        </el-breadcrumb>
        <header>
            <!-- <el-date-picker v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="date_time" size="mini"></el-date-picker> -->
            <div class="door">
                <p>当前提现手续费： <span>{{ lowMoney.pushMoney }}</span> %</p>
                <p>当前提现门槛： <span>{{ lowMoney.minimumWithdrawalAmount }}</span> ≤金币</p>
            </div>
            <div style="margin-bottom:15px;float:left">
                <el-date-picker v-model="startDate" size="mini" type="date"  value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
                <el-date-picker v-model="endDate" size="mini" type="date"  value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
                <el-button size="mini" type="primary" @click="changeDate">查询</el-button>
                <el-button size="mini" type="primary" @click="print">打印</el-button>
            </div>
        </header>
        <section>

            <table border="1">
                <tr >
                    <th>用户累加账单</th>
                    <th>历史总计</th>
                    <th>查询结果</th>
                    <th>单位</th>
                </tr>

                <tr >
                    <td>总消费</td>
                    <td>{{ tableData.aLLConsumption }}</td>
                    <td>{{ arrData.aLLConsumption }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>商城购买语音</td>
                    <td>{{ tableData.buyVoice }}</td>
                    <td>{{ arrData.buyVoice }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>实时聊天</td>
                    <td>{{ tableData.liveChat }}</td>
                    <td>{{ arrData.liveChat }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>预约聊天</td>
                    <td>{{ tableData.appointmentChat }}</td>
                    <td>{{ arrData.appointmentChat }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>用户所有收益</td>
                    <td>{{ tableData.aLLIncome }}</td>
                    <td>{{ arrData.aLLIncome }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>商城收益</td>
                    <td>{{ tableData.mallIncome }}</td>
                    <td>{{ arrData.mallIncome }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>即时聊天收益</td>
                    <td>{{ tableData.liveChatCollection }}</td>
                    <td>{{ arrData.liveChatCollection }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>预约聊天收益</td>
                    <td>{{ tableData.bookingChatIncome }}</td>
                    <td>{{ arrData.bookingChatIncome }}</td>
                    <td>金币</td>
                </tr>
                <tr >
                    <td>总充值数</td>
                    <td>{{ tableData.allRecharge }}</td>
                    <td>{{ arrData.allRecharge }}</td>
                    <td>元</td>
                </tr>
                <tr >
                    <td>支付宝充值</td>
                    <td>{{ tableData.zfbRecharge }}</td>
                    <td>{{ arrData.zfbRecharge }}</td>
                    <td>元</td>
                </tr>
                <tr >
                    <td>微信充值</td>
                    <td>{{ tableData.wxRecharge }}</td>
                    <td>{{ arrData.wxRecharge }}</td>
                    <td>元</td>
                </tr>
                <!--<tr >-->
                    <!--<td>所有提现</td>-->
                    <!--<td>{{ tableData.allWithdrawalTotal }}</td>-->
                    <!--<td>{{ arrData.allWithdrawalTotal }}</td>-->
                    <!--<td>元</td>-->
                <!--</tr>-->
                <tr >
                    <td>支付宝提现</td>
                    <td>{{ tableData.zfbWithdrawalTotal }}</td>
                    <td>{{ arrData.zfbWithdrawalTotal }}</td>
                    <td>元</td>
                </tr>
                <!--<tr >-->
                    <!--<td>微信提现</td>-->
                    <!--<td>{{ tableData.wxWithdrawalTotal }}</td>-->
                    <!--<td>{{ arrData.wxWithdrawalTotal }}</td>-->
                    <!--<td>元</td>-->
                <!--</tr>-->
                <tr >
                    <td>提现收益统计</td>
                    <td>{{ tableData.incomeSum }}</td>
                    <td>{{ arrData.incomeSum }}</td>
                    <td>元</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
    export default {
        name: "caiwuCard",
        data(){
            return{
                startDate:'',    //开始时间搜索
                endDate:'',    //结束时间搜索
                tableData:{},
                arrData:[],     //选择时间赋值数据
                lowMoney:{}     //当前手续费和最低提现
            }
        },
        created(){
            this.showList();
        },
        methods:{
            showList(){
                this.$api.money.caiwu_card(data=>{
                    this.tableData = data
                },{
                    startTime:this.startDate==''?null:this.startDate,
                    endTime:this.endDate==''?null:this.endDate
                })
                // 当前手续费和最低提现
                this.$api.money.low_money(data=>{
                    this.lowMoney = data
                })
            },
            //搜索日期
            changeDate(val){
                 this.$api.money.caiwu_card(data=>{
                    this.arrData = data
                },{
                    startTime:this.startDate==''?null:this.startDate,
                    endTime:this.endDate==''?null:this.endDate
                })
            },
            //打印
            print(){
              let userId = window.localStorage.getItem('miyu.userId')
              let token = window.localStorage.getItem('miyu.token')
                this.$ajax.get('/bill/checkPreviewPrint',{
                    params:{
                        startTime:this.startDate==''?null:this.startDate,
                        endTime:this.endDate==''?null:this.endDate,
                        token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
                    }
                }).then(res=>{
                  // 获取url
                  const url = res.request.responseURL
                  window.location.href = url
                })
            }
        }
    }
</script>

<style scoped lang="less">
header{
    overflow: hidden;
    margin-top: 15px;
    .date_time{
        width: 380px;
    }
    .door{
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
section{
    margin-top: 15px;
    background: #fff;
    table{
        width: 100%;
        tr{
            th{
                width: 25%;
                text-align: center;
                padding: 10px 15px;
            }
            td{
                text-align: center;
                padding: 10px 15px;
            }
        }
    }
}
</style>
