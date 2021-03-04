<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <!-- 新增 -->
      <el-button
        type="danger"
        class="filter-item"
        size="mini"
        icon="el-icon-refresh"
        @click="toQuery"
      >刷新</el-button>
      <el-button
        v-permission="['admin','YXUSER_ALL','YXUSER_ALL_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >新增</el-button>
      <el-button
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="downloadMethod"
      >导出</el-button>

    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd" />

    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="big" style="width: 100%;">
      <el-table-column prop="nickname" label="会员姓名" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="nowMoney" label="会员余额" />
      <el-table-column prop="level" label="会员等级" />
      <el-table-column prop="discount" label="会员折扣" />
      <el-table-column prop="mark" label="会员备注" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期" width="180px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/crud'
import { del, onStatus } from '@/api/yxUser'
import eForm from './form'
import { parseTime } from '@/utils/index'

export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      queryTypeOptions: [
        { key: 'nickname', display_name: '会员姓名' },
        { key: 'phone', display_name: '手机号码' }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/yxUser'
      const sort = 'uid,desc'
      this.params = { page: this.page, size: this.size, sort: sort, isPromoter: 1 }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(uid) {
      this.delLoading = true
      del(uid).then(res => {
        this.delLoading = false
        this.$refs[uid].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[uid].doClose()
        console.log(err.response.data.message)
      })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.form = {
        uid: data.uid,
        nickname: data.nickname,
        mark: data.mark,
        phone: data.phone,
        addTime: data.addTime,
        nowMoney: data.nowMoney,
        status: data.status,
        level: data.level,
        discount: data.discount
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
