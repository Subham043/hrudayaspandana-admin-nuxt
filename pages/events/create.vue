<template>
    <div>
        <BreadcrumbComponent main-page="Event" current-page="Create" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Create Event</h4>
                        </div>
                        <!-- /.box-header -->
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form class="form" method="post" @submit.prevent="handleSubmit(formHandler)">
                            <div class="box-body">
                                <h4 class="box-title text-primary mb-0"><i class="el-icon-user"></i> Event Info</h4>
                                <hr class="my-15">
                                <div class="row">
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="name">
                                        <div class="form-group">
                                            <label class="form-label">Name *</label>
                                            <el-input v-model="name" style="width: 100%;" placeholder="Enter Name"></el-input>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="start date">
                                        <div class="form-group">
                                            <label class="form-label">Start Date *</label>
                                            <el-date-picker
                                                v-model="sdate"
                                                type="date"
                                                style="width: 100%;"
                                                placeholder="Pick start date">
                                            </el-date-picker>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="" name="end date">
                                        <div class="form-group">
                                            <label class="form-label">End Date</label>
                                            <el-date-picker
                                                v-model="edate"
                                                type="date"
                                                style="width: 100%;"
                                                placeholder="Pick end date">
                                            </el-date-picker>
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
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="status">
                                        <div class="form-group">
                                            <label class="form-label">Status *</label>
                                            <el-select v-model="status" placeholder="Select" style="width:100%">
                                                <el-option
                                                v-for="item in statusType"
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
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required|ext:jpg,jpeg,png,webp|dimensions:800,500" name="image">
                                        <div class="form-group">
                                            <label class="form-label">Image (800 x 500) *</label>
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
                                            <VueEditor v-model="description1" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="" name="description">
                                        <div class="form-group">
                                            <label class="form-label">Description (optional)</label>
                                            <VueEditor v-model="description2" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="" name="description">
                                        <div class="form-group">
                                            <label class="form-label">Description (optional)</label>
                                            <VueEditor v-model="description3" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>

                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/events/list"><button type="button" class="btn btn-primary-light me-1">
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
            image: [],
            name:'',
            sdate:'',
            edate:'',
            description1:'',
            description2:'',
            description3:'',
            fileType: [{
                value: 'madhava-seva',
                label: 'MADHAVA SEVA',
                icon: 'el-icon-video-camera'
                }, {
                value: 'manava-seva',
                label: 'MANAVA SEVA',
                icon: 'el-icon-notebook-2'
            }],
            statusType: [{
                value: 0,
                label: 'Upcoming',
                icon: 'el-icon-video-camera'
                }, {
                value: 1,
                label: 'Past',
                icon: 'el-icon-notebook-2'
                }, {
                value: 2,
                label: 'Recurring',
                icon: 'el-icon-notebook-2'
                }
            ],
            type: 'madhava-seva',
            status: 0,
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
            ]
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
                formData.append('category', this.type);
                formData.append('status', this.status);
                formData.append('image', this.image);
                formData.append('name', this.name);
                formData.append('sdate', this.sdate);
                formData.append('edate', this.edate);
                formData.append('description1', this.description1);
                formData.append('description2', this.description2);
                formData.append('description3', this.description3);
                const response = await this.$privateApi.post('/api/event/create', formData); // eslint-disable-line
                this.$toast.success('Data created successfully')
                this.$router.push(this.$nuxt.context.from.path);
            } catch (err) {
                // console.log(err.response);// eslint-disable-line
                this.$refs.form.setErrors({
                    image: err?.response?.data?.errors?.image,
                    name: err?.response?.data?.errors?.name,
                    edate: err?.response?.data?.errors?.edate,
                    description1: err?.response?.data?.errors?.description1,
                    description2: err?.response?.data?.errors?.description2,
                    description3: err?.response?.data?.errors?.description3,
                    type: err?.response?.data?.errors?.category,
                    status: err?.response?.data?.errors?.status,
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
    }
}
</script>
