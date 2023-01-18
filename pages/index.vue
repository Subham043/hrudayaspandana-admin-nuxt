<template>
    <div class="content">
        <div class="row" style="margin-top:30px">
            <div class="col-lg-2 col-md-6 col-sm-12">
                <el-card :body-style="{ padding: '0px', width: '100%' }">
                    <div class="text-center" style="padding: 10px 14px;">
                        <i class="el-icon-user-solid" style="font-size:40px"></i>
                    </div>
                    <hr>
                    <div class="row justify-content-between align-items-center" style="padding: 5px 14px;">
                        <h6 class="col-sm-auto">Users</h6>
                        <h6 class="col-sm-auto">{{ user }}</h6>
                    </div>
                </el-card>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
                <el-card :body-style="{ padding: '0px', width: '100%' }">
                    <div class="text-center" style="padding: 10px 14px;">
                        <i class="el-icon-s-promotion" style="font-size:40px"></i>
                    </div>
                    <hr>
                    <div class="row justify-content-between align-items-center" style="padding: 5px 14px;">
                        <h6 class="col-sm-auto">Enquiries</h6>
                        <h6 class="col-sm-auto">{{ enquiry }}</h6>
                    </div>
                </el-card>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
                <el-card :body-style="{ padding: '0px', width: '100%' }">
                    <div class="text-center" style="padding: 10px 14px;">
                        <i class="el-icon-tickets" style="font-size:40px"></i>
                    </div>
                    <hr>
                    <div class="row justify-content-between align-items-center" style="padding: 5px 14px;">
                        <h6 class="col-sm-auto">Literature</h6>
                        <h6 class="col-sm-auto">{{ literature }}</h6>
                    </div>
                </el-card>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
                <el-card :body-style="{ padding: '0px', width: '100%' }">
                    <div class="text-center" style="padding: 10px 14px;">
                        <i class="el-icon-date" style="font-size:40px"></i>
                    </div>
                    <hr>
                    <div class="row justify-content-between align-items-center" style="padding: 5px 14px;">
                        <h6 class="col-sm-auto">Subscription</h6>
                        <h6 class="col-sm-auto">{{ subscription }}</h6>
                    </div>
                </el-card>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
                <el-card :body-style="{ padding: '0px', width: '100%' }">
                    <div class="text-center" style="padding: 10px 14px;">
                        <i class="el-icon-star-off" style="font-size:40px"></i>
                    </div>
                    <hr>
                    <div class="row justify-content-between align-items-center" style="padding: 5px 14px;">
                        <h6 class="col-sm-auto">Volunteers</h6>
                        <h6 class="col-sm-auto">{{ volunteer }}</h6>
                    </div>
                </el-card>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
                <el-card :body-style="{ padding: '0px', width: '100%' }">
                    <div class="text-center" style="padding: 10px 14px;">
                        <i class="el-icon-s-finance" style="font-size:40px"></i>
                    </div>
                    <hr>
                    <div class="row justify-content-between align-items-center" style="padding: 5px 14px;">
                        <h6 class="col-sm-auto">Donation</h6>
                        <h6 class="col-sm-auto">Rs. {{ donation }}</h6>
                    </div>
                </el-card>
            </div>
        </div>

        <div class="row" style="margin-top:50px">
            <div class="col-sm-12">
                <div class="text-center" style="margin-bottom:20px">
                    <hr/>
                    <h4>Donation Graph (Monthly)</h4>
                </div>
                <client-only>
                  <BarChart :data="chartData" />
                </client-only>
            </div>
        </div>
        
    </div>

</template>

<script>


export default {
    name: "IndexPage",
    layout: "AdminLayout",
    data() {
        return {
            labels: [],
            data: [],
            user: 0,
            donation: 0,
            enquiry: 0,
            literature: 0,
            subscription: 0,
            volunteer: 0,
        };
    },
    computed: {
        chartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        label: '',
                        data: this.data,
                        backgroundColor: 'rgba(20, 255, 0, 0.3)',
                        borderColor: 'rgba(100, 255, 0, 1)',
                        borderWidth: 2,
                    },
                ],
            }
        },
    },
    watch: {
        labels: function(val){
            this.labels = val
        },
        data: function(val){
            this.data = val
        },
    },
    mounted() {
        // eslint-disable-next-line nuxt/no-env-in-hooks
        if (process.client) {
            this.$scrollTo('#__nuxt', 0, { force: true })
        }
        this.getData()
    },
    methods: {
        async getData() {
            const loading = this.$loading({
                lock: true,
                fullscreen: true,
            });
            try {
                const response = await this.$privateApi.get('/api/dashboard'); // eslint-disable-line
                //  console.log(response.data); // eslint-disable-line
                this.user = response.data.data.user
                this.donation = response.data.data.donation
                this.enquiry = response.data.data.enquiry
                this.literature = response.data.data.literature
                this.subscription = response.data.data.subscription
                this.volunteer = response.data.data.volunteer
                this.labels = response.data.graph.months
                this.data = response.data.graph.amounts
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                if (err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if (err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)

            } finally {
                loading.close()
            }
        },
    }
}
</script>
