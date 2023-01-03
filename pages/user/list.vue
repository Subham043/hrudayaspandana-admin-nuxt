<template>
    <div>
        <BreadcrumbComponent main-page="User" current-page="List" />
        <section class="content">
            <div class="row">

                <div class="col-12">
                    <div class="box">
                        <div class="box-header d-flex justify-content-between align-items-center">
                            <h4 class="box-title">User</h4>
                            <div>
                                <el-button type="primary" @click="downloadExcel">Excel</el-button>
                            </div>
                        </div>
                        <div class="box-body">
                            <el-table :data="tableData" style="width: 100%" max-height="100%">
                                <!-- <el-table-column fixed prop="id" label="ID" width="150">
                                </el-table-column> -->
                                <el-table-column prop="first_name" label="First Name" width="250">
                                </el-table-column>
                                <el-table-column prop="last_name" label="Last Name" width="250">
                                </el-table-column>
                                <el-table-column prop="email" label="Email" width="250">
                                </el-table-column>
                                <el-table-column prop="phone" label="Phone" width="250">
                                </el-table-column>
                                <el-table-column label="CreatedAt" width="250">
                                    <template slot-scope="scope">
                                        {{$dateFns.format(new Date(scope.row.created_at), 'dd-MMM-yyyy hh:mm aa')}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="Status" width="200">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.status===0" size="medium" type="warning">Verification Pending</el-tag>
                                        <el-tag v-if="scope.row.status===1" size="medium" type="success">Active</el-tag>
                                        <el-tag v-if="scope.row.status===2" size="medium" type="danger">Blocked</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Type" width="200">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.userType===1" size="medium" type="success">Admin</el-tag>
                                        <el-tag v-if="scope.row.userType===2" size="medium" type="danger">User</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="Operations" width="180">
                                    <template slot-scope="scope">
                                        <NuxtLink v-if="scope.row.status!=0" :to="`/user/password/${scope.row.id}`"><el-button type="primary" icon="el-icon-key" circle></el-button></NuxtLink>
                                        <el-popconfirm
                                        confirm-button-text='OK'
                                        cancel-button-text='No, Thanks'
                                        icon="el-icon-info"
                                        icon-color="red"
                                        :title="scope.row.status===1 ? `Are you sure to block this?` : `Are you sure to unblock this?`"
                                        @confirm="statusRow(scope.row.id)"
                                        >
                                        <el-button
                                        v-if="scope.row.status!=0" slot="reference" type="warning" icon="el-icon-warning"  circle
                                        ></el-button>
                                        </el-popconfirm>

                                        <el-popconfirm
                                        confirm-button-text='OK'
                                        cancel-button-text='No, Thanks'
                                        icon="el-icon-info"
                                        icon-color="red"
                                        title="Are you sure to delete this?"
                                        @confirm="deleteRow(scope.row.id)"
                                        >
                                        <el-button
                                        slot="reference" type="danger" icon="el-icon-delete"  circle
                                        ></el-button>
                                        </el-popconfirm>
                                        
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="box-footer text-center">
                            <pagination v-model="currentPage" :records="count" :per-page="10" @paginate="handlePaginationChnage"/>
                        </div>
                    </div>
                </div>

                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
    </div>
</template>
  
<script>
import BreadcrumbComponent from '~/components/BreadcrumbComponent.vue';
export default {
    name: "ListContentPage",
    components: { BreadcrumbComponent },
    layout: "AdminLayout",
    data() {
        return {
            count:1,
            tableData: [],
            currentPage: 1
        }
    },
    watch: {
        $route(to, from) {
            this.handlePageChnage();
        }
    },
    mounted(){
        // eslint-disable-next-line nuxt/no-env-in-hooks
      if(process.client){
          this.$scrollTo('#__nuxt', 0, {force: true})
      }
        this.handlePageChnage();
    },
    methods: {
        async getTableData(page=0) {
            const loading = this.$loading({
                lock: true,
                fullscreen: true,
            });
            try {
                const response = await this.$privateApi.get('/api/user/paginate?page='+page); // eslint-disable-line
                this.tableData = response?.data?.data
                this.count = response?.data?.meta?.total
                this.currentPage = this.$route.query.page ? Number(this.$route.query.page) : 1;
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                if (err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if (err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)

            } finally {
                loading.close()
            }
        },
        async deleteRow(id){
            const loading = this.$loading({
                lock: true,
                fullscreen: true,
            });
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await this.$privateApi.delete('/api/user/delete/'+id);
                const newTableData = this.tableData.filter((item)=>{
                    return item.id!==id;
                })
                this.tableData = newTableData;
                this.$toast.success('Data deleted successfully')
            } catch (err) {
                if (err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if (err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
            } finally {
                loading.close()
            }
        },
        async statusRow(id){
            const loading = this.$loading({
                lock: true,
                fullscreen: true,
            });
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await this.$privateApi.get('/api/user/status/'+id);
                this.handlePageChnage();
                this.$toast.success('Data updated successfully')
            } catch (err) {
                if (err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if (err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
            } finally {
                loading.close()
            }
        },
        async downloadExcel(){
            const loading = this.$loading({
                lock: true,
                fullscreen: true,
            });
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await this.$privateApi.get('/api/user/excel',{responseType: 'arraybuffer'});
                console.log(response.data);
                const blob = new Blob([response.data])
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'user.xlsx')
                document.body.appendChild(link)
                link.click()
            } catch (err) {
                if (err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if (err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
            } finally {
                loading.close()
            }
        },
        handlePaginationChnage(page){
            this.$router.push({query:{page}});
        },
        handlePageChnage(){
            this.currentPage = this.$route.query.page ? Number(this.$route.query.page) : 1;
            this.getTableData(this.$route.query.page ? Number(this.$route.query.page) : 1);
            // console.log(this.currentPage);
        }
    }
}
</script>
  