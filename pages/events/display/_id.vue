<template>
    <div>
        <BreadcrumbComponent main-page="Event" current-page="Display" />
        <section class="content">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h4 class="box-title">Display Event</h4>
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
                                            <el-input v-model="name" :disabled="true" style="width: 100%;" placeholder="Enter Name"></el-input>
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
                                                :disabled="true"
                                                type="date"
                                                style="width: 100%;"
                                                placeholder="Pick start date">
                                            </el-date-picker>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-4">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="end date">
                                        <div class="form-group">
                                            <label class="form-label">End Date *</label>
                                            <el-date-picker
                                                v-model="edate"
                                                :disabled="true"
                                                type="date"
                                                style="width: 100%;"
                                                placeholder="Pick end date">
                                            </el-date-picker>
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required" name="type">
                                        <div class="form-group">
                                            <label class="form-label">Category *</label>
                                            <el-select v-model="type" :disabled="true" placeholder="Select" style="width:100%">
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
                                    <div class="col-md-6">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="required|ext:jpg,jpeg,png,webp" name="image">
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
                                            <VueEditor v-model="description1" :disabled="true" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="" name="description">
                                        <div class="form-group">
                                            <label class="form-label">Description (optional)</label>
                                            <VueEditor v-model="description2" :disabled="true" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    <div class="col-md-12">
                                        <ValidationProvider v-slot="{ classes, errors }" rules="" name="description">
                                        <div class="form-group">
                                            <label class="form-label">Description (optional)</label>
                                            <VueEditor v-model="description3" :disabled="true" :editor-toolbar="customToolbar" />
                                        </div>
                                        <span :class="classes">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <NuxtLink to="/events/list"><button type="button" class="btn btn-primary-light me-1">
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
            type: 'madhava-seva',
            imageLink:'',
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
                const response = await this.$privateApi.get('/api/event/display/'+this.$route.params.id); // eslint-disable-line
                this.type = response.data.data.category;
                this.imageLink = response.data.data.image;
                this.name = response.data.data.name;
                this.sdate = response.data.data.sdate;
                this.edate = response.data.data.edate;
                this.description1 = response.data.data.description1;
                this.description2 = response.data.data.description2;
                this.description3 = response.data.data.description3;
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
  