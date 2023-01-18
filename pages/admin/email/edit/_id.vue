<template>
    <div>
        <BreadcrumbComponent main-page="Email" current-page="Edit" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Edit Email</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Email Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="subject">
                                        <div class="form-group">
                                            <label class="form-label">Subject *</label>
                                            <el-input v-model="subject" style="width: 100%;" placeholder="Enter Subject"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="message">
                                        <div class="form-group">
                                            <label class="form-label">Message *</label>
                                            <VueEditor v-model="message" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="attachment">
                                        <div class="form-group">
                                            <label class="form-label">Attachment</label>
                                            <el-switch
                                                v-model="attachment"
                                                style="display: block"
                                                active-color="#13ce66"
                                                inactive-color="#ff4949"
                                                active-text="Yes"
                                                inactive-text="No">
                                            </el-switch>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div v-if="attachment" class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="ext:jpg,jpeg,webp,png,pdf" name="file">
                                        <div class="form-group">
                                            <label class="form-label">File * <el-button type="text"><a :href="imageLink" target="_blank">( Download File <i class="el-icon-download"></i> )</a></el-button></label>
                                            <input v-model="image" type="hidden" />
                                            <input class="form-control" type="file" @change="handleFileChnage" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/admin/email/list"><button type="button" class="btn btn-primary-light me-1">
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
            subject: '',
            message: '',
            image: [],
            attachment: false,
            customToolbar: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike"], // toggled buttons
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                ["link"],
                ["clean"] // remove formatting button
            ],
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
        async formHandler() {
            const loading = this.$loading({
            lock: true,
            fullscreen: true,
            });
            try {
                const formData = new FormData;
                formData.append('subject', this.subject);
                formData.append('message', this.message);
                formData.append('attachment', this.attachment === true ? 1 : 0);
                if(this.attachment){
                    formData.append('image', this.image);
                }
                const response = await this.$privateApi.post('/api/email/edit/'+this.$route.params.id, formData); // eslint-disable-line
                this.$toast.success('Data updated successfully')
                this.$router.push(this.$nuxt.context.from.path);
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                this.$refs.form.setErrors({
                    subject: err?.response?.data?.errors?.subject,
                    attachment: err?.response?.data?.errors?.attachment,
                    image: err?.response?.data?.errors?.image,
                    message: err?.response?.data?.errors?.message,
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
                this.$router.push('/admin/email/list');
            }
            try {
                const response = await this.$privateApi.get('/api/email/display/'+this.$route.params.id); // eslint-disable-line
                this.subject = response.data.data.subject;
                this.message = response.data.data.message;
                this.attachment = response.data.data.attachment;
                if(this.attachment){
                    this.imageLink = response.data.data.image;
                }
            } catch (err) {
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                this.$router.push('/admin/email/list');
            } finally{
                loading.close()
            }
        },
        handleFileChnage(event){
            this.image = event.target.files[0];
        },
    }
}
</script>
  