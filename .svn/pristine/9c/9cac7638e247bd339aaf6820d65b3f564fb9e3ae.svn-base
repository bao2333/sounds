<template>
    <div>
        <el-table :data="tableData" style="width: 100%" border size="mini" v-loading="loading" height="300">
            <el-table-column label="具体的类型" align="center" v-if="moneyType!==3">
                <template slot-scope="props">
                   <div v-if="moneyType==0 || moneyType==1">
                        {{  props.row.type == 0 ? '充值' : 
                        props.row.type == 1 ? '购买语音' : 
                        props.row.type == 2 ? '实时聊天' : 
                        props.row.type == 3 ? '预约聊天' : 
                        props.row.type == 4 ? '商城收入' : 
                        props.row.type == 5 ? '实时聊天收入' : 
                        props.row.type == 6 ? '预约聊天收入' : '' }}
                   </div>
                   <div v v-if="moneyType==2">
                       {{ props.row.quoteId == 0 ? '支付宝充值' : props.row.quoteId == 1 ? '微信充值' : props.row.quoteId == 2 ? '苹果支付' : '' }}
                   </div>
                </template>
            </el-table-column>
            <el-table-column label="产生金额" align="center" v-if="moneyType!==3">
                <template slot-scope="props">
                    {{ props.row.produceAmount }}
                </template>
            </el-table-column>
            <el-table-column label="申请金额" align="center" v-if="moneyType==3">
                <template slot-scope="props">
                    {{ props.row.money }}
                </template>
            </el-table-column>
            <el-table-column label="当时的手续费" align="center" v-if="moneyType==3">
                <template slot-scope="props">
                    {{ props.row.serviceCharge + '%' }}
                </template>
            </el-table-column>
            <el-table-column label="实际到账金额" align="center" v-if="moneyType==3">
                <template slot-scope="props">
                    {{ props.row.arrivalAmountMoney}}
                </template>
            </el-table-column>
            <el-table-column label="提现类型" align="center" v-if="moneyType==3">
                <template slot-scope="props">
                    {{ props.row.withdrawType == 0 ? '支付宝' : props.row.withdrawType == 1 ? '微信' : '' }}
                </template>
            </el-table-column>
            <el-table-column label="当前状态" align="center" v-if="moneyType==3">
                <template slot-scope="props">
                    {{ props.row.state == 0 ? '等待审核处理' : props.row.state == 1 ? '已处理' : props.row.state == 2 ? '拒绝付款' : props.row.state == 3 ? '信息错误' : '' }}
                </template>
            </el-table-column>

            <el-table-column label="创建时间" align="center">
                <template slot-scope="props">
                    {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="float: right;margin-top: 15px">
            <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="pageSize" :total="total" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            moneyType:Number
        },
        data(){
            return{
                loading:false,      //加载
                size:null,
                pageSize:null,
                total:null,
                page:1,
                tableData:[],
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.getList();
            },
            getList(){
                const page = this.page
                this.loading = true;
                this.$api.user.user_incomeDetails(data=>{
                    this.loading = false;
                    this.tableData = data.result;
                    this.total = data.pageInfo.total;  
                    this.size = data.pageInfo.pageSize;  
                    this.pageSize = data.pageInfo.pages;  
                },{
                    pageNum:page,
                    userId:parseInt(this.$route.params.userId),
                    type:this.moneyType
                })
            }
        }
        
    }
</script>

<style scoped>

</style>