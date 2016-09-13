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

export function build_query(filter, selection=[], format="csv"){
    const query = {filter :[], response: {format: format}};
    const qf = query.filter;
    for (let code of filter){
        const code_filter = {
            code: code,
            selection: {
                filter: "item",
                values: filter[code]
            }
        };
        qf.push(code_filter);
    }
    selection = selection.filter((code) => filter[code] === undefined);
    qf.push({code: "ContentsCode", selection:{filter: "item", values: selection}})
    return JSON.stringify(query);
}