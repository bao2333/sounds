<template>
    <div>
        <el-button type="primary" size="mini" @click="addGet(1)" v-show="addShow">添加</el-button>
        <el-table :data="tableData" style="width: 50%;margin-top:15px;" border>
            <el-table-column prop="name" label="举报内容"  align="center"> </el-table-column>
            <el-table-column label="操作"  align="center">
                <template slot-scope="props">
                   <el-button type="danger" size="mini" @click="deleteContent(props.row.id)">删除</el-button>
                   <el-button type="primary" size="mini" @click="dialogVisible = true;editorGet(props.row,0)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="type==0?'修改':'添加'" :visible.sync="dialogVisible" width="30%">
            <el-input v-model="editor.content" v-if="type==0"></el-input>
            <el-input v-model="add.content" placeholder="请输入举报内容" v-else></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;addContent()"  size="mini" v-if="type == 1">添 加</el-button>
                <el-button type="primary" @click="dialogVisible = false;editorPost()"  size="mini" v-else>修 改</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                dialogVisible:false,    //修改模态框
                addShow:true,    //添加按钮显示隐藏
                tableData:[],           //列表数据
                add:{
                    content:''     //
                },
                editor:{
                    id:'',     //   修改
                    content:''     //
                },
                type:''
            }
        },
        created(){
            this.getList()
        },
        updated(){
            if(this.dialogVisible == false){
                this.type = ''
            }
            this.addShow = (this.tableData.length >= 6 ? false : true)
        },
        methods:{
            getList(){
                this.$api.jubao.jubao_content_list(data=>{
                    this.tableData = data
                })
            },
            addContent(){
              if(this.add.content==''){
                this.$notify({
                  type: 'warning',
                  message: '举报内容不能为空！!',
                  title:'注意'
                });
                this.dialogVisible = true;
              }else{
                this.$api.jubao.jubao_content_add(()=>{
                  this.$notify({
                    type: 'success',
                    message: '添加成功!',
                    title:'成功'
                  });
                  this.getList()
                },{
                  name:this.add.content
                })
              }

            },
            deleteContent(id){
                 //删除提示
                this.$confirm('确定要删除此条举报内容吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除接口
                    this.$api.jubao.jubao_content_delete(()=>{
                        this.getList();     //删除成功之后刷新消息接口
                        this.$notify({
                            type: 'success',
                            message: '删除内容成功!',
                            title:'成功'
                        });
                    },{
                        id:id
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            addGet(type){
                this.type = type
                this.dialogVisible=true;
            },
            editorGet(row,type){
                this.type = type
                this.editor.id = row.id
                this.editor.content = row.name
            },
            editorPost(){
              if(this.editor.content == ''){
                this.$notify({
                  type: 'warning',
                  message: '举报内容不能为空！!',
                  title:'注意'
                });
                this.dialogVisible = true;
              }else{
                this.$api.jubao.jubao_content_editor(()=>{
                  this.getList();     //删除成功之后刷新消息接口
                  this.$notify({
                    type: 'success',
                    message: '修改内容成功!',
                    title:'成功'
                  });
                },{
                  id:this.editor.id,
                  name:this.editor.content
                })
              }

            }
        }
    }
</script>

<style scoped>

</style>
