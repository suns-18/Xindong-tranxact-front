<script setup lang="ts">
import sidebarMenu from "@/ts/sidebar-menu.ts";
</script>

<template>
	<!--    <button title="Side navigation" type="button" class="fixed z-40 self-center order-10 visible block w-10 h-10 bg-white rounded opacity-100 lg:hidden left-6 top-6" aria-haspopup="menu" aria-label="Side navigation" aria-expanded="false" aria-controls="nav-menu-1">
					<span class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
							<span aria-hidden="true" class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"></span>
							<span aria-hidden="true" class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"></span>
							<span aria-hidden="true" class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
					</span>
			</button>-->
	
	<!-- Side Navigation -->
    <aside id="nav-menu-1" aria-label="Side navigation"
           class="top-0 bottom-0 left-0 flex flex-col transition-transform
           -translate-x-full bg-white border-r w-full sm:translate-x-0 border-r-slate-200">
        <!--        <div class="flex flex-col items-center gap-4 p-6 border-b border-slate-200">
										<div class="shrink-0">
												<a href="#" class="relative flex items-center justify-center w-12 h-12 text-white rounded-full">
														<img src="https://i.pravatar.cc/40?img=7" alt="user name" title="user name" width="48" height="48" class="max-w-full rounded-full" />
														<span class="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 p-1 text-sm text-white border-2 border-white rounded-full bg-blue-700"><span class="sr-only"> online </span></span>
												</a>
										</div>
										<div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0 text-center">
												<h4 class="w-full text-base truncate text-slate-700">Luke Skywalker</h4>
												<p class="w-full text-sm truncate text-slate-500">Jedi warrior</p>
										</div>
								</div>-->
        <nav aria-label="side navigation" class="flex-1 overflow-auto divide-y divide-slate-100">
            <div>
                <ul class="flex flex-col flex-1 gap-1 py-3">
                    <li class="px-3 cursor-pointer select-none" v-for="(item) in sidebarMenu">
                        <router-link :to="item.path"
                                     class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-gray-100 hover:bg-blue-400 focus:bg-blue-400 aria-[current=page]:text-blue-700 aria-[current=page]:bg-blue-400 ">
                            <div class="flex items-center self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
                                     aria-label="Dashboard icon" role="graphics-symbol">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate">
                                {{ item.title }}
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--            <div>
														<ul class="flex flex-col flex-1 gap-1 py-3">
																<li class="px-3">
																		<a href="#" class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-gray-100 hover:bg-blue-400 focus:bg-blue-400 aria-[current=page]:text-blue-700 aria-[current=page]:bg-blue-400 ">
																				<div class="flex items-center self-center">
																						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" aria-label="Dashboard icon" role="graphics-symbol">
																								<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
																						</svg>
																				</div>
																				<div class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate">
																						Documents
																				</div>
																		</a>
																</li>
																<li class="px-3">
																		<a href="#" class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-gray-100 hover:bg-blue-400 focus:bg-blue-400 aria-[current=page]:text-blue-700 aria-[current=page]:bg-blue-400 ">
																				<div class="flex items-center self-center ">
																						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" aria-label="Dashboard icon" role="graphics-symbol">
																								<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
																								<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
																						</svg>
																				</div>
																				<div class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate">
																						Media & files
																				</div>
																		</a>
																</li>
																<li class="px-3">
																		<a href="#" class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-gray-100 hover:bg-blue-400 focus:bg-blue-400 aria-[current=page]:text-blue-700 aria-[current=page]:bg-blue-400 ">
																				<div class="flex items-center self-center ">
																						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" aria-label="Dashboard icon" role="graphics-symbol">
																								<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
																						</svg>
																				</div>
																				<div class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate">
																						Storage
																				</div>
																		</a>
																</li>
														</ul>
												</div>-->
        </nav>
        <footer class="p-3 border-t border-slate-200">
            <router-link to="/logout"
                         class="flex items-center gap-3 p-3 transition-colors rounded text-slate-900
                         hover:bg-blue-600 hover:text-gray-100 cursor-pointer select-none">
                <div class="flex items-center self-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6" aria-label="Dashboard icon" role="graphics-symbol">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="flex flex-col items-start justify-center
                flex-1 w-full gap-0 overflow-hidden text-sm font-medium truncate">
                    退出登录
                </div>
            </router-link>
        </footer>
    </aside>

</template>

<style scoped>
</style>
