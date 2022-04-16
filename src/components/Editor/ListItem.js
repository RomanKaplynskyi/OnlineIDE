export default class ListItem {
    constructor(params) {
        this.name = null;
        this.file = null;
        this.children = [];
        this.parent = null;
        this.path = "";
        this.isFolder = false;
        this.model = () => { };
        this.name = params.name;
        this.file = params.file;
        this.children = params.children;
        this.isFolder = params.isFolder;
    }
    addFile(item) {
        this.children.push(item);
        item.parent = this;
        item.path += this.path + '/' + item.name;
    }
    addFolder(item) {
        this.children.push(item);
        item.parent = this;
        item.path += this.path + '/' + item.name;
    }
    delete(item) {
        const parent = item.parent;
        if (!parent)
            return;
        parent.children.splice(parent.children.indexOf(item), 1);
    }
    toJSON() {
        return {
            name: this.name,
            file: this.file,
            children: this.children,
            model: this.model()?.getValue(),
            isFolder: this.isFolder,
            path: this.path
        };
    }
}
//# sourceMappingURL=ListItem.js.map