<template>
    <div>
        <BreadcrumbComponent main-page="Audios" current-page="Edit" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Edit Audios</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Audios Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="title">
                                        <div class="form-group">
                                            <label class="form-label">Title *</label>
                                            <el-input v-model="title" style="width: 100%;" placeholder="Enter Title"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="type">
                                        <div class="form-group">
                                            <label class="form-label">Category *</label>
                                            <el-select v-model="type" placeholder="Select" style="width:100%">
                                                <el-option
                                                v-for="item in fileType"
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
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="ext:wav,mp3,aac" name="audio">
                                        <div class="form-group">
                                            <label class="form-label">Audio * <el-button type="text"><a :href="imageLink" target="_blank">( Download Audio <i class="el-icon-download"></i> )</a></el-button></label>
                                            <input v-model="image" type="hidden" />
                                            <input class="form-control" type="file" @change="handleImageChnage" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="description">
                                        <div class="form-group">
                                            <label class="form-label">Description *</label>
                                            <el-input v-model="description" type="textarea" :rows="3" style="width: 100%;" placeholder="Enter Description"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/admin/gallery/audios/list"><button type="button" class="btn btn-primary-light me-1">
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
            image: [],
            title:'',
            description:'',
            fileType: [{
                value: 'madhava-seva',
                label: 'MADHAVA SEVA',
                icon: 'el-icon-video-camera'
                }, {
                value: 'manava-seva',
                label: 'MANAVA SEVA',
                icon: 'el-icon-notebook-2'
            }],
            type: 'madhava-seva',
            imageLink:''
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
                formData.append('category', this.type);
                formData.append('audio', this.image);
                formData.append('title', this.title);
                formData.append('description', this.description);
                const response = await this.$privateApi.post('/api/gallery-audio/edit/'+this.$route.params.id, formData); // eslint-disable-line
                this.$toast.success('Data updated successfully')
                this.$router.push(this.$nuxt.context.from.path);
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                this.$refs.form.setErrors({
                    image: err?.response?.data?.errors?.audio,
                    title: err?.response?.data?.errors?.title,
                    description: err?.response?.data?.errors?.description,
                    type: err?.response?.data?.errors?.category,
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
                this.$router.push('/admin/gallery/audios/list');
            }
            try {
                const response = await this.$privateApi.get('/api/gallery-audio/display/'+this.$route.params.id); // eslint-disable-line
                this.type = response.data.data.category;
                this.imageLink = response.data.data.audio;
                this.title = response.data.data.title;
                this.description = response.data.data.description;
            } catch (err) {
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                this.$router.push('/admin/gallery/audios/list');
            } finally{
                loading.close()
            }
        },
        handleImageChnage(event){
            this.image = event.target.files[0];
        },
    }
}
</script>
  