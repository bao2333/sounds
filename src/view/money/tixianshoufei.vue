<template>
<div class="all">
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '' }" >财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">提现收费</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
    <div class="box">
        <header>
            <h3>提现收费设置</h3>
        </header>
        <main>
            <p>每笔提现： <span>收&nbsp;&nbsp;&nbsp;&nbsp;取 <input type="text" v-model="tixian">   %手续费</span></p>
            <p>提现门槛： <span>至少满 <input type="text" v-model="doorTixian"> 元</span></p>
            <el-button class="editorMoney" @click="editorTixian()">修改</el-button>
        </main>
    </div>
    <section>
            <div>
                <el-select v-model="searchStatus" placeholder="请选择提现状态" @change="getTixianList()" size="mini" clearable>
                    <el-option label="待处理" value="0"></el-option>
                    <el-option label="已处理" value="1"></el-option>
                    <el-option label="已拒绝" value="2"></el-option>
                    <el-option label="信息错误" value="3"></el-option>
                </el-select>
                <el-button type="primary" size="mini" @click="print()">打印当前页</el-button>
                <el-button type="primary" size="mini" @click="print(1)">打印所有结果</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;margin:15px 0 15px 0;"
                border
                size="mini"
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" :selectable="selectable"></el-table-column>
                <el-table-column prop="userName" label="提现用户名" align="center"> </el-table-column>
                <el-table-column prop="certification" label="是否实名" align="center">
                    <template slot-scope="props">
                        {{ props.row.certification == 0 ? '未认证' : props.row.certification == 1 ? '已认证' : props.row.certification == 2 ? '认证中' : '' }}
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="提现金币数" align="center"> </el-table-column>
                <el-table-column label="提现手续费" align="center">
                    <template slot-scope="props">
                        {{ props.row.serviceCharge + '%' }}
                    </template>
                </el-table-column>
                <el-table-column prop="arrivalAmountMoney" label="实际到账金额" align="center"> </el-table-column>
                <el-table-column label="当前状态" align="center">
                    <template slot-scope="props">
                        {{ props.row.state == 0 ? '待处理' : props.row.state == 1 ? '已处理' : props.row.state == 2 ? '已拒绝' : props.row.state == 3 ? '信息错误' : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="提现类型" align="center">
                    <template slot-scope="props">
                        {{ props.row.withdrawType == 0 ? '支付宝' : props.row.withdrawType == 1 ? '微信' : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="提现账户" align="center">
                    <template slot-scope="props">
                        <p style="margin:0">账户：{{ props.row.account }}</p>
                        <p style="margin:0">账户名：{{ props.row.realname }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
                <el-table-column label="提现时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="处理时间" align="center">
                    <template slot-scope="props">
                        <p style="margin-bottom:0" v-if="props.row.state == 1 || props.row.state == 2 || props.row.state == 3">
                            {{ new Date(props.row.updateTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="审核" align="center">
                  <template slot-scope="props">
                   <el-button type="primary" size="mini" v-if="props.row.state == 0" @click="dialogVisible=true;shenheDan(props.row.id)">审核</el-button>
                    <p style="margin: 0" v-else>已审核</p>
                  </template>
                </el-table-column>
            </el-table>
            <el-button size="mini" type="primary" @click="dialogVisible=true;shenheGet()">审核</el-button>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
            <!-- 审核提现模态框 -->
            <el-dialog title="审核提现" :visible.sync="dialogVisible" width="30%">
                <el-form ref="form" :model="form" label-width="60px">
                    <el-form-item label="状态：">
                        <el-select v-model="form.status" placeholder="请选择提现状态" style="width:100%" size="small">
                        <!-- <el-option label="待处理" value="0"></el-option> -->
                        <el-option label="已处理" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                        <el-option label="信息错误" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="form.remark" size="small"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false;shenhePost(tixianId)" size="mini">确 定</el-button>
                </span>
            </el-dialog>
    </section>
</div>

</template>

<script>
  import CryptoJS from 'crypto-js'
    export default {
        name: "tixianshoufei",
        data(){
            return{
                dialogVisible:false,
                loading:false,
                tixian:'15',            //每笔提现
                doorTixian:'100',       //提现门槛
                tableData:[],           //提现列表
                page:1,                 //当前页数
                total:null,             //分页总条目数
                size:null,              //分页页数
                count:null,             //页数
                searchStatus:'',        //搜索提现状态
                form:{
                    status:'',
                    remark:'',
                },
                checkList:[],
                ids:[],
                tixianId:''
            }
        },
        created(){
            this.getTixianList()
        },
        mounted(){
            this.getData();
        },
        methods:{
            // 获取提现费用
            getData(){
                this.$api.money.tixian(data=>{
                    this.tixian = data.pushMoney
                    this.doorTixian = data.minimumWithdrawalAmount
                })
            },
            // 修改提现金额
            editorTixian(){
                this.$api.money.tixian_editor(()=>{
                    this.$notify({
                        type:'success',
                        message:'修改提现金额成功！',
                        title:'成功',
                    })
                    this.getData();
                },{
                    pushMoney:parseInt(this.tixian),
                    minimumWithdrawalAmount:parseInt(this.doorTixian),
                })
            },
            handleCurrentChange(val){
                this.page = val;
                this.getTixianList()
            },
            // 提现列表
            getTixianList(){
                const page = this.page;
                this.loading = true;
                this.$api.money.tixian_list(data=>{
                    this.loading = false;
                    this.tableData = data.result;
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page,
                    status:this.searchStatus==''?null:parseInt(this.searchStatus)
                })
            },
            // 打印
            async print(ele){
              let userId = await window.localStorage.getItem('miyu.userId')
              let token = await window.localStorage.getItem('miyu.token')
                this.$ajax.get('/incomeDraw/print',{
                     params: {
                        status:this.searchStatus==''?null:parseInt(this.searchStatus),
                        pageNum:ele==1?null:this.page,
                       token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
                    }
                })
                .then(function (response) { //请求成功打开地址
                    const printUrl = response.request.responseURL;
                    window.location = printUrl;
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 选中check的时候给选中值赋值
            handleSelectionChange(val){
                this.checkList = val
            },
            // dialog打开清空
            shenheGet(){
                this.form.status = ''
                this.form.remark = ''
            },
            // 审核提交
            shenhePost(id){


                  let tixianId = []
                  tixianId.push(id)
                  console.log(tixianId)

                  // 遍历check的数组，拿出id，push到新数组中
                  this.checkList.map(item=>{
                    this.ids.push(item.id)
                  })


                this.$api.money.shenhe_tx((callback,data)=>{
                    this.$notify({
                        type:'success',
                        message:`${callback.content}`,
                        title:'成功'
                    })
                    this.getTixianList()
                    this.ids = []   //处理成功后清空数组，以重新push
                },{
                    ids:id?tixianId:this.ids,
                    status:parseInt(this.form.status),
                    remark:this.form.remark
                })
            },
            shenheDan(id){
                this.tixianId = id
            },
            // 只有待处理的时候才能选择check
            selectable(row, index){
                if(row.state == '0'){
                    return true
                }
            }
        }
    }
</script>

<style scoped lang="less">
@theme_color: rgb(233, 116, 38);
.box{
     width: 500px;
     margin: 15px auto;
    header{
        border-bottom: 1px solid #ccc;
        h3{
            text-align: center;
        }
    }
    main{
        p{
            // text-align: center;
            margin:30px 0 0 70px;
            input{
                text-align: center;
            }
        }
        .editorMoney{
            margin: 30px auto;
            display: block;
            padding: 10px 25px;
            background-color: @theme_color;
            color: #fff;
        }
    }
}
</style>
