export enum ColumnType{"d", "c", "t"};

export interface Column{
    code: string,
    text: string,
    comment?: string,
    type: ColumnType;
}

export interface Comment {
    variable: string,
    value: string,
    comment: string
}

export interface DataItem {
    key: string[],
    values: string[]
}

export interface Response {
    columns: Column[],
    comments?: Comment[],
    data: DataItem[]
}
