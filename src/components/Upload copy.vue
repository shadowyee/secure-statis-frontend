<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadFile">上传文件</button>
  </div>
  <div>
	<json-viewer :value="calResult"></json-viewer>
	<json-viewer :value="calResult"
				 :expand-depth=5
				 copyable
				 boxed
				 sort></json-viewer>
  </div>
</template>

<script>
export default {
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      if (!this.file) {
        console.error('请选择要上传的文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://10.249.58.208:3000/upload', true); // 将服务器地址替换为实际地址
      xhr.onload = function (respo) {
        if (xhr.status === 200) {
		  console.log(respo.currentTarget.response);
          console.log('文件上传成功');
        } else {
          console.error('文件上传失败');
        }
      };
      xhr.onerror = function () {
        console.error('网络错误，文件上传失败');
      };
      xhr.send(formData);
    }
  }
}
</script>

<style>
/* 样式 */
</style>

