<!-- eslint-disable vue/valid-template-root -->
<template>
	<el-drawer
:visible.sync="activeSidebar" direction="ltr" :size="screenWidth > 500 ? '19.29rem' : `${screenWidth-80}px`" :show-close="false" :with-header="false"
		:before-close="toogleSideBar">
		<aside class="main-sidebar" :style="screenWidth > 500 ? 'width:19.29rem' : `width:${screenWidth-80}px`">
			<!-- sidebar-->
			<section class="sidebar position-relative">
				<div class="d-flex align-items-center logo-box justify-content-start" :style="screenWidth > 500 ? '19.29rem' : `${screenWidth-80}px`">
					<NuxtLink to="/" class="logo-lg">
						<span class="light-logo"><img src="/images/logo.png" alt="logo"></span>
					</NuxtLink>
				</div>
				<div class="multinav" :style="screenWidth > 500 ? 'width:19.29rem' : `width:${screenWidth-80}px`">
					<div class="multinav-scroll">
						<!-- sidebar menu-->
						<el-menu default-active="2" class="el-menu-vertical-demo">
							<el-divider content-position="left">Admin Menu</el-divider>
							<NuxtLink to="/dashboard">
								<el-menu-item index="8">
									<i class="el-icon-s-home"></i>
									<span>Dashboard</span>
								</el-menu-item>
							</NuxtLink>
							<template>
								<NuxtLink to="/user/list">
									<el-menu-item index="3">
										<i class="el-icon-user"></i>
										<span>User</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/enquiry/list">
									<el-menu-item index="4">
										<i class="el-icon-chat-line-square"></i>
										<span>Enquiry</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/email/list">
									<el-menu-item index="5">
										<i class="el-icon-message"></i>
										<span>Email</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/literature/list">
									<el-menu-item index="8">
										<i class="el-icon-notebook-1"></i>
										<span>literature</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/volunteer/list">
									<el-menu-item index="6">
										<i class="el-icon-user"></i>
										<span>Volunteer</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/subscription/list">
									<el-menu-item index="10">
										<i class="el-icon-user"></i>
										<span>Subscription</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/testimonial/list">
									<el-menu-item index="11">
										<i class="el-icon-s-custom"></i>
										<span>Testimonial</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/media/list">
									<el-menu-item index="12">
										<i class="el-icon-video-camera-solid"></i>
										<span>Media</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/crossword/list">
									<el-menu-item index="13">
										<i class="el-icon-s-release"></i>
										<span>Crossword</span>
									</el-menu-item>
								</NuxtLink>
								<NuxtLink to="/e-hundi/list">
									<el-menu-item index="14">
										<i class="el-icon-price-tag"></i>
										<span>E-Hundi</span>
									</el-menu-item>
								</NuxtLink>
								<el-submenu index="7">
									<template slot="title">
										<i class="el-icon-price-tag"></i>
										<span>Payment</span>
									</template>
									<NuxtLink to="/payment/content">
										<el-menu-item index="7-1">Content </el-menu-item>
									</NuxtLink>
									<NuxtLink to="/payment/live-session-content">
										<el-menu-item index="7-2">Live Session Content </el-menu-item>
									</NuxtLink>
								</el-submenu>
								<el-submenu index="9">
									<template slot="title">
										<i class="el-icon-price-tag"></i>
										<span>Enquiries</span>
									</template>
									<NuxtLink to="/enquiries/contact-form">
										<el-menu-item index="9-1">Contact Form </el-menu-item>
									</NuxtLink>
									<NuxtLink to="/enquiries/demo-session">
										<el-menu-item index="9-2">Demo Session </el-menu-item>
									</NuxtLink>
								</el-submenu>
							</template>
						</el-menu>
						<!-- sidebar menu-->
						<div class="sidebar-widgets mt-100">
							<div class="mx-25 mb-30 pb-20 side-bx bg-primary-light rounded20">
								<div class="text-center">
									<h4 class="title-bx text-primary">HRUDAYASPANDANA</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</aside>
	</el-drawer>
</template>

<script>
export default {
	name: 'SideBarComponent',
	data() {
		return {
			active: 'home',
		}
	},
	computed: {
		activeSidebar() {
			return this.$store.state.sidebar.sidebar
		},
		screenWidth() {
			if (process.client) {
				return window.screen.width
			} else {
				return 500;
			}
		}
	},
	methods: {
		toogleSideBar() {
			this.$store.commit('sidebar/toggle', {status: !this.$store.state.sidebar.sidebar})
		}
	}
}
</script>