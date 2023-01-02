<template>
    <div>
        <BreadcrumbComponent main-page="Video" current-page="Display" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Display Video</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Video Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="video">
                                            <div class="form-group">
                                                <label class="form-label">Video Url *</label>
                                                <el-input v-model="video" :disabled="true" style="width: 100%;" placeholder="Enter Video URL"></el-input>
                                            </div>
                                            <div class="form-text">
                                                <code>youtube url format : </code>https://www.youtube.com/embed/3QPp_DlcZpM
                                            </div>
                                            <div class="form-text">
                                                <code>vimeo url format : </code>https://player.vimeo.com/video/291685166
                                            </div>
                                            <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink :to="`/events/videos/${$route.params.event}/list`"><button type="button" class="btn btn-primary-light me-1">
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
            video:'',
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
                this.$router.push('/events/list');
            }
            try {
                const response = await this.$privateApi.get('/api/event/gallery/video/'+this.$route.params.event+'/display/'+this.$route.params.id); // eslint-disable-line
                this.video = response.data.data.video;
            } catch (err) {
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                this.$router.push('/events/list');
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
  