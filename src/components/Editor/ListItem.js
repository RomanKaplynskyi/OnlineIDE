export default class ListItem {
    name = null;
    file = null;
    children = [];
    parent = null;
    path = "";
    isFolder = false;
    model = () => { };
    constructor(params) {
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