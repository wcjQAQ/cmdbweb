<template>
  <div>
    <div style="width:100%">
      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <el-select v-model="Host" placeholder="请选择" @change="changeUser" size="medium">
              <el-option v-for="host in hosts" :value="host"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-select v-model="User" placeholder="请选择" @change="listCron" size="medium">
              <el-option v-for="user in users" :value="user"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-dropdown split-button type="primary" size="medium">
              更多菜单
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type="text" @click="dialogFormVisible = true">添加crontab</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="crontab" :visible.sync="dialogFormVisible">
        <el-form>
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
    </div>
    <div style="margin-top: 80px">
      <span v-for="cron in crons">
        {{cron}}
        <el-divider content-position="left"></el-divider>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      hosts: null,
      users: null,
      crons: null,
      Host: null,
      User: null,
      formsecond: "",
      formtime: "",
      formday: "",
      formmonth: "",
      formweek: "",
      formbash: "",
      dialogFormVisible: false,
      centerDialogVisible: false,
      formLabelWidth: "120px",
      cabinet: ""
    };
  },
  methods: {
    listCron() {
      if (this.User && this.Host) {
        axios
          .get("http://127.0.0.1:5000/api/show/" + this.Host + "/" + this.User)
          .then(response => (this.crons = response.data));
        var obj = {
            cabinet: this.cabinet,
            host: this.Host,
            user: this.User
        }
        localStorage.setItem('type', JSON.stringify(obj));
        // console.log(obj)
      }
    },
    changeHost() {
      if (this.cabinet) {
        axios
          .get("http://127.0.0.1:5000/api/show/" + this.cabinet)
          .then(response => (this.hosts = response.data));
        (this.Host = null), (this.User = null);
      }
    },
    changeUser() {
      if (this.cabinet) {
        axios
          .get("http://127.0.0.1:5000/api/show/cabinet/" + this.Host)
          .then(response => (this.users = response.data));
        this.User = null;
      }
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
        cabinet: this.cabinet,
        host: this.Host
      };
      axios
        .post("http://127.0.0.1:5000/api/add/crontab", data)
        .then(response => {
          // console.log(response,"=====")
          if (response.status == 200) {
            this.$message(
              {
                message: "添加成功",
                type: "success"
              },
              (this.dialogFormVisible = false)
            );
          } else {
            this.$message.error("添加失败");
          }
        });

      // .then(res=> {console.log('res=>',res);})
    }
  },
  mounted(){
        var obj = localStorage.getItem('type');
        obj = JSON.parse(obj);
        this.cabinet = obj.cabinet
        this.User = obj.user
        this.Host = obj.host
        if (this.User && this.Host && this.cabinet) {
          axios
          .get("http://127.0.0.1:5000/api/show/" + this.Host + "/" + this.User)
          .then(response => (this.crons = response.data));
                  axios
          .get("http://127.0.0.1:5000/api/show/" + this.cabinet)
          .then(response => (this.hosts = response.data));
        }
  },
  watch: {
    $route(to, from) {
      this.cabinet = to["query"]["id"];
      this.changeHost();
    }
  }
};
</script>

<style scope>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>