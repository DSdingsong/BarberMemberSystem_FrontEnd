<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" color="teal" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            会员总数
          </div>
          <count-to :start-val="0" :end-val="count.memberCount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="money" class-name="card-panel-icon" color="red" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总充值金额
          </div>
          <count-to :start-val="0" :end-val="count.memberAdd" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" color="blue" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总消费金额
          </div>
          <count-to :start-val="0" :end-val="count.memberSub" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon" color="yellow"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            非会员消费金额
          </div>
          <count-to :start-val="0" :end-val="count.nonmemberSub" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="today" class-name="card-panel-icon" color="blue" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日充值金额</div>
          <count-to :start-val="0" :end-val="count.memberAddDay" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="ic-yesterday" class-name="card-panel-icon"  color="blue"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">昨日充值金额</div>
          <count-to :start-val="0" :end-val="count.memberAddYesterday" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="seven" class-name="card-panel-icon"  color="blue"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本周充值金额</div>
          <count-to :start-val="0" :end-val="count.memberAddWeek" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="monthlyview" class-name="card-panel-icon"  color="blue"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月充值金额</div>
          <count-to :start-val="0" :end-val="count.memberAddMonth" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="today" class-name="card-panel-icon"  color="red"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日消费金额</div>
          <count-to :start-val="0" :end-val="count.memberSubDay" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="ic-yesterday" class-name="card-panel-icon"  color="red"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">昨日消费金额</div>
          <count-to :start-val="0" :end-val="count.memberSubYesterday" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="seven" class-name="card-panel-icon" color="red" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本周消费金额</div>
          <count-to :start-val="0" :end-val="count.memberSubWeek" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="monthlyview" class-name="card-panel-icon"  color="red"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月消费金额</div>
          <count-to :start-val="0" :end-val="count.memberSubMonth" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
import { gett } from '@/api/visits'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      count: {
        memberCount: 0, memberAdd: 0, memberSub: 0, nonmemberSub: 0,
        memberAddDay: 0, memberAddYesterday: 0, memberAddWeek: 0, memberAddMonth: 0,
        memberSubDay :0, memberSubYesterday:0, memberSubWeek:0, memberSubMonth:0
      }
    }
  },
  mounted() {
    gett().then(res => {
      this.count.memberCount = res.memberCount
      this.count.memberAdd = res.memberAdd
      this.count.memberSub = res.memberSub
      this.count.nonmemberSub = res.nonmemberSub
      this.count.memberAddDay = res.memberAddDay
      this.count.memberAddYesterday = res.memberAddYesterday
      this.count.memberAddWeek = res.memberAddWeek
      this.count.memberAddMonth = res.memberAddMonth
      this.count.memberSubDay = res.memberSubDay
      this.count.memberSubYesterday = res.memberSubYesterday
      this.count.memberSubWeek = res.memberSubWeek
      this.count.memberSubMonth = res.memberSubMonth


    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);



      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        fill: currentColor;
        float: none !important;
      }
    }
  }
</style>
