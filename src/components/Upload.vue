<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileUpload">
    
    <el-button type="primary" @click="uploadFile" :loading="uploading">Upload</el-button>

    <div v-if="fileUploaded">
      File Uploaded Successfully!
      <json-viewer
        :value="jsonData"
        :expand-depth=5
        copyable
        boxed
        sort></json-viewer>
    </div>
  </div>

</template>

<script>
import { ref, reactive } from 'vue';
import JsonViewer from 'vue-json-viewer';
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';

export default {
  components: {
    ElButton,
    JsonViewer
  },
  setup() {
    const file = ref(null);
    const fileUploaded = ref(false);
    const jsonData = ref();
    const uploading = ref(false);

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const uploadFile = () => {
      if (!file.value) {
        alert("Please select a file to upload.");
        return;
      }

      uploading.value = true;
      console.log(uploading.value);
      const formData = new FormData();
      formData.append('file', file.value);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://10.249.58.208:3000/upload', true); // 将服务器地址替换为实际地址
      xhr.onload = function (respo) {
        if (xhr.status === 200) {
		      console.log(respo.currentTarget.response);
          jsonData.value = respo.currentTarget.response;
          console.log('文件上传成功');
          fileUploaded.value = true;
        } else {
          console.error('文件上传失败');
        }
        uploading.value = false;
      };
      xhr.onerror = function () {
        console.error('网络错误，文件上传失败');
      };
      xhr.send(formData);
    };

    return { file, fileUploaded, jsonData, uploading, handleFileUpload, uploadFile };
  }
};
</script>

<style scoped>
/* Add your component styles here */
</style>
