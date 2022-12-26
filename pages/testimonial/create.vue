<template>
    <div>
        <BreadcrumbComponent main-page="Testimonial" current-page="Create" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Create Testimonial</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Testimonial Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="type">
                                        <div class="form-group">
                                            <label class="form-label">Testimonial Type *</label>
                                            <el-select v-model="type" placeholder="Select" style="width:100%">
                                                <el-option
                                                v-for="item in fileType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                <span style="float: left">{{ item.label }}</span>
                                                <span style="float: right; color: #8492a6; font-size: 13px"><i :class="item.icon"></i></span>
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div v-if="type===1" class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="word">
                                        <div class="form-group">
                                            <label class="form-label">Testimonial *</label>
                                            <el-input v-model="word" type="textarea" :rows="3" style="width: 100%;" placeholder="Enter Testimonial"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div v-else class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="video">
                                            <div class="form-group">
                                                <label class="form-label">Video Url *</label>
                                                <el-input v-model="video" style="width: 100%;" placeholder="Enter Video URL"></el-input>
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
                                <NuxtLink to="/testimonial/list"><button type="button" class="btn btn-primary-light me-1">
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
    name: "CreateContentPage",
    components: { BreadcrumbComponent },
    layout: "AdminLayout",
    data() {
        return {
            video:'',
            word:'',
            fileType: [{
                value: 2,
                label: 'VIDEO',
                icon: 'el-icon-video-camera'
                }, {
                value: 1,
                label: 'WORD',
                icon: 'el-icon-notebook-2'
            }],
            type: 1,
        }
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
                formData.append('type', this.type);
                if(this.type===1){
                    formData.append('testimonial', this.word);
                }else{
                    formData.append('testimonial', this.video);
                }
                const response = await this.$privateApi.post('/api/testimonial/create', formData); // eslint-disable-line
                this.$toast.success('Data created successfully')
                this.$router.push(this.$nuxt.context.from.path);
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                this.$refs.form.setErrors({
                    word: err?.response?.data?.errors?.testimonial,
                    video: err?.response?.data?.errors?.testimonial,
                    type: err?.response?.data?.errors?.type,
                });
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                
            }finally{
            loading.close()
            }
        },
    }
}
</script>
  