
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
      <el-button
        type="danger"
        class="filter-item"
        size="mini"
        icon="el-icon-refresh"
        @click="toQuery"
      >刷新</el-button>
      <el-button
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        style="float: right"
        type="warning"
        icon="el-icon-download"
        @click="downloadMethod"
      >导出</el-button>
    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd" />
    <pForm ref="formp" :is-add="isAdd" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" @selection-change="selsChange" style="width: 100%;">
<!--      <el-table-column type="selection" width="55" />-->
      <el-table-column prop="nickname" label="会员姓名" />
      <el-table-column prop="phone" label="会员手机号" />
      <el-table-column prop="title" label="会员消费明细" />
      <el-table-column prop="number" label="折扣后明细">
        <template slot-scope="scope">
          <span v-if="scope.row.pm == 1">+</span>
          <span v-else>-</span>
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pm" label="消费明细种类">
        <template slot-scope="scope">
          <span v-if="scope.row.pm == '1'">充值</span>
          <span v-else-if="scope.row.pm == '0'">消费</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="当前剩余" />
      <el-table-column prop="mark" label="会员备注" />
      <el-table-column :show-overflow-tooltip="true" prop="addTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.addTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="详细创建日期" width="180px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['admin','YXUSERBILL_ALL','YXUSERBILL_DELETE'])" label="操作" width="110" align="center" fixed="right">
        <template slot-scope="scope">
          <el-popover
            v-permission="['admin','YXUSERBILL_ALL','YXUSERBILL_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="150">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
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
  import crud from '@/mixins/crud'

  import { del } from '@/api/yxUserBill'
  import eForm from './form'
  import pForm from './formp'
  import { formatTime } from '@/utils/index'
  import { parseTime } from '@/utils/index'

  export default {
    components: { eForm, pForm },
    mixins: [initData,crud],
    data() {
      return {
        // selections: [],//选中的值显示
        delLoading: false, nickname: '', phone: '',
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
      formatTime,
      parseTime,
      checkPermission,
      beforeInit() {
        this.url = 'api/yxUserBill'
        const sort = 'id,desc'
        this.params = {
          page: this.page,
          size: this.size,
          nickname: this.nickname,
          phone: this.phone,
        }
        const query = this.query
        const type = query.type
        const value = query.value
        if (type && value) { this.params[type] = value }
        return true
      },
      subDelete(id) {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.dleChangePage()
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          this.$refs[id].doClose()
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
          id: data.id,
          uid: data.uid,
          nickname: data.nickname,
          mark: data.mark,
          phone: data.phone,
          addTime: data.addTime,
          nowMoney: data.nowMoney,
          status: data.status,
          level: data.level
        }
        _this.dialog = true
      },
      editP(data) {
        this.isAdd = false
        const _this = this.$refs.formp
        _this.form = {
          uid: data.uid,
          nickname: data.nickname,
          ptype: 1,
          money: 0
        }
        _this.dialog = true
      }
    }
  }
</script>

<style scoped>

</style>
