<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-select
        v-model="Cabinet"
        clearable
        placeholder="请选择"
        @change="changeHost"
        style="position:absolute; left:220px; top:0px"
      >
        <el-option v-for="cabinet in cabinets" :value="cabinet"></el-option>
      </el-select>
      <el-select
        v-model="Host"
        clearable
        placeholder="请选择"
        @change="changeUser"
        style="position:absolute; left:500px; top:0px"
      >
        <el-option v-for="host in hosts" :value="host"></el-option>
      </el-select>
      <el-select
        v-model="User"
        clearable
        placeholder="请选择"
        @change="listCron"
        style="position:absolute; left:800px; top:0px"
      >
        <el-option v-for="user in users" :value="user"></el-option>
      </el-select>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="dialogFormVisible = true">添加crontab</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-dialog title="crontab" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="选择机柜" :label-width="formLabelWidth">
          <el-select v-model="Cabinet" placeholder="请选择机柜" @change="changeHost">
            <el-option v-for="cabinet in cabinets" :value="cabinet"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择服务器" :label-width="formLabelWidth">
          <el-select v-model="Host" placeholder="请选择服务器">
            <el-option v-for="host in hosts" :value="host"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择时间" :label-width="formLabelWidth">
          <el-input placeholder="分" v-model="formsecond">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
          <el-input placeholder="时" v-model="formtime">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
          <el-input placeholder="日" v-model="formday">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
          <el-input placeholder="月" v-model="formmonth">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
          <el-input placeholder="周" v-model="formweek">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="命令" :label-width="formLabelWidth">
          <el-input placeholder="bash" v-model="formbash">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="PostCron()">确 定</el-button>
      </div>
    </el-dialog>

    <el-main>
      <span v-for="cron in crons">
        {{cron}}
        <el-divider content-position="left"></el-divider>
      </span>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      cabinets: null,
      hosts: null,
      users: null,
      crons: null,
      Host: null,
      Cabinet: null,
      User: null,
      formsecond: "",
      formtime: "",
      formday: "",
      formmonth: "",
      formweek: "",
      formbash: "",
      dialogFormVisible: false,
      centerDialogVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    listCron() {
      if (this.cabinets && this.hosts) {
        axios
          .get("http://127.0.0.1:5000/api/show/" + this.Host + "/" + this.User)
          .then(response => (this.crons = response.data));
      }
    },
    changeHost(e) {
      // console.log(e.target.value);
      // console.log(this.User,this.Host,"========")
      if (this.cabinets) {
        axios
          .get("http://127.0.0.1:5000/api/show/" + this.Cabinet)
          .then(response => (this.hosts = response.data));
      }
    },
    changeUser(e) {
      if (this.cabinets) {
        axios
          .get("http://127.0.0.1:5000/api/show/cabinet/" + this.Host)
          .then(response => (this.users = response.data));
      }
    },
    listCabinets() {
      axios
        .get("http://127.0.0.1:5000/api/show/cabinet")
        .then(response => (this.cabinets = response.data));
    },
    addCron() {
      this.dialogFormVisible = true;
      console.log(dialogFormVisible);
    },
    PostCron() {
      let data = {
        crontab:
          this.formsecond +
          this.formtime +
          this.formday +
          this.formmonth +
          this.formweek +
          this.formbash,
        cabinet: this.Cabinet,
        host: this.Host
      };
      axios
        .post("http://127.0.0.1:5000/api/add/crontab", data)
        .then(response => {
          // console.log(response,"=====")
          if (response.status == 200){
           this.$message({
              message: "添加成功",
              type: "success"
            },
           this.dialogFormVisible = false  )}
          else{
              this.$message.error('添加失败')
          }
        })

      // .then(res=> {console.log('res=>',res);})
    }
  },
  mounted() {
    this.listCabinets();
  }
};
</script>

<style scope>
</style>


