<template>
    <div>
        <BreadcrumbComponent main-page="E-Hundi" current-page="Edit" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Edit E-Hundi</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> User Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="first_name">
                                        <div class="form-group">
                                            <label class="form-label">First Name *</label>
                                            <el-input v-model="first_name" style="width: 100%;" placeholder="Enter First Name"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="last_name">
                                        <div class="form-group">
                                            <label class="form-label">Last Name *</label>
                                            <el-input v-model="last_name" style="width: 100%;" placeholder="Enter Last Name"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required|email" name="email">
                                        <div class="form-group">
                                            <label class="form-label">E-mail</label>
                                            <el-input v-model="email" type="email" style="width: 100%;" placeholder="Enter Email"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="phone" name="phone">
                                        <div class="form-group">
                                            <label class="form-label">Phone Number</label>
                                            <el-input v-model="phone" style="width: 100%;" placeholder="Enter Phone"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="city">
                                        <div class="form-group">
                                            <label class="form-label">City *</label>
                                            <el-input v-model="city" style="width: 100%;" placeholder="Enter City"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="state">
                                        <div class="form-group">
                                            <label class="form-label">State *</label>
                                            <el-input v-model="state" style="width: 100%;" placeholder="Enter State"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="amount">
                                        <div class="form-group">
                                            <label class="form-label">Amount *</label>
                                            <el-input v-model="amount" style="width: 100%;" placeholder="Enter Amount"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="trust">
                                        <div class="form-group">
                                            <label class="form-label">Trust *</label>
                                            <el-select v-model="trust" placeholder="Select a trust" style="width:100%">
                                                <el-option
                                                v-for="item in TrustType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                <span style="float: left">{{ item.label }}</span>
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div v-if="trust===1" class="col-md-3">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="pan">
                                        <div class="form-group">
                                            <label class="form-label">Pan No. *</label>
                                            <el-input v-model="pan" style="width: 100%;" placeholder="Enter Pan No."></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/e-hundi/list"><button type="button" class="btn btn-primary-light me-1">
                                    <i class="el-icon-close"></i> Cancel
                                </button></NuxtLink>
                                <button type="submit" class="btn btn-primary">
                                    <i class="el-icon-folder-add"></i> Save
                                </button>
                            </div>
                        </form>
                        </ValidationObserver>
                    </div>
                    <!-- /.box -->
                </div>
            </div>
            <!-- /.row -->

        </section>
    </div>
</template>
  
<script>
import BreadcrumbComponent from '~/components/BreadcrumbComponent.vue';
export default {
    name: "EditContentPage",
    components: { BreadcrumbComponent },
    layout: "AdminLayout",
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            amount: '',
            pan: '',
            TrustType: [{
                value: 1,
                label: 'Sai Mayee Trust',
                }, {
                value: 2,
                label: 'Sri Sai Meru Mathi Trust',
            }],
            trust: 1,
        }
    },
    beforeMount(){
        this.checkId();
    },
    mounted() {
        // eslint-disable-next-line nuxt/no-env-in-hooks
        if(process.client){
            this.$scrollTo('#__nuxt', 0, {force: true})
        }
    },
    methods: {
        async formHandler() {
            const loading = this.$loading({
            lock: true,
            fullscreen: true,
            });
            try {
                const formData = new FormData;
                formData.append('first_name', this.first_name);
                formData.append('last_name', this.last_name);
                formData.append('email', this.email);
                formData.append('phone', this.phone);
                formData.append('city', this.city);
                formData.append('state', this.state);
                formData.append('amount', this.amount);
                formData.append('trust', this.trust);
                formData.append('pan', this.pan);
                const response = await this.$privateApi.post('/api/e-hundi/edit/'+this.$route.params.id, formData); // eslint-disable-line
                this.$toast.success('Data updated successfully')
                this.$router.push(this.$nuxt.context.from.path);
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                this.$refs.form.setErrors({
                    first_name: err?.response?.data?.errors?.first_name,
                    last_name: err?.response?.data?.errors?.last_name,
                    email: err?.response?.data?.errors?.email,
                    phone: err?.response?.data?.errors?.phone,
                    amount: err?.response?.data?.errors?.amount,
                    city: err?.response?.data?.errors?.city,
                    state: err?.response?.data?.errors?.state,
                    trust: err?.response?.data?.errors?.trust,
                    pan: err?.response?.data?.errors?.pan,
                });
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                
            }finally{
            loading.close()
            }
        },
        async checkId(){
            const loading = this.$loading({
            lock: true,
            fullscreen: true,
            });
            if(!this.$route.params.id){
                this.$toast.error('Invalid ID')
                this.$router.push('/e-hundi/list');
            }
            try {
                const response = await this.$privateApi.get('/api/e-hundi/display/'+this.$route.params.id); // eslint-disable-line
                this.first_name = response.data.data.first_name;
                this.last_name = response.data.data.last_name;
                this.email = response.data.data.email;
                this.phone = response.data.data.phone;
                this.city = response.data.data.city;
                this.state = response.data.data.state;
                this.trust = response.data.data.trust;
                this.amount = response.data.data.amount;
                this.pan = response.data.data.pan;
            } catch (err) {
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                this.$router.push('/e-hundi/list');
            } finally{
                loading.close()
            }
        },
    }
}
</script>
  