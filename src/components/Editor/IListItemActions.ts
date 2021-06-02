import ListItem from "@/components/Editor/ListItem";

export default interface IListItemActions {
    addFile(item:ListItem): void
    addFolder(item:ListItem): void
    delete(item:ListItem): void
}
