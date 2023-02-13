<template>
    <div>
        <BreadcrumbComponent main-page="Videos" current-page="List" />
        <section class="content">
            <div class="row">

                <div class="col-12">
                    <div class="box">
                        <div class="box-header d-flex justify-content-between align-items-center">
                            <h4 class="box-title">Videos</h4>
                            <div>
                                <NuxtLink to="/gallery/videos/create"><el-button type="warning">Create</el-button></NuxtLink>
                            </div>
                        </div>
                        <div class="box-body">
                            <el-table :data="tableData" style="width: 100%" max-height="100%">
                                <el-table-column fixed prop="id" label="ID">
                                </el-table-column>
                                <el-table-column label="Category">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.category==='madhava-seva'" size="medium" type="success">Madhava Seva</el-tag>
                                        <el-tag v-else size="medium" type="danger">Manava Seva</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="video" width="350" label="Video">
                                </el-table-column>
                                <el-table-column  width="250" label="CreatedAt">
                                    <template slot-scope="scope">
                                        {{$dateFns.format(new Date(scope.row.created_at), 'dd-MMM-yyyy hh:mm aa')}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="Operations" width="200">
                                    <template slot-scope="scope">
                                      <el-tooltip class="item" effect="dark" content="Edit Videos" placement="top-start">
                                        <NuxtLink :to="`/gallery/videos/edit/${scope.row.id}`"><el-button type="primary" icon="el-icon-edit" circle></el-button></NuxtLink>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Display Videos" placement="top-start">
                                        <NuxtLink :to="`/gallery/videos/display/${scope.row.id}`"><el-button type="info" icon="el-icon-view" circle></el-button></NuxtLink>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Delete Videos" placement="top-start">
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
                const response = await this.$privateApi.get('/api/gallery-video/paginate?page='+page); // eslint-disable-line
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
                const response = await this.$privateApi.delete('/api/gallery-video/delete/'+id);
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
