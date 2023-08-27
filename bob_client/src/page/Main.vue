<template>
    <div class="allpage">
        <div class="common-layout">
            <el-container class="layout-container">
                <el-header class="layout-header">
                    Header <Menu></Menu></el-header>
                <el-container class="layout-container">
                    <!-- <el-aside width="200px" class="layout-aside">Aside -->
                    <!-- <SmallMenu> </SmallMenu> -->
                    <!-- </el-aside> -->

                    <el-container class="layout-container">
                        <el-main class="layout-main">
                            <router-view />
                        </el-main>
                    </el-container>
                </el-container>
                <div>
                    <el-footer class="layout-footer">Footer</el-footer>
                </div>
            </el-container>

            <button @click="openModal">모달 열기</button>
            <Modal :visible="isModalOpen" @close="closeModal" :step="step"></Modal>
            <button @click="openRateModal">평점 열기</button>
            <RateModal :visible="isRateModalOpen" @close="closeRateModal"></RateModal>

            <!-- <button id="btn" onclick="changeBtnName()">클릭!!</button> -->
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import Menu from '@/page/Menu.vue';
import Modal from '@/page/Modal.vue';
import RateModal from '@/page/RateModal.vue';
import users from '@/typeuser.js';

export default {
    name: 'Main',

    data() {
        return {
            value: null,
            step: 3,
            유저들: users,
            유저들원본: [...users],
            누른거: 0,
        };
    },
    components: {
        Menu,
        Modal,
        RateModal,
    },
    setup() {
        const activeIndex = ref('1');
        const activeIndex2 = ref('1');

        // Variables for modals
        const isModalOpen = ref(false);
        const isRateModalOpen = ref(false);

        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath);
        };

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        const openRateModal = () => {
            isRateModalOpen.value = true;
        };

        const closeRateModal = () => {
            isRateModalOpen.value = false;
        };

        return {
            activeIndex,
            activeIndex2,
            handleSelect,
            openModal,
            closeModal,
            openRateModal,
            closeRateModal,
            isModalOpen,
            isRateModalOpen,
        };
    },
};
</script>
  
<style>
.list-box {
    background-color: rgb(255, 255, 255);
}

.layout-container {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
}

.layout-header {
    background-color: #2196f3;
    color: white;
    padding: 10px;
}

.layout-aside {
    background-color: #4caf50;
    color: white;
    padding: 10px;
}

.layout-main {
    background-color: rgb(255, 255, 128);
    padding: 10px;
}

.layout-footer {
    background-color: #f44336;
    color: white;
    padding: 10px;
    text-align: center;
}

.allpage {
    width: 70%;
    margin: auto;
}
</style>