 <template>
    <div style="width:100%">
        <div class="label" v-for="(item,index) in labelArrs" :key="index"  :style="[divWidth]">
            <input type="text" v-model="item.name" :style="[inputOfWidth]">
            <i class="ion ion-md-close align-middle" @click="close_label(item.id)"></i>
        </div>
         <div class="add_label" @click="add_label" v-if="add_type !== '1'">
            <p v-show="show_label">+</p>
            <input type="text" v-model="newValue" placeholder="新增标签" v-show="!show_label" @blur="disappear()">
        </div>
    </div>
</template>

<script>
    export default {
        name: "soundTypeLabel",
        props:{
            arrs:Array,     //标签数组
            widthAuto:Object,   //声感修饰标签宽
            inputAuto:Object,  //声感修饰input的left
            addtype:String,     //当addtype为1时，添加按钮不显示，录音台词模块专用
            type:Number,
        },
        data(){
            return{
                labelArrs:this.arrs,    //标签数组
                newValue:'',    //新增标签的input的值
                show_label:true,    //新增input显示隐藏
                inputOfWidth:this.inputAuto,    //声感修饰input的left赋值
                divWidth:this.widthAuto,    //声感修饰标签宽赋值
                add_type:this.addtype,       //录音台词添加，当为1的时候不显示添加按钮
                // type:this.type       //录音台词添加，当为1的时候不显示添加按钮
            }
        },
        created(){

        },
        methods:{
            // 添加标签
            add_label(){
                this.show_label = false;
                this.newValue = ''

            },
            // 新增鼠标移出事件
            disappear(){
                this.show_label = true;     //鼠标移出
              if(this.newValue !== ''){
                //添加接口
                this.$api.label.sound_add(()=>{
                  this.$notify({
                    type:'success',
                    message:'添加成功',
                    title:'成功',
                  })
                  this.$parent.labelList()    //调用父组件的方法刷新数据
                },{
                  name:this.newValue,
                  type:parseInt(this.type)
                })
              }
            },
             // 删除标签
            close_label(id) {
                // this.arrs.splice(i, 1);     //假删除
                this.$confirm('确定要删除此标签吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.label.sound_delete(()=>{
                      this.$notify({
                        type:'success',
                        message:'删除标签成功！',
                        title:'成功',
                      })
                        this.$parent.labelList()    //调用父组件的方法刷新数据
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
        },
        watch:{
           arrs(val){   //监听标签数组
               this.labelArrs = val;
           },
           widthAuto(val){  //监听div宽
               this.divWidth = val;
           },
           inputAuto(val){   //监听input宽
               this.inputOfWidth = val;
           },
           addtype(val){
               this.add_type = val;     //监听addtype的值
           },
           type(val){
               this.type = val;     //监听type的值
           },
        }
    }
</script>

<style scoped lang="less">
@theme_color:  rgb(233, 116, 38);
.label{
    width: 100px;
    height: 40px;
    border:1px solid #ccc;
    position: relative;
    float: left;
    margin:10px 30px;
    border-top-right-radius: 15px;
    input{
        display: inline-block;
        width: 98px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
        // left: 50%;
        // margin-left: -40px;
        text-align: center;
        background-color: #fff;
        border:none;
    }
    i {
    position: absolute;
    top: -8px;
    right: -10px;
    border: 1px solid #000;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 14px;
    cursor: pointer;
    }
    i:hover {
    background-color: rgb(233, 116, 38);
    color: #fff;
    }

}
.add_label{
      width: 150px;
      height: 40px;
      border: 1px dashed #ccc;
      float: left;
    //   margin:15px 0 0 15px;
      margin: 10px 30px;
      cursor: pointer;
      position: relative;
      p{
        font-size: 26px;
        line-height: 40px;
        text-align: center;
      }
      input{
        display: inline-block;
        width: 120px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
        left: 50%;
        margin-left: -60px;
        text-align: center;
        background-color: #fff;
        border: 1px solid @theme_color;
      }
  }
  .add_label:hover{
      color: @theme_color;
      border:1px dashed @theme_color;
  }
</style>
