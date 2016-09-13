export interface ListItem {
    id: string,
    type: string,
    text:string
}

export interface TableItem extends ListItem{
    updated: string
}

export interface Variable{
    code: string,
    text: string,
    values: string[],
    valueTexts: string[],
    time?: boolean,
    elimination?: boolean
}

export interface TableMeta {
    title: string,
    variables: Variable[]
}
