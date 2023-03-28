<template>
    <div>
        <BreadcrumbComponent main-page="Events" current-page="List" />
        <section class="content">
            <div class="row">

                <div class="col-12">
                    <div class="box">
                        <div class="box-header d-flex justify-content-between align-items-center">
                            <h4 class="box-title">Events</h4>
                            <div>
                                <NuxtLink to="/events/create"><el-button type="warning">Create</el-button></NuxtLink>
                            </div>
                        </div>
                        <div class="box-body">
                            <el-table :data="tableData" style="width: 100%" max-height="100%">
                                <el-table-column fixed prop="id" label="ID">
                                </el-table-column>
                                <el-table-column prop="name" width="250" label="Name">
                                </el-table-column>
                                <el-table-column label="Category" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.category==='madhava-seva'" size="medium" type="success">Madhava Seva</el-tag>
                                        <el-tag v-else size="medium" type="danger">Manava Seva</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Status" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.status===0" size="medium" type="success">Active</el-tag>
                                        <el-tag v-else size="medium" type="danger">Completed</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column  width="250" label="Start Date">
                                    <template slot-scope="scope">
                                        {{scope.row.sdate ? $dateFns.format(new Date(scope.row.sdate), 'dd-MMM-yyyy') : null}}
                                    </template>
                                </el-table-column>
                                <el-table-column  width="250" label="End Date">
                                    <template slot-scope="scope">
                                        {{scope.row.edate ? $dateFns.format(new Date(scope.row.edate), 'dd-MMM-yyyy') : null}}
                                    </template>
                                </el-table-column>
                                <el-table-column  width="250" label="CreatedAt">
                                    <template slot-scope="scope">
                                        {{$dateFns.format(new Date(scope.row.created_at), 'dd-MMM-yyyy hh:mm aa')}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="Operations" width="300">
                                    <template slot-scope="scope">
                                      <el-tooltip class="item" effect="dark" content="Edit Events" placement="top-start">
                                        <NuxtLink :to="`/events/edit/${scope.row.id}`"><el-button type="primary" icon="el-icon-edit" circle></el-button></NuxtLink>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Display Events" placement="top-start">
                                        <NuxtLink :to="`/events/display/${scope.row.id}`"><el-button type="info" icon="el-icon-view" circle></el-button></NuxtLink>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Events Images" placement="top-start">
                                        <NuxtLink :to="`/events/images/${scope.row.id}/list`"><el-button type="info" icon="el-icon-picture-outline" circle></el-button></NuxtLink>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Events Videos" placement="top-start">
                                        <NuxtLink :to="`/events/videos/${scope.row.id}/list`"><el-button type="info" icon="el-icon-video-camera" circle></el-button></NuxtLink>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Event Status" placement="top-start">
                                        <el-popconfirm
                                        confirm-button-text='OK'
                                        cancel-button-text='No, Thanks'
                                        icon="el-icon-info"
                                        icon-color="red"
                                        :title="scope.row.status===0 ? `Are you sure to complete this?` : `Are you sure to make this active?`"
                                        @confirm="statusRow(scope.row.id)"
                                        >
                                        <el-button
                                        slot="reference" type="warning" :icon="scope.row.status==0 ? 'el-icon-circle-close' : 'el-icon-circle-check'"  circle
                                        ></el-button>
                                        </el-popconfirm>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Delete Events" placement="top-start">
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
                                      </el-tooltip>

                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="box-footer text-center">
                            <pagination v-model="currentPage" :records="count" :per-page="9" @paginate="handlePaginationChnage"/>
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
                const response = await this.$privateApi.get('/api/event/paginate?page='+page); // eslint-disable-line
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
                const response = await this.$privateApi.delete('/api/event/delete/'+id);
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
                const response = await this.$privateApi.get('/api/event/status/'+id);
                this.handlePageChnage();
                this.$toast.success('Data updated successfully')
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
