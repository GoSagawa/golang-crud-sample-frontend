<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <div class="col-md-8">

          <!-- メッセージ一覧 -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">メッセージ一覧</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

              <a href="javascript:void(0)" v-on:click="get_item_list" class="btn btn-sm btn-primary pull-right">最新の情報に更新</a><br />
              <br />

              <div class="table-responsive">
                <table class="table no-margin">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>メッセージ</th>
                    <th>アクション</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="post in post_list" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.message }}</td>
                    <td>
                    <a v-on:click="set_update_view(post)" class="btn btn-sm btn-info btn-flat">更新</a>
                    <a v-on:click="delete_item(post)" class="btn btn-sm btn-danger btn-flat">削除</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->

        </div>

        <!--/.col (left) -->
        <!-- right column -->
        <div class="col-md-4">

          <!-- 新規登録 -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">新規登録</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">

              <div class="box-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">名前</label>
                  <input v-model="insert_data.name" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">メッセージ</label>
                  <input v-model="insert_data.message" class="form-control" placeholder="">
                </div>
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button v-on:click="create_item" class="btn btn-primary">登録</button>
              </div>
            </form>
          </div>
          <!-- /.box -->

          <!-- 更新 -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">更新</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form">

              <div class="box-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">ID</label>
                  <input v-model="update_data.id" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">名前</label>
                  <input v-model="update_data.name" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">メッセージ</label>
                  <input v-model="update_data.message" class="form-control" placeholder="">
                </div>
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button v-on:click="update_item" class="btn btn-primary">更新</button>
              </div>
            </form>
          </div>
          <!-- /.box -->

        </div>
        <!--/.col (right) -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'Index',
  data () {
    return {
      post_list: [],
      insert_data: {
        name : '',
        message : ''
      },
      update_data: {
        id : '',
        name : '',
        message : ''
      }
    }
  },
  mounted: function () {
    this.get_item_list()
  },
  methods: {
    create_item: function () {
      this.post_list.push(this.insert_data)
      var parent = this
      axios.post('http://127.0.0.1:3000/create', this.insert_data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function (response) {
          parent.get_item_list()
        })
        .catch(function (error) {
          alert(error)
        })
    },
    get_item_list: function () {
      var postList = this.post_list
      axios.get('http://127.0.0.1:3000/get_list')
        .then(function (response) {
          response.data.forEach(function (val, i) {
            Vue.set(postList, i, val)
          })
        })
        .catch(function (error) {
          alert(error)
        })
    },
    set_update_view: function (post) {
      this.update_data.id = post.id
      this.update_data.name = post.name
      this.update_data.message = post.message
    },
    update_item: function () {
      var parent = this
      axios.post('http://127.0.0.1:3000/update', this.update_data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function (response) {
          parent.get_item_list()
        })
        .catch(function (error) {
          alert(error)
        })
    },
    delete_item: function (post) {
      var parent = this
      axios.post('http://127.0.0.1:3000/delete', post, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function (response) {
          parent.post_list.splice({id: post.id})
          parent.get_item_list()
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
