<template lang="pug">
.editor-ctn
  quillEditor(ref="editor" style="text-align:left" :options="editorOption" v-model="content")
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import QuillBetterTable from 'quill-better-table'
Quill.register('modules/ImageExtend', ImageExtend)
Quill.register({
  'modules/better-table': QuillBetterTable
}, true)
export default {
  name: 'QuillEditorVue',
  components: { quillEditor },
  props: ['value'],
  data () {
    return {
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: this.reqBasic + '/api/upload',  // 上传图片到服务器
            response: (res) => {
              console.log(res)
              if (!res || res.code != 1) return ''
              return res.data.url || ''
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          },
          'better-table': {
            operationMenu: {
              items: {
                unmergeCells: {
                  text: 'Another unmerge cells name'
                }
              }
            }
          },
          // keyboard: {
          //   bindings: QuillBetterTable.keyboardBindings
          // }
        }
      }
    }
  },
  computed: {
    content: {
      get () {
        return this.value || null
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>