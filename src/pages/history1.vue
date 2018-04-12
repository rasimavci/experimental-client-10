      <template>
  <div class="page">

    <div class="navbar">
      <div class="navbar-inner">
        <div class="nav-left">
          <i class="icon material-icons md-only" @click='openLeftPanel()'>dehaze</i>
          </f7-link>

        </div>
        <div class="title">History</div>
        <div class="right">
          <i class="icon material-icons md-only">dehaze</i>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import moment from 'moment'
import _ from 'lodash'

export default {
  /*  ...mapState({
      // historyFilterSelection: state => state.historyFilterSelection
    }),

    created: function() {
      // this.$store.dispatch('updateCurrentPage', 'history')
      // this.$store.dispatch('updateShowPlacement', 'right')
    },
    components: {
    },
    data() {
      return {
        callee: '',
        activeCallRinging: false,
        activeCallExist: false,
        show: 'All Call',
        show2: false,
        show3: false,
        show4: false,
        show5: false
      }
    },
    methods: {
      goCall(logrecord) {
        console.log('go call page for ' + logrecord.callerDisplayNumber)
        const params = {
          callee: 'saynaci@genband.com',
          mode: false
        }
        this.$store.dispatch('call', params)
        // this.$router.push('call')
      }
    },
    computed: {
      getCallLogs() {
        // if (this.$store.state.historyFilterSelection === 'All Call') {
        console.log(this.$store.state.history)
        return this.$store.state.history
        // } else if (this.$store.state.historyFilterSelection === 'Incoming Call') {
        //   return this.$store.state.history.filter(note => note.direction === 'incoming')
        // } else if (this.$store.state.historyFilterSelection === 'Outgoing Call') {
        //   return this.$store.state.history.filter(note => note.direction === 'outgoing')
        // } else if (this.$store.state.historyFilterSelection === 'Missed Call') {
        //   return this.$store.state.history.filter(note => note.direction === 'missed')
        // }
      },
      groupedLogs() {
        let history = this.getCallLogs // this.$store.state.vux.history
        history.forEach(log => {
          log.date1 = moment(parseInt(log.startTime)).format('h:mm:ss a')
          log.date = moment(parseInt(log.startTime)).format('MMMM Do YYYY')
        })
        return _.groupBy(history, 'date')
      }
    }*/
}

 // span {{call.callerDisplayNumber}}
 // span {{moment(parseInt(call.startTime)).format('MMMM Do YYYY, h:mm:ss a')}}
 // span {{call.direction}}
</script>
