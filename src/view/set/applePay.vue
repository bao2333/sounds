<template>
    <div>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="Apple Pay" name="first">
                <div class="Apple_Pay">
                    <el-button type="primary" size="mini" @click="editorDialog=true;getApple(1)">添加</el-button>
                    <el-table :data="tableData" style="width: 100%;margin-top:15px;" border v-loading="loading">
                        <el-table-column prop="appleId" label="APPLE设置的数据" align="center"></el-table-column>
                        <el-table-column prop="money" label="用户支付金额" align="center"></el-table-column>
                        <el-table-column prop="gold" label="用户获得金币" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="props">
                                <el-button type="primary" size="mini" @click="editorDialog=true;getApple(0,props.row)">修改</el-button>
                                <el-button type="danger" size="mini" @click="deleteApple(props.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <p style="display:block;color:red;line-height:40px;">* 请勿随意修改，务必与APPLE开发者账号中设置的一致，否则会造成用户充值不到账的情况！</p>
                    <el-dialog :title="type==0?'修改数据':type==1?'添加数据':''" :visible.sync="editorDialog" width="30%">
                        <el-form ref="form" :model="form" label-width="100px" v-if="type==0">
                            <el-form-item label="APPLE数据">
                                <el-input v-model="form.appleId"></el-input>
                            </el-form-item>
                            <el-form-item label="用户支付金额">
                                <el-input v-model="form.money"></el-input>
                            </el-form-item>
                            <el-form-item label="用户获得金币">
                                <el-input v-model="form.gold"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form ref="add" :model="add" label-width="100px" v-if="type==1">
                            <el-form-item label="APPLE数据">
                                <el-input v-model="add.appleId"></el-input>
                            </el-form-item>
                            <el-form-item label="用户支付金额">
                                <el-input v-model="add.money"></el-input>
                            </el-form-item>
                            <el-form-item label="用户获得金币">
                                <el-input v-model="add.gold"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editorDialog = false" size="mini">取 消</el-button>
                            <el-button type="primary" @click="editorDialog = false;editorApplePayPost()" size="mini" v-if="type==0">确 定</el-button>
                            <el-button type="primary" @click="editorDialog = false;addApplePayPost()" size="mini" v-else-if="type==1">添 加</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Android Pay" name="second">
                <!-- 安卓支付组件 -->
                <AndroidPay/>
            </el-tab-pane>
            
        </el-tabs>
       
    </div>
</template>

<script>
import AndroidPay from './androidPay'
    export default {
        components:{
            AndroidPay
        },
        data(){
            return{
                activeName:'first', //..选项卡
                loading:false,
                editorDialog:false,
                tableData:[],   //apple
                
                form:{
                    id:'',
                    appleId:'',
                    money:'',
                    gold:'',
                },
                add:{
                    appleId:'',
                    money:'',
                    gold:'',
                },
                type:null,
            }
        },
        created(){
            this.getList();
        },
        methods:{
            // 苹果数据
            getList(){
                this.loading = true;
                this.$api.set.apple_pay_list(data=>{
                    this.tableData = data;
                    this.loading = false;
                })
            },
            // 修改获取数据
            getApple(type,row){
                this.type = type
                this.form.id = row.id;
                this.form.appleId = row.appleId;
                this.form.money = row.money;
                this.form.gold = row.gold;
            },
            // 提交修改数据
            editorApplePayPost(){
                this.$api.set.apple_pay_editor(()=>{
                    this.$notify({
                        type:'success',
                        message:'修改数据成功！',
                        title:'成功'
                    })
                    this.getList();
                },{
                    id:this.form.id,
                    appleId:this.form.appleId,
                    money:parseInt(this.form.money),
                    gold:parseInt(this.form.gold),
                })
            },
            deleteApple(id){
                this.$confirm('确定要删除此条数据吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.set.apple_pay_delete(()=>{
                        this.$notify({
                            type:'success',
                            message:'删除数据成功！',
                            title:'成功'
                        })
                        this.getList();
                    },{
                        id:id
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            addApplePayPost(){
                this.$api.set.apple_pay_add(()=>{
                    this.$notify({
                        type:'success',
                        message:'添加数据成功！',
                        title:'成功'
                    })
                    this.getList();
                },{
                    appleId:this.add.appleId,
                    money:parseInt(this.add.money),
                    gold:parseInt(this.add.gold),
                })
            }
        }
        
    }
</script>

<style scoped>

</style>