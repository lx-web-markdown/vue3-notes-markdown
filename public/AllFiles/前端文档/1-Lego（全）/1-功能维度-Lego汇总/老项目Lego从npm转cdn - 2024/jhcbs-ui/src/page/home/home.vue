<template>
  <div class="bg">
    <div class="topTitle">
      <img src="../../plugins/img/title.png" alt="" />
      <!-- <h1>舟山市安全风险管控平台</h1> -->
    </div>
    <div class="loginBox">
      <div class="loginImg">
        <img src="../../plugins/img/youku.png" alt="" />
      </div>
      <div class="loginFrom">
        <div class="frombox">
          <div class="saoma">
            <div class="saomaimgbox">
              <img src="../../plugins/img/saoma.png" alt="" />
            </div>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="欢迎登录" name="first">
              <div class="from">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                  <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名">
                      <i slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-wode"></use>
                        </svg>
                      </i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="pass">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" show-password
                      autocomplete="off">
                      <i slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-mima"></use>
                        </svg>
                      </i>
                    </el-input>
                  </el-form-item>
                  <!-- <el-form-item prop="yanzheng">
                    <div class="yanzhengmabox">
                      <el-input
                        v-model="ruleForm.yanzheng"
                        placeholder="请输入验证码"
                      >
                        <i slot="prefix">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-mima"></use>
                          </svg>
                        </i>
                      </el-input>
                      <a href="javascript:;" @click="changeCodeImg()">
                        <img :src="ruleForm.codebase64" alt="图片加载失败" />
                      </a>
                    </div>
                  </el-form-item> -->
                  <el-form-item>
                    <el-button type="primary" class="submit" @click="submitForm('ruleForm')">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="bottomA">
                <a href="#">忘记密码？</a>
                <a href="#"> <span class="hui">没有账号？</span>前往注册 </a>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="扫码登陆" name="second">
              <div class="erweima">
                <img src="../../plugins/img/ewm.jpg" alt="" />
                <h2>请登陆手机APP扫描二维码</h2>
              </div>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>

    <div class="jishuzhichi">
      <a href="http://www.csafety.cn/" target="_blank">
        <p>
          技术支持：中安惟新（舟山）技术有限公司<span>TEL：4008-169-159</span>
        </p>
      </a>
      <a href="https://beian.miit.gov.cn" target="_blank">
        <p>备案号：浙ICP备2020033851号-4</p>
      </a>
    </div>
  </div>
</template>
<script>
import { $http } from '@commonbox/utils';
import { stripscript } from '../../uitls/validate';
import { encryptRes } from '../../uitls/des';

