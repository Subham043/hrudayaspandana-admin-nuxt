<template>
    <div>
        <BreadcrumbComponent main-page="Literature" current-page="Create" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Create Literature</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Book Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="name">
                                        <div class="form-group">
                                            <label class="form-label">Name *</label>
                                            <el-input v-model="name" style="width: 100%;" placeholder="Enter Name"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required|ext:jpg,jpeg,png,webp" name="image">
                                        <div class="form-group">
                                            <label class="form-label">Image *</label>
                                            <input v-model="image" type="hidden" />
                                            <input class="form-control" type="file" @change="handleImageChnage" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="is_pdf">
                                        <div class="form-group">
                                            <label class="form-label">Is PDF?</label>
                                            <el-switch
                                                v-model="is_pdf"
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
                                    <div v-if="is_pdf" class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required|ext:pdf" name="file">
                                        <div class="form-group">
                                            <label class="form-label">File *</label>
                                            <input v-model="file" type="hidden" />
                                            <input class="form-control" type="file" @change="handleFileChnage" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div v-else class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="Book Url">
                                            <div class="form-group">
                                                <label class="form-label">Book Url *</label>
                                                <el-input v-model="url" style="width: 100%;" placeholder="Enter Book URL"></el-input>
                                            </div>
                                            <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/literature/list"><button type="button" class="btn btn-primary-light me-1">
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
            name: '',
            url: '',
            image: [],
            file: [],
            is_pdf: false,
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
                formData.append('name', this.name);
                formData.append('is_pdf', this.is_pdf === true ? 1 : 0);
                formData.append('image', this.image);
                if(this.is_pdf){
                    formData.append('file', this.file);
                }else{
                    formData.append('file', this.url);
                }
                const response = await this.$privateApi.post('/api/literature/create', formData); // eslint-disable-line
                this.$toast.success('Data created successfully')
                this.$router.push(this.$nuxt.context.from.path);
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                this.$refs.form.setErrors({
                    name: err?.response?.data?.errors?.name,
                    is_pdf: err?.response?.data?.errors?.is_pdf,
                    image: err?.response?.data?.errors?.image,
                    file: err?.response?.data?.errors?.file,
                    url: err?.response?.data?.errors?.file,
                });
                if(err?.response?.data?.message) this.$toast.error(err?.response?.data?.message)
                if(err?.response?.data?.error) this.$toast.error(err?.response?.data?.error)
                
            }finally{
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
  