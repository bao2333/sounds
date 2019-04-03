<template>
    <div class="Android_Pay">
         <el-button type="primary" size="mini" @click="editorDialog=true;getApple(1)">添加</el-button>
        <el-table :data="androidData" style="width: 100%;margin-top:15px;" border v-loading="loading">
            <el-table-column prop="money" label="用户支付金额" align="center"></el-table-column>
            <el-table-column prop="gold" label="用户获得金币" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="props">
                    <el-button type="primary" size="mini" @click="editorDialog=true;getApple(0,props.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="deleteApple(props.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="type==0?'修改数据':type==1?'添加数据':''" :visible.sync="editorDialog" width="30%">
            <el-form ref="form" :model="form" label-width="100px" v-if="type==0">
                <el-form-item label="用户支付金额">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="用户获得金币">
                    <el-input v-model="form.gold"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="add" :model="add" label-width="100px" v-if="type==1">
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
</template>

<script>
    export default {
        data(){
            return{
                loading:false,
                editorDialog:false,
                androidData:[],   //android
                form:{
                    money:'',
                    mongoldey:'',
                },
                add:{
                    money:'',
                    mongoldey:'',
                },
                type:null
            }
        },
        created(){
            this.getAndroidList()
        },
        methods:{
            getAndroidList(){
                this.$api.set.android_pay_list(data=>{
                    this.androidData = data
                })
            },
            // 修改获取数据
            getApple(type,row){
                this.type = type
                this.form.id = row.id;
                this.form.money = row.money;
                this.form.gold = row.gold;  
            },
            // 修改数据
            editorApplePayPost(){
                this.$api.set.android_pay_editor(()=>{
                    this.$notify({
                        type:'success',
                        message:'修改数据成功！',
                        title:'成功'
                    })
                    this.getAndroidList()
                },{
                    id:this.form.id,
                    money:parseInt(this.form.money),
                    gold:parseInt(this.form.gold)
                })
            },
            // 新增
            addApplePayPost(){
                this.$api.set.android_pay_add(()=>{
                    this.$notify({
                        type:'success',
                        message:'添加数据成功！',
                        title:'成功'
                    })
                    this.getAndroidList()
                },{
                    money:parseInt(this.add.money),
                    gold:parseInt(this.add.gold)
                })
            },
            // 删除
            deleteApple(id){
                this.$confirm('确定要删除此条数据吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.$api.set.android_pay_delete(()=>{
                    this.$notify({
                        type:'success',
                        message:'删除数据成功！',
                        title:'成功'
                    })
                    this.getAndroidList()
                },{
                    id:id
                })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            }
        }
    }
</script>

<style scoped>

</style>