export default {
  components: {},
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      callback();

      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入账号'));
      //   } else {
      //     callback();
      //   }
      // }, 1000);
    };
    const yzm = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      callback();

      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入账号'));
      //   } else {
      //     callback();
      //   }
      // }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      // this.ruleForm.pass = stripscript(this.ruleForm.pass);
      value = this.ruleForm.pass;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        name: '',
        yanzheng: '',
        codeuuid: '',
        codebase64: '',
      },
      activeName: 'first',
      codeImg: '',
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        name: [{ validator: checkAge, trigger: 'blur' }],
        yanzheng: [{ validator: yzm, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.config = this.$route.query;
    this.codeImg = '/zshse/loginApi/getCode';
  },

  mounted() {
    // this.getcodeImg();
    // let resdata={
    //   entId:'zhejiangzhongshiyour',
    //   appId:'chukudantaizhang',
    //   isAuthorized:1
    // }
    // $http.get('/openApi/dataocean/list',resdata).then(res=>{
    //   console.log(res)
    // })
  },
  methods: {
    getcodeImg() {
      $http.get('/zshse/loginApi/getCode').then((res) => {
        this.ruleForm.codebase64 = `data:image/jpg;base64; +${res.data.result.codebase64}`;
        this.ruleForm.codeuuid = res.data.result.codeuuid;
      });
    },
    changeCodeImg() {
      this.getcodeImg();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const resData = {
            userId: this.ruleForm.name,
            password: encryptRes(this.ruleForm.pass),
            loginMethod: 'pwd',
            encryType: 'RSA',
          };
          console.log(resData);
          $http
            .post('/sapi/sysuser/oauth/login', JSON.stringify(resData), {
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            })
            .then((res) => {
              this.$message(res.data.msg);
              if (res.status == 200) {
                document.cookie = `PHPSESSID=${res.data.result.token};path=/`;
                $http.get('/sapi/user/entuser/homelink').then((res) => {
                  if (res.status == 200) {
                    window.location.href = res.data.result;
                  }
                });
              }
            });
          //     $http.post(`/sapi/sysuser/oauth/login?userId=${this.ruleForm.name}&password=${encryptRes(this.ruleForm.pass)}&loginMethod=pwd&encryType=RSA`).then(res=>{
          //   console.log(res)
          // })
          // $http.post(
          //     `/zshse/loginApi/login?loginUserId=${resData.loginUserId}&password=${resData.password}&logincode=${resData.logincode}&codeuuid=${resData.codeuuid}`
          //   )
          //   .then((res) => {
          //     console.log(res);
          //     if (res.data.status == 200) {
          //       console.log(res);
          //       document.cookie = `PHPSESSID=${res.data.data.phpsessionId};path=/`;
          //       window.location.href =
          //         'http://www.zhonganhse.com:28000/user/workbench';
          //     } else {
          //       this.$message.error(res.data.data);
          //     }
          //   });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.yanzhengmabox {
  display: flex;

  img {
    margin-left: 20px;
    width: 100px;
    height: 40px;
    cursor: pointer;
  }
}

.zhichi {
  font-size: 12px;
  color: #9f9f9f;
  text-align: center;
  position: absolute;
  bottom: 4%;
  left: 50%;
  transform: translate(-50%, 0);
}

.submit {
  width: 100%;
}

.bg {
  width: 100vw;
  height: 100vh;
  background: url(../../plugins/img/loginBg.jpg) no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-size: cover;
  flex-direction: column;

  .topTitle {
    margin-top: 10vh;
    margin-bottom: 8vh;
    text-align: left;
    width: 70vw;

    img {
      height: 40px;
    }
  }

  .loginBox {
    width: 70vw;
    height: 64vh;

    border-radius: 20px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    overflow: hidden;

    .loginImg,
    .loginFrom {
      position: relative;
    }

    .loginImg {
      width: 55%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
      }
    }

    // .el-input {
    //   border-bottom: 1px solid #9f9f9f;
    // }
    // .el-input__inner {
    //   border: none;
    // }
    .loginFrom {
      width: 40%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;

      .frombox {
        background-color: #fff;
        padding: 20px;
        padding-bottom: 40px;
        width: 80%;
        border-radius: 10px;
        box-shadow: #1e8cc317 0px 0px 0px 20px;

        .erweima {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          img {
            width: 200px;
            height: 200px;
          }

          h2 {
            margin-top: 20px;
            font-size: 14px;
            color: #1a7daf;
          }
        }

        .bottomA {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;

          a {
            color: #1a7daf;

            span {
              color: rgb(112, 112, 112);
            }
          }
        }
      }

      .saoma {
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .saomaimgbox {
          height: 100%;
          position: relative;
          width: 170px;
          cursor: pointer;
          // &:hover::before {
          //   display: block;
          // }
          // &::before {
          //   content: '';
          //   display: none;
          //   width: 120px;
          //   height: 120px;
          //   background: url(../../plugins/img/ewm.jpg);
          //   background-size: 100% 100%;
          //   position: absolute;
          //   right: 0px;
          //   top: 20px;
          //   z-index: 100;
          // }
        }

        img {
          height: 100%;
        }
      }

      .from {
        width: 100%;
      }

      .title {
        img {
          width: 80px;
        }

        h1 {
          font-size: 1.6rem;
          margin-top: 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  .title {
    img {
      width: 60px !important;
    }

    h1 {
      font-size: 1.3rem !important;
      margin-top: 10px !important;
    }
  }
}

@media screen and (max-width: 750px) {
  .bg .loginBox .loginImg {
    display: none;
  }

  .bg .loginBox .loginFrom {
    width: 100%;
  }

  .bg .loginBox {
    width: 100%;
  }

  .bg .topTitle {
    width: 100%;
    text-align: center;
  }

  .bg .topTitle img {
    width: 80%;
    height: auto;
  }
}

.el-tabs__nav-wrap::after {
  height: 0px;
}

.el-tabs__item {
  font-size: 20px;
  color: rgb(156, 156, 156);
}

.jishuzhichi {
  text-align: center;
  margin-top: 6vh;

  p {
    font-size: 12px;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-bottom: 6px;

    span {
      margin-left: 10px;
    }
  }
}
</style>
