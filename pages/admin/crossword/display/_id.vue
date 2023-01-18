<template>
    <div>
        <BreadcrumbComponent main-page="Crossword" current-page="Display" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Display Crossword</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Crossword Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="title">
                                        <div class="form-group">
                                            <label class="form-label">Title *</label>
                                            <el-input v-model="title" style="width: 100%;" :disabled="true" placeholder="Enter Title"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="ext:jpg,jpeg,png,webp" name="image">
                                        <div class="form-group">
                                            <label class="form-label">Image * <el-button type="text"><a :href="imageLink" target="_blank">( Download Image <i class="el-icon-download"></i> )</a></el-button></label>
                                            <input v-model="image" type="hidden" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="description">
                                        <div class="form-group">
                                            <label class="form-label">Description *</label>
                                            <el-input v-model="description" :rows="5" :disabled="true" type="textarea" style="width: 100%;" placeholder="Enter Description"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/admin/crossword/list"><button type="button" class="btn btn-primary-light me-1">
                                    Go Back
                                </button></NuxtLink>
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
            title: '',
            description: '',
            image: [],
            imageLink:'',
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
        formHandler() {
            return false;
        },
        async checkId(){
            const loading = this.$loading({
            lock: true,
            fullscreen: true,
            });
            if(!this.$route.params.id){
                this.$toast.error('Invalid ID')
                this.$router.push('/admin/crossword/list');
            }
            try {
                const response = await this.$privateApi.get('/api/crossword/display/'+this.$route.params.id); // eslint-disable-line
                this.title = response.data.data.title;
                this.imageLink = response.data.data.image;
                this.description = response.data.data.description;
            } catch (err) {
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                this.$router.push('/admin/crossword/list');
            } finally{
                loading.close()
            }
        },
        handleImageChnage(event){
            this.image = event.target.files[0];
        },
        handleFileChnage(event){
            this.file = event.target.files[0];
        },
    }
}
</script>
  