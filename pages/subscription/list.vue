<template>
    <div>
        <BreadcrumbComponent main-page="Subscription" current-page="List" />
        <section class="content">
            <div class="row">

                <div class="col-12">
                    <div class="box">
                        <div class="box-header d-flex justify-content-between align-items-center">
                            <h4 class="box-title">Subscription</h4>
                            <NuxtLink to="/subscription/create"><el-button type="warning">Create</el-button></NuxtLink>
                        </div>
                        <div class="box-body">
                            <el-table :data="tableData" style="width: 100%" max-height="100%">
                                <el-table-column fixed prop="id" label="ID" width="150">
                                </el-table-column>
                                <el-table-column prop="name" label="Name" width="250">
                                </el-table-column>
                                <el-table-column prop="email" label="Email" width="250">
                                </el-table-column>
                                <el-table-column prop="phone" label="Phone" width="250">
                                </el-table-column>
                                <el-table-column label="E-Book" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.ebook" size="medium" type="success">Interested</el-tag>
                                        <el-tag v-else size="medium" type="danger">Not Interested</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Event" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.event" size="medium" type="success">Interested</el-tag>
                                        <el-tag v-else size="medium" type="danger">Not Interested</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Blog" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.blog" size="medium" type="success">Interested</el-tag>
                                        <el-tag v-else size="medium" type="danger">Not Interested</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Newsletter" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.newsletter" size="medium" type="success">Interested</el-tag>
                                        <el-tag v-else size="medium" type="danger">Not Interested</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Crossword" width="250">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.crossword" size="medium" type="success">Interested</el-tag>
                                        <el-tag v-else size="medium" type="danger">Not Interested</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="CreatedAt" width="250">
                                    <template slot-scope="scope">
                                        {{$dateFns.format(new Date(scope.row.created_at), 'dd-MMM-yyyy hh:mm aa')}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="Operations" width="200">
                                    <template slot-scope="scope">
                                        <NuxtLink :to="`/subscription/edit/${scope.row.id}`"><el-button type="primary" icon="el-icon-edit" circle></el-button></NuxtLink>
                                        <NuxtLink :to="`/subscription/display/${scope.row.id}`"><el-button type="info" icon="el-icon-view" circle></el-button></NuxtLink>
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
                const response = await this.$privateApi.get('/api/subscription/paginate?page='+page); // eslint-disable-line
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
                const response = await this.$privateApi.delete('/api/subscription/delete/'+id);
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
  