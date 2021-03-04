<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '余额修改'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="会员姓名">
        <el-input v-model="form.nickname" :disabled="true" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="修改余额">
        <el-radio v-model="form.ptype" :label="1">增加</el-radio>
        <el-radio v-model="form.ptype" :label="2">减少</el-radio>
      </el-form-item>
      <el-form-item label="本次消费">
        <el-input v-model="form.money" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="当前余额">
        <el-input v-model="form.nowMoney" :disabled="true" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="会员等级">
        <el-input-number v-model.number="form.level" :min="1" :max="6" controls-position="right" style="width: 145px;" />
      </el-form-item>
      <el-form-item label="会员折扣" prop="discount">
        <el-input-number v-model="form.discount" :disabled="true"  :precision="1" :step="0.1" :min="5" :max="10" controls-position="right" style="width: 145px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, editp } from '@/api/yxUser'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        uid: '',
        nickname: '',
        money: '',
        ptype: '2',
        level:'',

      },
      rules: {

      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      editp(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        uid: '',
        nickname: '',
        mark: '',
        phone: '',
        addTime: '',
        nowMoney: '',
        status: '',
        level: '',
        discount:'',
      }
    }
  }
}
</script>

<style scoped>

</style>
