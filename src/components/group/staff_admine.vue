<template>
    <!-- 5、从用户user页跳到员工账号管理页-->
    <div class="userBox">
    <el-form class="elformone">
        <el-form-item label="用户姓名">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户手机">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="员工编号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="归属组织">
            <el-popover
                placement="left"
                width="400"
                trigger="click"
                @after-enter="toFetchGroup">
                <el-container direction="vertical" v-loading="loading">
                    <div class="group-box">
                        <label>组织名称<input class="groupname" v-model="abc"/></label>
                        <el-button icon="el-icon-search" @click="filterItem=abc" size="small">查询</el-button>
                    </div>
                    <el-table border :data="filterGroup()(filterItem)" max-height="200" style="width: 100%" @row-click="rowClick">
                        <el-table-column width="80" type="index" label="序号"></el-table-column>
                        <el-table-column width="160" property="ORGNAME" label="组织名称"></el-table-column>
                        <el-table-column width="300" property="FORGNAME" label="上级组织"></el-table-column>
                    </el-table>
                </el-container>
                <el-input v-model="groupName" slot="reference">
                    <i slot="suffix" class="el-input__icon el-icon-caret-bottom"></i>
                </el-input>
            </el-popover>
            
        </el-form-item> 
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-form>
      <el-container class="containertwo" style="width:100%" v-loading="newloading">
        <el-table :data="tableData" border size="small" style="width:100%">
          <el-table-column type="index" fixed width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="id" label="员工ID" width="120"></el-table-column>
          <el-table-column prop="code" label="员工编号" width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="group" label="归属组织" width="120"></el-table-column>
          <el-table-column prop="uppergroup" label="上级组织" :show-overflow-tooltip="true" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="editorData" :rules="rulesData" class="dialogs" ref="editorDialog">
              <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                <el-input v-model="editorData.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="员工ID" prop="id" :label-width="formLabelWidth">
                <el-input v-model="editorData.id" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="员工编号" :label-width="formLabelWidth">
                <el-input v-model="editorData.code" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="editorData.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                <el-input v-model="editorData.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="归属组织" :label-width="formLabelWidth">
                <el-input v-model="editorData.group" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="上级组织" :label-width="formLabelWidth">
                <el-input v-model="editorData.uppergroup" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="sure" size="small">确 定</el-button>
            </div>
          </el-dialog>
        <div class="bot">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="userlist.length"
            :page-size="pageSize"
            @current-change="pageChange">
          </el-pagination>
          <el-button type="primary" size="small" @click="add">添加</el-button>
        </div>
      </el-container>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      groupName: "未知组织",
      idx: [],
      flag: false,
      txt: "新增员工",
      filterItem: "",
      abc: "",
      pageSize:5,
      page:1,
      newloading:false,
      title:'编辑',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      editorData:{
        name: '',
        id: '',
        code: '',
        group: '',
        uppergroup: '',
        email: '',
        phone: ''
      },
      rulesData:{
        name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        id:[{ required: true, message: '请输入id', trigger: 'blur'}],
        email:[
          { message:'请输入邮箱',trigger: 'blur'},
          { type:'email',message:'邮箱格式不正确', trigger:'blur'}
        ]
      }
    };
  },
  methods: {
    toggleSelection(rows) {
      //table自带事件
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toFetchGroup() {
      this.loading = true;
      this.fetchGroup(()=>{
        this.loading = false//回调，关闭loading
      });
    },
    toFetchUser(){
      this.newloading = true
      this.fetchUser(()=>{
        this.newloading = false//loading
      })
    },
    rowClick(row, event, column) {
      //某一行被点击时触发,将选中的组织名称写入input框中
      this.groupName = row.ORGNAME;
    },
    pageChange(page){
      this.page = page;
    },
    handleClick(row){
      this.dialogFormVisible = true;
      this.editorData = row;//点编辑时选中的内容赋值弹窗里
      this.title = '编辑'
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);//删除
      },
    add(){
      this.dialogFormVisible = true;
      this.title = '添加'
      this.editorData = {
        name: '',
        id: '',
        code: '',
        group: '',
        uppergroup: '',
        email: '',
        phone: ''
      }
    },
    sure(){
      this.$refs.editorDialog.validate((isValidate,val)=>{
        if(isValidate){
          this.dialogFormVisible = false;
        }
      })
      if(this.title === '添加'){
        if(this.editorData.name){
          this.userlist.push(this.editorData)
        }
      }
    },
    ...mapActions(["fetchGroup","fetchUser"]),
    ...mapGetters(["filterGroup"])
  },
  computed: {
    tableData(){//分页
      let tableArr = this.userlist.slice(this.pageSize*(this.page-1),this.pageSize*this.page)
      return tableArr;
    },
    ...mapState(["userlist"])
  },
  mounted() {
    this.toFetchUser()
  }
};
</script>
<style>
.userBox{
  width:100%;
}
.elformone {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;
}
.elformone .el-form-item {
  width: 18%;
  margin: 0 1%;
  text-align: center;
  margin-bottom: 0;
}
.elformone .el-form-item__label {
  float: none;
  line-height: 30px;
}
.elformone .el-form-item__content {
  display: inline-block;
}
.elformone .el-input {
  height: 30px;
}
.elformone .el-input__inner {
  height: 30px;
}
.elformone .el-button {
  height: 30px;
  line-height: 30px;
  width: 80px;
  margin-top: 35px;
  padding: 0;
}
.group-box {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding-bottom: 10px;
}
.elformone .el-container {
  background: #fff;
}
.elformone .el-container .el-button {
  margin-top: 0;
}
.groupname {
  width: 100px;
  height: 26px;
  margin-left: 10px;
  border: 1px solid #ccc;
}
.containertwo{
  display: flex;
  flex-direction: column;
}
.containertwo .bot{
  width:100%;
  display: flex;
  justify-content: space-around;
  background:#fff;
}
.dialogs{
  display: flex;
  flex-wrap: wrap;
}
.el-dialog__header{
  border-bottom:1px solid #ccc;
  padding:10px 20px 5px;
}
.el-dialog__body{
  padding:10px 20px;
}
.dialogs .el-form-item{
  width:50%;
  margin-bottom:26px;
}
.dialogs .el-form-item__label,.dialogs .el-form-item__content{
  line-height: 30px;
}
.dialogs .el-input__inner{
  height:30px;
}
</style>
