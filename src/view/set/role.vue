<template>
    <div>
      <el-button type="primary" size="mini" @click="dialogVisible=true;getType(0)">添加</el-button>
      <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="small">
        <el-table-column prop="name" label="账号" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="props">
            <el-button type="success" size="mini" @click="dialogVisible=true;getType(1,props.row.id)">重置密码</el-button>
            <el-button type="primary" size="mini" @click="dialogVisible=true;getType(2,props.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deletePost(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="type==0?'添加':type==1?'重置密码':type==2?'修改':''" :visible.sync="dialogVisible" width="30%" >

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号" v-if="type == 0 || type == 2">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="手机号" v-if="type == 0 || type == 2">
            <el-input v-model="form.phone" ></el-input>
          </el-form-item>
          <el-form-item label="密码" v-if="type == 0">
            <el-input v-model="form.password" ></el-input>
          </el-form-item>
          <el-form-item label="新密码" v-if="type==1">
            <el-input v-model="form.newPassword" readonly></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;addPost()" size="mini" v-if="type==0">添 加</el-button>
          <el-button type="success" @click="resetPassword()" size="mini" v-if="type==1">重置密码</el-button>
          <el-button type="primary" @click="dialogVisible = false;editorPost()" size="mini" v-if="type==2">修 改</el-button>
        </span>
      </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "role",
      data(){
          return{
            dialogVisible:false,
            type:'',
            tableData:[],
            form:{
              id:'',
              name:'',
              phone:'',
              password:'',
              newPassword:'',
            }
          }
      },
      created(){
        this.getList()
      },
      methods:{
          getList(){
            this.$api.set.role_list(data=>{
              this.tableData = data
            })
          },
        getType(type,row){
          this.type = type
          if(type == 2){
            this.form.name = row.name
            this.form.phone = row.phone
            this.form.id = row.id
          }else if(type == 0){
            this.form.name = '';
            this.form.phone = '';
            this.form.password = '';
          }else if(type == 1){
            console.log(row)
            this.form.id = row
          }
        },
        //添加
        addPost(){
          this.$api.set.role_add(()=>{
            this.$notify({
              type:'success',
              message:'添加成功',
              title:'成功'
            })
            this.getList()
          },{
            name:this.form.name,
            phone :this.form.phone,
            password :this.form.password,
          })
        },
        //修改
        editorPost(){
          this.$api.set.role_editor(()=>{
            this.$notify({
              type:'success',
              message:'修改成功',
              title:'成功'
            })
            this.getList()
          },{
            id:this.form.id,
            name:this.form.name,
            phone :this.form.phone,
          })
        },
        //删除
        deletePost(id){
          this.$confirm('确定要删除此管理员吗?', '提示', {
            confirmButtonText: '狠心删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.set.role_delete(()=>{
              this.$notify({
                type:'success',
                message:'删除成功',
                title:'成功'
              })
              this.getList()
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
        resetPassword(){
          this.$confirm('确定要重置该管理员的密码吗?', '提示', {
            confirmButtonText: '重置',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.set.role_reset(data=>{
              this.$notify({
                type:'success',
                message:'密码重置成功！',
                title:'成功'
              })
              this.form.newPassword = data
            },{
              id:this.form.id
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });

        }
      }
    }
</script>

<style scoped>

</style>
