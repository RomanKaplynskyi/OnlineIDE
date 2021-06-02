<template>
  <div>
    <v-treeview
      ref="treeView"
      v-model="tree"
      :open.sync="open"
      :items="items"
      :active.sync="active"
      activatable
      item-key="name"
      open-on-click
      @contextmenu.native.prevent="showMenu"
      @update:open="(openItems) => $emit('open', openItems)"
      @update:active="(activeItems) => $emit('active', activeItems)"
      @input="(selectedItems) => $emit('input', selectedItems)"
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.isFolder">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </v-treeview>
    <v-menu
      v-model="isMenuVisible"
      :position-x="menuX"
      :position-y="menuY"
      absolute
      offset-y
  >
    <v-list>
      <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="item.action(item.listItem)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
    <v-dialog
        ref="treeViewDialog"
        v-model="dialog.visible"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Enter name</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="dialog.fileName"
                    label="File name"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="$emit('dialog:close', dialog.fileName)"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="$emit('dialog:save', dialog.fileName)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator"
  import ListItem from "./ListItem"
  import { ContextMenuActionType } from "./ContextMenuActionType"

  class MenuItem {
    title: string
    action: Function
    listItem: ListItem
  }

  @Component
  export default class FileExplorer extends Vue{
    open = ['Project']
    active: Array<string> = ['main.js']
    files = {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    }
    tree = []
    items : Array<ListItem> = []
    menuItems : Array<MenuItem> = []
    menuX : number = 0;
    menuY : number = 0;
    isMenuVisible = false;
    dialog : { visible : boolean, type: ContextMenuActionType | null, listItem: ListItem | null, fileName: string } =
        { visible: false, type: null, listItem: null, fileName: '' }

    mounted() {
      // TODO: Make validations (file only with suffix folder without suffix)
      this.$on('dialog:save', (name:string) => {
        const { type, listItem } = this.dialog
        console.dir({ type, listItem })
        switch (type) {
          case ContextMenuActionType.ADD_FILE:
            // eslint-disable-next-line no-case-declarations
            const fileSplited = name.split('.')
            // eslint-disable-next-line no-case-declarations
            let file : string = ''
            if (fileSplited.length > 1) {
              file = fileSplited[1]
            }
            // eslint-disable-next-line no-case-declarations
            const newFile : ListItem = new ListItem({ name, file, children: [], isFolder: false })
            listItem?.addFile(newFile);
            this.$emit('file-added', newFile)
            break;
          case ContextMenuActionType.ADD_FOLDER:
            listItem?.addFolder(new ListItem({ name, file: '', children: [], isFolder: true }));
            break;
        }
        this.dialog.visible = false;
        this.dialog.type = null;
        this.dialog.listItem = null;
        this.dialog.fileName = '';
      });

      this.$on('dialog:close', () => {
        this.dialog.visible = false
      });

      const main: ListItem =  new ListItem({
        name: 'main.js',
        file: 'js',
        children: [],
        isFolder: false
      })

      const root : ListItem = new ListItem({
        name:'Project',
        file:'',
        children: [],
        isFolder: true
      })

      root.path = 'Project'
      root.addFile(main)

      this.items.push(root)
    }

    showMenu (e:MouseEvent) {
      this.isMenuVisible = false
      this.menuX = e.clientX
      this.menuY = e.clientY
      this.$nextTick(() => {
        this.isMenuVisible = true
      })
      const listItem:ListItem | null = this.findListItem(e)
      if (!listItem) return
      this.createMenu(listItem)
    }

    /**
     * @param name {string} - name of shortcut that you want to find
     * @return <ListItem> found by name
     * */
    findListItemByNameOrNull(name:string) : ListItem | null {
      if (!name) return null;
      let res:ListItem | null = null;
      const getItemHelper = (items: Array<ListItem>) => {
        for (let item of items) {
          if (item.name === name)
            res = item
          else if (item.children.length)
            getItemHelper(item.children)
        }
      }
      getItemHelper(this.items)
      return res;
    }

    /**
     * @param e {MouseEvent}
     * Get target from mouse click and try to find ListItem by name
     * @return <ListItem> found by name
    * */
    findListItem (e: MouseEvent) : ListItem | null {
      const htmlElem: HTMLElement | null = e.target as HTMLElement
      let menuElemName:string | undefined = ''
      if (!htmlElem) return null
      menuElemName = htmlElem.tagName === 'I' ? (htmlElem?.parentElement?.parentElement?.innerText) : htmlElem.innerText
      if (!menuElemName) return null;
      return this.findListItemByNameOrNull(menuElemName)
    }

    createMenu(listItem: ListItem) {

      this.menuItems = [
        {
          title: 'Add folder',
          action: (item:ListItem) => this.addFolder(item),
          listItem
        },
        {
          title: 'Add file',
          action: (item:ListItem) => this.addFile(item),
          listItem
        },
        {
          title: 'Delete',
          action: (item:ListItem) => this.delete(item),
          listItem
        },
      ]
    }

    addFolder(item: ListItem) {
      this.dialog.visible = true
      this.dialog.listItem = item
      this.dialog.type = ContextMenuActionType.ADD_FOLDER
    }

    addFile(item: ListItem) {
      this.dialog.visible = true
      this.dialog.listItem = item
      this.dialog.type = ContextMenuActionType.ADD_FILE
    }

    delete(item: ListItem) {
      item.delete(item)
    }

    getFiles() : Array<ListItem>{
      return this.items
    }

    setFiles(files: Array<ListItem>) : void {
      this.items = files
    }
  }
</script>
<style scoped>
</style>